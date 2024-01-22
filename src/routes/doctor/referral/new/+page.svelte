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
  let attachment : any
  let selectAttachment = (p:any)=>{
    attachmentButton = `${JSON.stringify(p)}`
    attachment = p
  }
  let attachmentButton = "Select Data"
  let selectedDept = {value: "", label:""}

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
    const department : any = selectedDept.value
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
    const submitData : referralMeta & {Diagnosis: string, History: string}= {
      Origin: PUBLIC_HOSPITAL_ID, // Sent, but not used

      CitizenId: patient.CitizenId,
      Prefix: patient.Prefix,
      FirstName: patient.FirstName,
      LastName: patient.LastName,
      BirthDate: patient.BirthDate,
      Address: patient.Address,
      Gender: patient.Gender,
      Telephone: patient.Telephone,
      Email: patient.Email,

      Destination: hospital.HospitalId,

      Department: department,

      Reason: reason,
      History: history,
      Diagnosis: diagnosis,
      // TODO upload additional files
    }
    // submit doctorId as ? querystring
    submitStatus = "submitting"
    fetch(PUBLIC_CLIENT_FRONTEND_URL+"/",{
      method: "POST",
      body: JSON.stringify(submitData)
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
      })
      .catch(async (e: Error)=>{
        submitStatus = "error"
        submitErrorTitle = "Submission Error"
        submitError = e.message
      })
  }
</script>
{#if submitStatus == "submitting"}
  <div class="mx-auto w-[20rem] text-xl text-center">Submitting...</div>
  <Spinner class="mx-auto mt-4 w-[3rem]"/>
{:else if submitStatus == "complete"}
<div class="mx-auto w-[20rem] text-xl text-center">Submission Complete</div>
<div class="mx-auto w-[20rem] text-2xl mt-8 text-center">Referral ID: {referralId}</div>
<!-- <a>&larr; a</a> -->
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
    >Department<span class="text-red-500">*</span></Label
  >
  <Select.Root bind:selected={selectedDept}>
    <Select.Trigger id="Department">
      <Select.Value placeholder="Select a Department to Refer" />
    </Select.Trigger>
    <Select.Content>
      {#each Departments as dept}
        <Select.Item value={dept}>{dept}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <Label for="Reason" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Reason for Referral<span class="text-red-500">*</span></Label
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
  <DataSelect bind:submit={selectAttachment} bind:dataView={attachmentButton}/>
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
