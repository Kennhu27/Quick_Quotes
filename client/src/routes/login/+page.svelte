<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { auth } from '$lib/auth.svelte';
  import { toast } from '$lib/toast.svelte';

  let email = $state('');
  let name = $state('');
  let password = $state('');

  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('/api/users/loginUser', { name, email, password });

    submitting = false;

    if (result.status === 403) {
      toast.error('Invalid email or password');
      return;
    }

    if (!result.ok) {
      toast.error('Something went wrong');
      return;
    }

    await auth.fetchUser();
    goto('/quote');
  }
</script>

<h1>Log In</h1>

<form onsubmit={handleSubmit}>
  <label>
    Display Name
    <input type="text" bind:value={name} required />
  </label>

  <label>
    Email
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Logging in...' : 'Log In'}
  </button>
</form>

<p>Don't have an account? <a href="/register">Register</a></p>
