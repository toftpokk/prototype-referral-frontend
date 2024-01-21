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
  let value: DateValue | undefined = undefined;
  const df = new DateFormatter("en-GB", {
    dateStyle: "long",
  });
  const labelClass = "font-semibold text-[11pt] block mb-1";

  // Patient
  let patient : any
  let selectPatient = (p:any)=>{
    patientButton = `${p.Hn.toUpperCase()} ${p.FirstName} ${p.LastName}`
    patient = p
  }
  let patientButton = "Find Patient"

  // Hospital
  let hospital : any
  let selectHospital = (p:any)=>{
    hospitalButton = `${p.Id}: ${p.Name}`
    hospital = p
  }
  let hospitalButton = "Find Destination"

  // Data
  let data : any
  let selectData = (p:any)=>{
    dataButton = `${JSON.stringify(p)}`
    data = p
  }
  let dataButton = "Select Data"

</script>
<!-- <PatientDialog patients={patients} bind:selectedPatient={selectedPatient} bind:dialogOpen={patientDialogOpen}/> -->
<!-- <HospitalDialog hospitals={hospitals} bind:selectedHospital={selectedHospital} bind:dialogOpen={hospitalDialogOpen} /> -->
<!-- <DataDialog data={medicalData} bind:dialogOpen={dataDialogOpen} bind:selectedData={selectedData}/> -->
<form class="mx-auto max-w-[40rem]">
  <Label class="font-semibold text-[11pt] block mb-1"
    >Patient</Label
  >
  <PatientSearch bind:submit={selectPatient} bind:dataView={patientButton}/>
  <Label class="font-semibold text-[11pt] block mb-1 mt-5"
    >Destination</Label
  >
  <HospitalSearch bind:submit={selectHospital} bind:dataView={hospitalButton}/>
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
  <DataSelect bind:submit={selectData} bind:dataView={dataButton}/>
  <Button type="submit" class="block w-full mt-5">Submit Referral</Button>
</form>

<style>
  .label {
    @apply bg-red-400;
  }
</style>
