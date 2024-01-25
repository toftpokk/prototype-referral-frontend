<script lang="ts">
    import { enhance } from '$app/forms';
    import Logo from '$lib/Logo.svelte';
    import * as Select from "$lib/components/ui/select";
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import Label from '$lib/components/ui/label/label.svelte';
    import * as Alert from '$lib/components/ui/alert';
    import { PUBLIC_ROLE } from '$env/static/public';
    export let form : import('./$types').ActionData
    let role = {value: "", label:""}
</script>
<div class="flex flex-row w-full h-svh">
    <div class="basis-7/12 h-svh overflow-clip">
        {#if PUBLIC_ROLE == "Client"}
            <img src="/operating-doctor.jpg" alt="hero" class="basis-7/12 object-cover h-full">
        {:else}
            <img src="/patient.jpg" alt="hero" class="basis-7/12 object-cover h-full">
        {/if}
    </div>
    <div class="basis-5/12 h-svh">
        <div class="p-3">
            <Logo/>
        </div>
        <div class="flex flex-col mt-[30%]">  
            <span class="text-5xl underline decoration-[5px] decoration-primary text-center pb-6 font-extrabold">LOGIN</span>
            <form method="POST" action={"?/"+role.value} class="flex flex-col max-w-[30rem] mx-auto w-full px-10 gap-3" use:enhance>
                {#if form?.error}
                <Alert.Root variant="destructive">
                    <Alert.Title>No Role selected</Alert.Title>
                    <Alert.Description>
                        Please select a role
                    </Alert.Description>
                </Alert.Root>
                {/if}
                <Select.Root bind:selected={role}>
                    <Select.Trigger>
                      <Select.Value placeholder="Select a Role" />
                    </Select.Trigger>
                    <Select.Content>
                      {#if PUBLIC_ROLE == "Client"}
                      <Select.Item value="doctor">Doctor</Select.Item>
                      <Select.Item value="staff">Staff</Select.Item>
                      {:else}
                      <Select.Item value="patient">Patient</Select.Item>
                      <Select.Item value="admin">Admin</Select.Item>
                      {/if}
                    </Select.Content>
                  </Select.Root>
                <Input class="" name="username" type="text" placeholder="Doctor ID" required/>
                <Input class="" name="password" type="password" placeholder="Password" required/>
                <!-- <a class="text-right">Forgot Password?</a> -->

                <Input type="submit" value="Continue &rarr;" class={buttonVariants()}/>

                <!-- Essential for maintaining size: TODO understand -->
                {#if PUBLIC_ROLE != "Client"}
                    <p class="px-4">For new users or users with no account, please register <a class="underline text-blue-500" href="/register">here</a></p>
                {/if}
            </form>
            <!-- <Button>a</Button> -->
        </div>
    </div>
</div>