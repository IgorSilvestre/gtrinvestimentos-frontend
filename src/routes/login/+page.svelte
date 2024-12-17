<script lang="ts">
  import { createForm } from 'svelte-forms-lib';
  import { goto } from '$app/navigation';
  import { loginQuery } from '$lib/api/queries/auth/loginQuery';
  import { type IUser, VUserLogin } from '$lib/interfaces-validation/IVUser';

  let error = ''

  const initialValues = {
    email: '',
    password: '',
  };

  const { form, errors, handleSubmit, isSubmitting } = createForm({
    initialValues,
    VUserLogin,
    onSubmit: async (userLoginForm: IUser) => {
      try {
        const response = await loginQuery(userLoginForm);

        if (response.status === 200) {
          goto('/asset')
        } else {
          const { data } = await response
          error = data.error || 'Login falhou.';
        }
      } catch (err) {
        console.error(err);
        error = 'Algo deu errado, por favor tente de novo.';
      }
    }
  });
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <form
    on:submit={handleSubmit}
    class="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md"
  >
    <h2 class="text-2xl font-semibold mb-4 text-gray-700 text-center">Login</h2>

    <div class="mb-4">
      <label
        for="email"
        class="block text-sm font-medium text-gray-600 mb-1"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        bind:value={$form.email}
        placeholder="john@example.com"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      {#if $errors.email}
        <p class="text-red text-sm mt-1">{$errors.email}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label
        for="password"
        class="block text-sm font-medium text-gray-600 mb-1"
      >
        Senha
      </label>
      <input
        id="password"
        name="password"
        type="password"
        bind:value={$form.password}
        placeholder="*********"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      {#if $errors.password}
        <p class="text-red text-sm mt-1">{$errors.password}</p>
      {/if}
    </div>

    {#if error}
      <p class="text-red text-sm mb-4">{error}</p>
    {/if}

    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      disabled={$isSubmitting}
    >
      {$isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  </form>
</div>
