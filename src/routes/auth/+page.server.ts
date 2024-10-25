import { redirect, fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
  signup: async ({ request, locals: { supabase }, url }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!name || !email || !password) {
      return fail(400, { message: 'All fields are required' });
    }

    const origin = `${url.protocol}//${url.host}`;

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: `${origin}/auth/confirm`
      }
    });

    if (error) {
      console.error(error);
      return fail(500, { message: error.message });
    } else {
      if (data.user) {
        // Create profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: name,
            email: email,
            authorized: false,  // Set initial authorization status
            created_at: new Date()
          });

        if (profileError) {
          console.error(profileError);
          return fail(500, { message: 'Failed to create user profile' });
        }
      }
      // Don't redirect, show a message to check email
      return { success: true, message: 'Please check your email to confirm your account.' };
    }
  },

  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return fail(500, { message: error.message });
    } else {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error(profileError);
        return fail(500, { message: 'Failed to fetch user profile' });
      }

      // You can now use profile.name
      return { success: true, user: { ...data.user, name: profile.name } };
    }
  },
};