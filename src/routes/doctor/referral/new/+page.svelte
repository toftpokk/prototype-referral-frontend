<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
    import PatientSearch from "./PatientSearch.svelte";
    import HospitalSearch from "./HospitalSearch.svelte";
    import DataSelect from "./DataSelect.svelte";
    import { type HospitalData, type PatientData, type referralMeta } from "$lib/global";
    import { PUBLIC_CLIENT_FRONTEND_URL, PUBLIC_HOSPITAL_ID } from "$env/static/public";
    import * as Alert from "$lib/components/ui/alert";
    import { goto } from "$app/navigation";
    import Spinner from "$lib/Spinner.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
  const labelClass = "font-semibold text-[11pt] block mb-1";

  export let data
  let submitStatus = ""
  let referralId = 0
  let submitError = ""
  let submitErrorTitle = "Fatal Error:"

  // Data
  const Departments : string[]= [
    "Anesthesiology",
    "Cardiology",
    "Gynaecology",
    "Pediatrics",
    "Neurology",
    "Oncology",
    "Orthopaedic",
    "Otolaryngology",
    "Urology",
    "Psychiatry",
    "Radiology",
  ]
  // Patient
  let patient : PatientData
  let selectPatient = (p:any)=>{
    patientButton = `${p.Hn.toUpperCase()} ${p.FirstName} ${p.LastName}`
    patient = p
    attachment = null // select new patient, clear data
  }
  let patientButton = "Find Patient"
  // Hospital
  let hospital : HospitalData
  let selectHospital = (p:any)=>{
    hospitalButton = `${p.HospitalId}: ${p.HospitalName}`
    hospital = p
  }
  let hospitalButton = "Find Destination"
  // Data
  let attachment : Record<string,boolean> | null
  let selectAttachment = (p:any)=>{
    attachmentButton = true
    attachment = p
  }
  let attachmentButton = false
  let selectedDept = ""
  let files : FileList
  function onSubmit(e : SubmitEvent){
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
    if(!patient || !patient){
      errList.push("Patient")
    }
    if(!hospital || !hospital.HospitalId){
      errList.push("Destination")
    }
    const department : any = selectedDept
    if(department== ""){
      errList.push("Department")
    }
    const reason = formData.get("Reason") as string
    if(reason== ""){
      errList.push("Reason")
    }
    const history = formData.get("History") as string
    if(history== ""){
      errList.push("History")
    }
    const diagnosis = formData.get("Diagnosis") as string
    if(diagnosis== ""){
      errList.push("Diagnosis")
    }
    if(errList.length > 0){
      submitErrorTitle = "Validation Error"
      submitError = "Required Fields: "+errList.join(", ")
      return false
    }
    submitError = ""
    formData.set("Origin",PUBLIC_HOSPITAL_ID) // Sent, but not used
    formData.set("Destination", hospital.HospitalId)
    formData.set("Department", department)
    // Reason set
    // History set
    // Diagnosis set
    formData.set("CitizenId", patient.CitizenId)
    formData.set("Prefix", patient.Prefix)
    formData.set("FirstName", patient.FirstName)
    formData.set("LastName", patient.LastName)
    formData.set("BirthDate", patient.BirthDate)
    formData.set("Address", patient.Address)
    formData.set("Gender", patient.Gender)
    formData.set("Telephone", patient.Telephone)
    formData.set("Email", patient.Email)
    // Files
    if(files){
      for(const file of files){
        formData.append("files",file)
      }
    }
    if(attachment){
      for(const key of Object.keys(attachment)){
        if(attachment[key]){
          formData.append("attachments",key)
        }
      }
    }
    // submit doctorId as ? querystring
    submitStatus = "submitting"
      fetch(PUBLIC_CLIENT_FRONTEND_URL+"/",{
        method: "POST",
        body: formData
      })
      .then(async (d: Response)=>{
        if(d.status != 201){
          throw await d.json()
        }
        return d.json()
      })
      .then((d:{id: number})=>{
        submitStatus = "complete"
        referralId = d.id
      }).catch((e : any)=>{
        submitStatus = "error"
        submitErrorTitle = "Submission Error"
        submitError = e.message
      })
    return true
  }
</script>
{#if submitStatus == "submitting"}
  <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
  <Spinner class="mx-auto mt-4 w-[3rem]"/>
{:else if submitStatus == "complete"}
<div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
<div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Referral ID: {referralId}</div>
<div class="mx-auto text-center">
  <Button href={"/doctor/referral/"+referralId}>View Referral</Button>
  <Button variant="outline" class="inline-block mt-8" href="/doctor">Return to List</Button>
</div>
{:else}
<form class="mx-auto max-w-[40rem]" on:submit={onSubmit}>
  <Label class="font-semibold text-[11pt] block mb-1"
    >Patient<span class="text-red-500">*</span></Label
  >
  {#await data.patients}
    <p>Loading Patient List...</p>
  {:then patients} 
    <PatientSearch data={patients} bind:submit={selectPatient} bind:dataView={patientButton}/>
  {:catch}
    <p>Error loading patient list</p>
  {/await}
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Destination<span class="text-red-500">*</span></Label
  >
  {#await data.hospitals}
  <p>Loading Hospital List...</p>
  {:then hospitals} 
    <HospitalSearch data={hospitals} bind:submit={selectHospital} bind:dataView={hospitalButton}/>
  {:catch}
    <p>Error loading hospital list</p>
  {/await}
  <Label class="font-semibold text-[11pt] block mb-1 mt-5" for="Department"
    >Department<span class="text-red-500">*</span>
    <span class="ml-2 text-muted-foreground font-normal">This field can be seen by non-medical personnel</span></Label
  >
  <Input class="" name="Department" bind:value={selectedDept}
  />
  <Label for="Reason" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Reason for Referral<span class="text-red-500">*</span>
    <span class="ml-2 text-muted-foreground font-normal">This field will be seen by non-medical personnel</span></Label
  >
  <Textarea id="Reason" name="Reason">
  </Textarea>
  <Label for="History" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Medical History<span class="text-red-500">*</span></Label
  >
  <Textarea id="History" name="History">
  </Textarea>
  <Label for="Diagnosis" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Examination & Diagnosis<span class="text-red-500">*</span></Label
  >
  <Textarea id="Diagnosis" name="Diagnosis">
  </Textarea>
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Additional Referral Documents</Label
  >
  {#if patient}
     <DataSelect bind:submit={selectAttachment} patientId={patient.CitizenId}/>
  {:else}
     <Input value="Select a patient before adding documents" disabled/>
  {/if}
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Upload Files</Label
  >
  <input multiple id="picture" type="file" bind:files={files}
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
