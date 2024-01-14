<script lang="ts">
    import { goto } from "$app/navigation";

    export let title : string;
    export let username : string = "";
    const handleLogout = ()=>{
        goto("/logout")
    }
</script>
<nav class="flex justify-between px-8 py-4">
    <div class="flex gap-2">
        <a class="mt-1" href="/">
            <img src="/icons/home.svg" alt="home" class="w-8"/>
        </a>
        
        <h2 class="text-3xl font-bold pt-1">{title}</h2>
    </div>
    <div class="my-auto">
        <span class="text-lg">User: {username}</span>
        <button class="btn" on:click={handleLogout}>Log Out</button>
    </div>
</nav>