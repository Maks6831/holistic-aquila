<script>
  import { page } from "$app/stores";

  $: user = $page.data.session?.user;
</script>

<h1>Dashboard</h1>

<!-- {#if user}
  <p>Hello, {user.name}!</p>
{:else}
  <p>Welcome to the dashboard!</p>
{/if} -->

<!-- ... rest of your dashboard content ... -->
