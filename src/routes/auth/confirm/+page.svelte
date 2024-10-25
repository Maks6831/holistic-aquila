<script lang="ts">
  import { page } from "$app/stores";
</script>

<main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  {#if $page.url.searchParams.get("error")}
    <h1 class="text-2xl font-bold mb-6 text-center text-red-600">
      Error confirming email
    </h1>
    <p class="text-center">
      Please try signing up again or contact support if the problem persists.
    </p>
  {:else}
    <h1 class="text-2xl font-bold mb-6 text-center text-green-600">
      Email confirmed successfully
    </h1>
    <p class="text-center">
      You can now <a href="/auth" class="text-blue-500 hover:underline"
        >log in</a
      > to your account.
    </p>
  {/if}
</main>
