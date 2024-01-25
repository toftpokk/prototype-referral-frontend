<script lang="ts">
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
      import * as Alert from "$lib/components/ui/alert";
      import Spinner from "$lib/Spinner.svelte";
    import { Input } from "$lib/components/ui/input";
  
    // export let data
    let submitStatus = ""
    let submitError = ""
    function onSubmit(e : SubmitEvent){
    //   const errList : string[] = []
    //   e.preventDefault()
    //   if(!e.target){
    //     submitErrorTitle = "Fatal Error"
    //     submitError = "Unable to find data"
    //     return false
    //   }
    //   const target : any = e.target
    //   const formData = new FormData(target)
    //   // Validation
    //   if(!patient || !patient){
    //     errList.push("Patient")
    //   }
    //   if(!hospital || !hospital.HospitalId){
    //     errList.push("Destination")
    //   }
    //   const department : any = selectedDept.value
    //   if(department== ""){
    //     errList.push("Department")
    //   }
    //   const reason = formData.get("Reason") as string
    //   if(reason== ""){
    //     errList.push("Reason")
    //   }
    //   const history = formData.get("History") as string
    //   if(history== ""){
    //     errList.push("History")
    //   }
    //   const diagnosis = formData.get("Diagnosis") as string
    //   if(diagnosis== ""){
    //     errList.push("Diagnosis")
    //   }
    //   if(errList.length > 0){
    //     submitErrorTitle = "Validation Error"
    //     submitError = "Required Fields: "+errList.join(", ")
    //     return false
    //   }
    //   submitError = ""
    //   formData.set("Origin",PUBLIC_HOSPITAL_ID) // Sent, but not used
    //   formData.set("Destination", hospital.HospitalId)
    //   formData.set("Department", department)
    //   // Reason set
    //   // History set
    //   // Diagnosis set
    //   formData.set("CitizenId", patient.CitizenId)
    //   formData.set("Prefix", patient.Prefix)
    //   formData.set("FirstName", patient.FirstName)
    //   formData.set("LastName", patient.LastName)
    //   formData.set("BirthDate", patient.BirthDate)
    //   formData.set("Address", patient.Address)
    //   formData.set("Gender", patient.Gender)
    //   formData.set("Telephone", patient.Telephone)
    //   formData.set("Email", patient.Email)
    //   // Files
    //   if(files){
    //     for(const file of files){
    //       formData.append("files",file)
    //     }
    //   }
    //   if(attachment){
    //     for(const key of Object.keys(attachment)){
    //       if(attachment[key]){
    //         formData.append("attachments",key)
    //       }
    //     }
    //   }
    //   // submit doctorId as ? querystring
    //   submitStatus = "submitting"
    //     fetch(PUBLIC_CLIENT_FRONTEND_URL+"/",{
    //       method: "POST",
    //       body: formData
    //     })
    //     .then(async (d: Response)=>{
    //       if(d.status != 201){
    //         throw await d.json()
    //       }
    //       return d.json()
    //     })
    //     .then((d:{id: number})=>{
    //       submitStatus = "complete"
    //       referralId = d.id
    //     }).catch((e : any)=>{
    //       submitStatus = "error"
    //       submitErrorTitle = "Submission Error"
    //       submitError = e.message
    //     })
    //   return true
    }
  </script>



  {#if submitStatus == "submitting"}
    <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
    <Spinner class="mx-auto mt-4 w-[3rem]"/>
  {:else if submitStatus == "complete"}
  <div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
  <div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Please Verify with NDID</div>
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
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Password<span class="text-red-500">*</span></Label
    >
    <Alert.Root class="my-4" variant="destructive">
        <Alert.Title>Password Requirements</Alert.Title>
        <Alert.Description>
            <ol class="list-decimal ml-4">
                <li>Have at least 8 characters</li>
                <li>Has at least 1 upper case letter</li>
                <li>Has at least 1 lower case letter</li>
            </ol>
        </Alert.Description>
    </Alert.Root>
    <Input
    type="password"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Re-type password<span class="text-red-500">*</span></Label
    >
    <Input
    type="password"
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Email<span class="text-red-500">*</span></Label
    >
    <Input
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Label class="font-semibold text-[11pt] block mb-1 mt-5"
      >Citizen ID<span class="text-red-500">*</span></Label
    >
    <Input
    class="flex h-10 w-full rounded-md border shadow-sm border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    {#if submitError != ""}
      <Alert.Root class="my-4" variant="destructive">
        <Alert.Title>Submission Error</Alert.Title>
        <Alert.Description>
          {submitError}
        </Alert.Description>
      </Alert.Root>
    {/if}
    <Button type="submit" class="block w-full mt-5">Submit Referral</Button>
  </form>
  {/if}
  