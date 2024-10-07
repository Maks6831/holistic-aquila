<script lang="ts">
  import { page } from "$app/stores";
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import type { SupabaseClient } from "@supabase/supabase-js";

  // Get the session store from the context
  const session: any = getContext("session");

  // Mobile menu toggle
  let mobileMenu: HTMLElement;
  let mobileMenuButton: HTMLElement;

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
  }

  async function handleAuthAction() {
    if ($session) {
      // User is logged in, so log them out
      const { supabase } = getContext("supabase") as {
        supabase: SupabaseClient;
      };
      await supabase.auth.signOut();
      goto("/"); // Redirect to home page after logout
    } else {
      // User is not logged in, redirect to auth page
      goto("/auth");
    }
  }

  import { onMount } from "svelte";
  onMount(() => {
    mobileMenu = document.querySelector(".mobile-menu") as HTMLElement;
    mobileMenuButton = document.querySelector(
      ".mobile-menu-button"
    ) as HTMLElement;
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", toggleMobileMenu);
    }

    return () => {
      mobileMenuButton.removeEventListener("click", toggleMobileMenu);
    };
  });
</script>

<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between">
      <div class="flex space-x-7">
        <div>
          <a href="/" class="flex items-center py-4 px-2">
            <span class="font-semibold text-gray-500 text-lg"
              >Holistic Aquila</span
            >
          </a>
        </div>
      </div>
      <div class="hidden md:flex items-center space-x-1">
        <a
          href="/reiki-training"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
          class:text-green-500={$page.url.pathname === "/reiki-training"}
          >Reiki Training</a
        >
        <a
          href="/services"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
          class:text-green-500={$page.url.pathname === "/services"}>Services</a
        >
        <a
          href="/contact"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
          class:text-green-500={$page.url.pathname === "/contact"}>Contact</a
        >
        <button
          on:click={handleAuthAction}
          class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
        >
          {$session ? "Logout" : "Login/Register"}
        </button>
      </div>
      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button class="outline-none mobile-menu-button">
          <svg
            class="w-6 h-6 text-gray-500 hover:text-green-500"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <!-- mobile menu -->
  <div class="hidden mobile-menu">
    <ul class="">
      <li>
        <a
          href="/reiki-training"
          class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
          >Reiki Training</a
        >
      </li>
      <li>
        <a
          href="/services"
          class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
          >Services</a
        >
      </li>
      <li>
        <a
          href="/contact"
          class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
          >Contact</a
        >
      </li>
      <li>
        <button
          on:click={handleAuthAction}
          class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300 w-full text-left"
        >
          {$session ? "Logout" : "Login/Register"}
        </button>
      </li>
    </ul>
  </div>
</nav>
