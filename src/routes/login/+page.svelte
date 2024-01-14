<script lang="ts">
    import { enhance } from '$app/forms';
    import Logo from '$lib/Logo.svelte';
    export let form : import('./$types').ActionData
    let role = "doctor"
</script>
<div class="flex flex-row w-full h-svh">
    <div class="basis-7/12 h-svh overflow-clip">
        <img src="/operating-doctor.jpg" alt="hero" class="object-cover h-full">
    </div>
    <div class="basis-5/12 h-svh">
        <div class="p-3">
            <Logo/>
        </div>
        <!-- <p>Login as whom???</p> -->
        <div class="flex flex-col mt-[30%]">  
            <span class="text-5xl underline decoration-[5px] decoration-primary-100 text-center pb-6 font-extrabold">LOGIN</span>
            <div class="mx-auto mb-2 btn-group">
                {#each [
                    {name:"Doctor",value:"doctor"},
                    {name:"Patient",value:"patient"},
                    {name:"Staff",value:"staff"},
                    ] as r}
                    <input type="radio" id={r.value} name="role" value={r.value} bind:group={role}/>
                    <label for={r.value}>{r.name}</label>
                {/each}
            </div>
            <form method="POST" action={"?/"+role} class="flex flex-col max-w-[30rem] mx-auto px-10 gap-3" use:enhance>
                {#if form?.error}
                <p class=" text-error-100 text-center font-bold">{form?.error}</p>
                {/if}
                <input class="" name="username" type="text" placeholder="Doctor ID" required/>
                <input class="" name="password" type="password" placeholder="Password" required/>
                <!-- <a class="text-right">Forgot Password?</a> -->

                <input class="btn" type="submit" value="Continue &rarr;"/>

                <p>For new users or users with no account, please <a>register</a></p>
            </form>
        </div>
    </div>
</div>