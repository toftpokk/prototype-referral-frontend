<script lang="ts">
    import { PUBLIC_HOSPITAL_NAME, PUBLIC_ROLE } from "$env/static/public";
    import UserMenu from "./UserMenu.svelte";
    import { ChevronDown, Home, Shield, Stethoscope, User } from "lucide-svelte";

    export let title : string;
    export let username : string = "";
    export let role : string;
</script>
<nav class="flex justify-between px-8 py-4 border-b mb-4">
    <div class="flex gap-2">
        <a class="mt-1" href="/">
            <Home size="30" class="h-8"/>
        </a>
        <div class="pb-1">
        {#if PUBLIC_ROLE == "Client"}
                <h2 class="text-xl font-bold">{title}</h2>
                <h2 class="leading-3 text-muted-foreground">{PUBLIC_HOSPITAL_NAME}</h2>
        {:else}
            <h2 class="text-xl font-bold">{title}</h2>
            <h2 class="leading-3 text-muted-foreground">Referral Server</h2>
        {/if}
        </div>
    </div>
    <div class="my-auto">
        <UserMenu url="/logout">
            {#if role == "doctor"}
                <Stethoscope class="mr-1"/>
            {:else if role == "staff"}
                 <!-- else if content here -->
                 <Shield class="mr-1"/>
            {:else}
                <User class="mr-1"/>
            {/if}
            {username}
            <ChevronDown class="w-4 h-4 ml-1"/>
        </UserMenu>
    </div>
</nav>