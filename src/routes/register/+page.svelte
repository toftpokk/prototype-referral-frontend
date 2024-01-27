<script lang="ts">
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
      import * as Alert from "$lib/components/ui/alert";
      import Spinner from "$lib/Spinner.svelte";
    import { Input } from "$lib/components/ui/input";
    import { env } from "$env/dynamic/public";
    import { enhance } from "$app/forms";
    export let form : import('./$types').ActionData
    // export let data
    // let submitStatus = ""
    // let submitError = ""
    // let submitErrorTitle = ""
    // let ndidId = ""

  </script>



  <!-- {#if form == "submitting"}
    <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
    <Spinner class="mx-auto mt-4 w-[3rem]"/> -->
  {#if form?.success}
  <div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
  <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Please Verify with NDID</div>
  <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Ref: {form.ndid}</div>
  <div class="mx-auto text-center">
    <!-- <Button href={"/doctor/referral/"+referralId}>View Referral</Button> -->
    <Button variant="outline" class="inline-block mt-8" href="/">Return to Login</Button>
  </div>
  {:else}
  <form class="mx-auto max-w-[40rem]" method="POST" use:enhance>
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Username<span class="text-red-500">*</span></Label
    >
    <Input
    name="Username" required
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Password<span class="text-red-500">*</span></Label
    >
    <Alert.Root class="my-4" variant="default">
        <Alert.Title class="font-bold">Password Requirements</Alert.Title>
        <Alert.Description>
            <ol class="list-decimal ml-4">
                <li>Have at least 8 characters</li>
                <li>Has at least 1 upper case letter</li>
                <li>Has at least 1 lower case letter</li>
            </ol>
        </Alert.Description>
    </Alert.Root>
    <Input
    required
    type="password"
    name="Password"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Re-type password<span class="text-red-500">*</span></Label
    >
    <Input
    required
    type="password"
    name="password-check"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Email<span class="text-red-500">*</span></Label
    >
    <Input
    required
    name="Email"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Citizen ID<span class="text-red-500">*</span></Label
    >
    <Input
    required
    name="CitizenId"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    {#if form?.error}
      <Alert.Root class="my-4" variant="destructive">
        <Alert.Title>{form.error}</Alert.Title>
        <Alert.Description>
          {form.message}
        </Alert.Description>
      </Alert.Root>
    {/if}
    <Button type="submit" class="block w-full mt-5">Submit Referral</Button>
  </form>
  {/if}
  