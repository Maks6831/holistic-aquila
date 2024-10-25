import type { EmailOtpType } from '@supabase/supabase-js'
import { redirect } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  const next = url.searchParams.get('next') ?? '/'

  const redirectTo = new URL(url)
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error && data.user) {
      // Update the authorized field in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ authorized: true })
        .eq('id', data.user.id)

      if (updateError) {
        console.error('Error updating profile:', updateError)
      }

      redirectTo.searchParams.delete('next')
      return redirect(303, redirectTo)
    }
  }

  // If there's an error or no token_hash/type, redirect to the error page
  redirectTo.pathname = '/auth/error'
  return redirect(303, redirectTo)
}