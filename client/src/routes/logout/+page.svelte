<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { auth } from '$lib/auth.svelte';
  import { toast } from '$lib/toast.svelte';
  import { onMount } from 'svelte';

  onMount(async () => {
    await api.del('/api/sessions');
    auth.setUser(null);
    toast.info('Logged out');
    goto('/');
  });
</script>

<p>Logging out...</p>
