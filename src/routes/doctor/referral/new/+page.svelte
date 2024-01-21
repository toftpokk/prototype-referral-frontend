<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
  } from "@internationalized/date";
    import PatientSearch from "./PatientSearch.svelte";
    import HospitalSearch from "./HospitalSearch.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import DataSelect from "./DataSelect.svelte";
    import type { HospitalData, PatientData } from "$lib/global";
  const df = new DateFormatter("en-GB", {
    dateStyle: "long",
  });
  const labelClass = "font-semibold text-[11pt] block mb-1";

  export let data

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

</script>
<!-- <PatientDialog patients={patients} bind:selectedPatient={selectedPatient} bind:dialogOpen={patientDialogOpen}/> -->
<!-- <HospitalDialog hospitals={hospitals} bind:selectedHospital={selectedHospital} bind:dialogOpen={hospitalDialogOpen} /> -->
<!-- <DataDialog data={medicalData} bind:dialogOpen={dataDialogOpen} bind:selectedData={selectedData}/> -->
<form class="mx-auto max-w-[40rem]">
  <Label class="font-semibold text-[11pt] block mb-1"
    >Patient</Label
  >
  {#await data.patients}
    <p>Loading Patient List...</p>
  {:then patients} 
    <PatientSearch data={patients} bind:submit={selectPatient} bind:dataView={patientButton}/>
  {:catch}
    <p>Error loading patient list</p>
  {/await}
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Destination</Label
  >
  {#await data.hospitals}
  <p>Loading Hospital List...</p>
  {:then hospitals} 
    <HospitalSearch data={hospitals} bind:submit={selectHospital} bind:dataView={hospitalButton}/>
  {:catch}
    <p>Error loading hospital list</p>
  {/await}
  <Label for="Reason" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Reason for Referral</Label
  >
  <Textarea id="History">
  </Textarea>
  <Label for="History" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Medical History</Label
  >
  <Textarea id="History">
  </Textarea>
  <Label for="Diagnosis" class="font-semibold text-[11pt] block mb-1 mt-5"
    >Examination & Diagnosis</Label
  >
  <Textarea id="Diagnosis">
  </Textarea>
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Attach Documents</Label
  >
  <DataSelect bind:submit={selectAttachment} bind:dataView={attachmentButton}/>
  <Button type="submit" class="block w-full mt-5">Submit Referral</Button>
</form>

<style>
  .label {
    @apply bg-red-400;
  }
</style>
