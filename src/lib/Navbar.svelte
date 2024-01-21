<script lang="ts">
    import UserMenu from "./UserMenu.svelte";
    import { ChevronDown, Home, User } from "lucide-svelte";

    export let title : string;
    export let username : string = "";
</script>
<nav class="flex justify-between px-8 py-4 border-b mb-4">
    <div class="flex gap-2">
        <a class="mt-1" href="/">
            <Home size="30" class="h-8"/>
        </a>
        
        <h2 class="text-2xl font-bold pt-1">{title}</h2>
    </div>
    <div class="my-auto">
        <UserMenu url="/logout">
            <User class="mr-1"/>
            {username}
            <ChevronDown class="w-4 h-4 ml-1"/>
        </UserMenu>
    </div>
</nav>