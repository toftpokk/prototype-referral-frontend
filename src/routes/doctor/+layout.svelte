<script>
    import { page } from '$app/stores';
    import Navbar from '$lib/Navbar.svelte';

    export let data;
</script>
<Navbar title={$page.data.title} username={data.username}/>
<div class="px-5">
    <slot></slot>
</div>