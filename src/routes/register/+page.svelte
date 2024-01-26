<script lang="ts">
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
      import * as Alert from "$lib/components/ui/alert";
      import Spinner from "$lib/Spinner.svelte";
    import { Input } from "$lib/components/ui/input";
    import { PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
  
    // export let data
    let submitStatus = ""
    let submitError = ""
    let submitErrorTitle = ""
    let ndidId = ""
    function checkPassword(str) {
    // Check if string has at least 8 characters
    if (str.length < 8) {
        return false;
    }
    
    // Check if string has at least 1 upper case letter
    if (!/[A-Z]/.test(str)) {
        return false;
    }
    
    // Check if string has at least 1 lower case letter
    if (!/[a-z]/.test(str)) {
        return false;
    }
    
    // If all conditions pass, return true
    return true;
}
    async function onSubmit(e : SubmitEvent){
      const errList : string[] = []
      e.preventDefault()
      if(!e.target){
        submitErrorTitle = "Fatal Error"
        submitError = "Unable to find data"
        return false
      }
      const target : any = e.target
      const formData = new FormData(target)
      // Validation
      const username = formData.get("Username") as string
      if(username== ""){
        errList.push("Username")
      }
      const password = formData.get("Password")
      if(password== ""){
        errList.push("Password")
      }
      const password_check = formData.get("password-check") as string
      if(password_check== ""){
        errList.push("Re-type Password")
      }
      const email = formData.get("Email") as string
      if(email== ""){
        errList.push("Email")
      }
      const citizenId = formData.get("CitizenId") as string
      if(citizenId== ""){
        errList.push("CitizenId")
      }
      if(errList.length > 0){
        submitErrorTitle = "Validation Error"
        submitError = "Required Fields: "+errList.join(", ")
        return false
      }
      if(password_check != password) {
        submitErrorTitle = "Validation Error"
        submitError = "Password and Re-type Password do not match"
        return false
      }
      if(!checkPassword(password)){
        submitErrorTitle = "Validation Error"
        submitError = "Password does not meet requirements"
        return false
      }
      const formObject = JSON.stringify(Object.fromEntries(formData))
      submitStatus = "submitting"
        const response = await fetch(PUBLIC_SERVER_FRONTEND_URL+"/register",{
          method: "POST",
          body: formObject
        })
        if(response.status != 201){
          const e = await response.json()
          submitStatus = "error"
          submitErrorTitle = "Submission Error"
          submitError = e.message
          return false
        }
        const responseBody =  response.json()
        submitStatus = "complete"
        submitError = ""
        submitErrorTitle = ""
        ndidId = responseBody.id
      return true
    }
  </script>



  {#if submitStatus == "submitting"}
    <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
    <Spinner class="mx-auto mt-4 w-[3rem]"/>
  {:else if submitStatus == "complete"}
  <div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
  <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Please Verify with NDID</div>
  <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Ref: {ndidId}</div>
  <div class="mx-auto text-center">
    <!-- <Button href={"/doctor/referral/"+referralId}>View Referral</Button> -->
    <Button variant="outline" class="inline-block mt-8" href="/">Return to Login</Button>
  </div>
  {:else}
  <form class="mx-auto max-w-[40rem]" on:submit={onSubmit}>
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
    {#if submitError != ""}
      <Alert.Root class="my-4" variant="destructive">
        <Alert.Title>{submitErrorTitle}</Alert.Title>
        <Alert.Description>
          {submitError}
        </Alert.Description>
      </Alert.Root>
    {/if}
    <Button type="submit" class="block w-full mt-5">Submit Referral</Button>
  </form>
  {/if}
  