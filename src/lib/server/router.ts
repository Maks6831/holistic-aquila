import { router, publicProcedure } from '$lib/server/trpc';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

export const appRouter = router({
  signup: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;
      const { supabase } = ctx;

      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        console.error(error);
        return fail(500, { message: error.message });
      } else {
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            name: name,
            updated_at: new Date()
          });
        }
        throw redirect(303, '/private/dashboard');
      }
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { supabase } = ctx;

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error(error);
        return fail(500, { message: error.message });
      } else {
        throw redirect(303, '/private');
      }
    })
});

export type AppRouter = typeof appRouter;