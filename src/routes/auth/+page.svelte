<script lang="ts">
  import * as yup from "yup";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  let isLogin = true;
  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errors: Record<string, string> = {};
  let serverError = "";

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  async function validateForm() {
    const schema = isLogin ? loginSchema : signupSchema;
    const formData = { name, email, password, confirmPassword };

    try {
      await schema.validate(formData, { abortEarly: false });
      errors = {};
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        errors = err.inner.reduce(
          (acc, error) => {
            if (error.path) {
              acc[error.path] = error.message;
            }
            return acc;
          },
          {} as Record<string, string>
        );
      }
      return false;
    }
  }

  function toggleForm() {
    isLogin = !isLogin;
    // Reset form fields and errors
    name = "";
    email = "";
    password = "";
    confirmPassword = "";
    errors = {};
    serverError = ""; // Clear the server error when toggling forms
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const form = event.target as HTMLFormElement;

    // Use enhance with a submit function
    return enhance(form, ({ form, data, action, cancel }) => {
      // Reset the server error before each submission
      serverError = "";
      return async ({ result, update }) => {
        if (result.type === "failure") {
          serverError = "Email not registered or password is incorrect";
        }
        await update();
      };
    });
  }
</script>

{#if $page.form?.success}
  <div
    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
    role="alert"
  >
    <span class="block sm:inline">{$page.form.message}</span>
  </div>
{/if}

<main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-6 text-center">
    {isLogin ? "Login" : "Sign Up"}
  </h1>

  {#if serverError}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <span class="block sm:inline">{serverError}</span>
    </div>
  {/if}

  <form
    method="POST"
    action="?/{isLogin ? 'login' : 'signup'}"
    use:enhance
    on:submit={handleSubmit}
    class="space-y-4"
  >
    {#if !isLogin}
      <div>
        <label for="name" class="block mb-1 font-medium">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          bind:value={name}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {#if errors.name}<p class="text-red-500 text-sm mt-1">
            {errors.name}
          </p>{/if}
      </div>
    {/if}
    <div>
      <label for="email" class="block mb-1 font-medium">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        bind:value={email}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {#if errors.email}<p class="text-red-500 text-sm mt-1">
          {errors.email}
        </p>{/if}
    </div>
    <div>
      <label for="password" class="block mb-1 font-medium">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {#if errors.password}<p class="text-red-500 text-sm mt-1">
          {errors.password}
        </p>{/if}
    </div>
    {#if !isLogin}
      <div>
        <label for="confirmPassword" class="block mb-1 font-medium"
          >Confirm Password:</label
        >
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          bind:value={confirmPassword}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {#if errors.confirmPassword}<p class="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </p>{/if}
      </div>
    {/if}
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    >
      {isLogin ? "Log In" : "Sign Up"}
    </button>
  </form>
  <button
    on:click={toggleForm}
    class="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
  >
    {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
  </button>
</main>
