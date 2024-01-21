<script lang="ts">
    import { goto } from "$app/navigation";
    import UserMenu from "./UserMenu.svelte";
    import usericon from '$lib/user.svg'
    import chevronicon from '$lib/chevron-down.svg'

    export let title : string;
    export let username : string = "";
    const handleLogout = ()=>{
        goto("/logout")
    }
</script>
<nav class="flex justify-between px-8 py-4 border-b mb-4">
    <div class="flex gap-2">
        <a class="mt-1" href="/">
            <img src="/icons/home.svg" alt="home" class="w-8"/>
        </a>
        
        <h2 class="text-2xl font-bold pt-1">{title}</h2>
    </div>
    <div class="my-auto">
        <UserMenu class="">
            <img src={usericon} alt="user" class="mr-1"/>
            {username}
            <img src={chevronicon} alt="chevron" class="ml-1 w-4"/>
        </UserMenu>
    </div>
</nav>