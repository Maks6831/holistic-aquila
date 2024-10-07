<script lang="ts">
  import { supabase } from "$lib/supabaseClient";

  let email: string = "";
  let password: string = "";
  let loading: boolean = false;
  let error: string | null = null;

  async function handleLogin() {
    try {
      loading = true;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Redirect or update UI on successful login
    } catch (e: unknown) {
      if (e instanceof Error) {
        error = e.message;
      } else {
        error = "An unknown error occurred";
      }
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    required
  />
  <button type="submit" disabled={loading}>
    {loading ? "Loading..." : "Log In"}
  </button>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</form>

<div class="mt-4 text-center">
  <p>
    New user? <a href="/register" class="text-blue-500 hover:underline"
      >Register here</a
    >
  </p>
</div>
