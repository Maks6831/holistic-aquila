import { redirect, fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!name || !email || !password) {
      return fail(400, { message: 'All fields are required' });
    }

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
      // Optionally update user profile with name
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: name,
          updated_at: new Date()
        });
      }
      throw redirect(303, '/');
    }
  },

  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { message: 'Email and password are required' });
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return fail(500, { message: error.message });
    } else {
      throw redirect(303, '/private');
    }
  },
};