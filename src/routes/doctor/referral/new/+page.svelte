<script lang="ts">
    import { onMount } from "svelte";
    import type { PatientData, HospitalData, Referral } from "$lib/global";
    import PatientDialog from "./PatientDialog.svelte";
    import HospitalDialog from "./HospitalDialog.svelte";
    import { Department, getPatientName } from "$lib/global";
    import DataDialog from "./DataDialog.svelte";
    import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
    import { goto } from "$app/navigation";

    let hospitalDialogOpen : Function
    let patientDialogOpen : Function
    let dataDialogOpen : Function
    
    let referralForm : HTMLFormElement

    let error = ""

    const patients : PatientData[] = [
        // Need only id
        {
            hn: "12345",
            citizenId: "1232123213",
            prefix: "mr",
            firstname: "Test",
            lastname: "Onw",
            address: "234 Road Something",
            birthDate: "2022-05-04",
            gender: "gender-male",
            email: "mail@mail",
            telephone: "0909876543",
        },
        {
            hn: "12346",
            citizenId: "1232123213",
            prefix: "mrs",
            firstname: "Test",
            lastname: "Two",
            address: "234 Lorem Ipsum",
            birthDate: "2022-05-04",
            gender: "gender-male",
            email: "mail@mail2",
            telephone: "0909876543",
        },
    ]
    const hospitals : HospitalData[] = [
        {
            hcode: "123456",
            hname: "One Two Three"
        },
        {
            hcode: "1234567",
            hname: "Sne Two Seven"
        },
    ]
    const medicalData =[
        {
            id: "12345",
            date: "2022-01-02",
            department: "Orthopedia",
            doctor: "Baker Baker",
            diagnosis: "You have Cancer",
        },
        {
            id: "12346",
            date: "2023-01-02",
            department: "Bone",
            doctor: "Aner Baker",
            diagnosis: "You don't Cancer",
        },
        {
            id: "12347",
            date: "2021-01-02",
            department: "Abc",
            doctor: "Xan Baker",
            diagnosis: "Motherload",
        },
    ]
    let selectedPatient : PatientData;
    let selectedHospital : HospitalData
    let selectedData : string[]
    const submitForm = async (e: Event)=>{
        e.preventDefault()
        const data = new FormData(referralForm,null)
        const dataJson = Object.fromEntries(data) as Record<string,any>
        // TODO DoctorId
        const doctorId = "123456"
        // TODO Department
        const department = Department.Orthopaedic
        // TODO DataFiles
        const dataFiles = "Data here"
        if(!selectedPatient){
            error = "Error: Please select a patient"
            return
        }
        if(!selectedHospital){
            error = "Error: Please select a destination hospital"
            return
        }
        if(!dataJson["history"]){
            error = "Error: Please provide patient's medical history"
            return
        }
        if(!dataJson["diagnosis"]){
            error = "Error: Please provide patient's examination and diagnosis"
            return
        }
        if(!dataJson["reason"]){
            error = "Error: Please provide reason for referral"
            return
        }
        const requestJson : Omit<Referral,"Origin"|"Id"|"IsOutgoing"|"ReferralStatus"|"CreationDate"> 
            & {History: string, Diagnosis: string, DataFiles: string} = {
            DoctorId: doctorId,
            Destination: selectedHospital.hcode,
            Department: department,
            Reason: dataJson["reason"],
            CitizenId: selectedPatient.citizenId,
            Prefix: selectedPatient.prefix,
            FirstName: selectedPatient.firstname,
            LastName: selectedPatient.lastname,
            BirthDate: selectedPatient.birthDate,
            Address: selectedPatient.address,
            Gender: selectedPatient.gender == "gender-male"? "male": "female",
            Telephone: selectedPatient.telephone,
            Email: selectedPatient.email,
            History: dataJson["history"],
            Diagnosis: dataJson["diagnosis"],
            DataFiles: dataFiles
        }
        error = ""
        let response : Response
        try {
            response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestJson)
            })
            if(!response.ok){
                throw new Error("Error: Server error");
            }
        } catch (err) {
            console.log(err)
            error = String(err)
            return
        }
        // response: ok
        // TODO go to referral page of this e.g. /referral/{response.id}
        goto("/")
    }
    onMount(() => {
		referralForm = document.getElementById('referralForm') as HTMLFormElement;
    })
</script>

<PatientDialog patients={patients} bind:selectedPatient={selectedPatient} bind:dialogOpen={patientDialogOpen}/>
<HospitalDialog hospitals={hospitals} bind:selectedHospital={selectedHospital} bind:dialogOpen={hospitalDialogOpen} />
<DataDialog data={medicalData} bind:dialogOpen={dataDialogOpen} bind:selectedData={selectedData}/>
<div class="w-full fixed top-0 left-0 z-10">
    <div class="text-error-100 font-bold bg-red-200 my-5 px-5 py-4 w-[30rem] mx-auto" class:collapse={error == ""}>
        <button class=" font-normal text-black pr-3" on:click={()=>error=""}>X</button> {error}
    </div>
</div>
<div class="flex flex-col w-[40rem] mx-auto mb-20 mt-5">
    <!-- TODO submit patient data & dest with form action (maybe undoable, maybe need ajax)-->
    <form class="flex flex-col gap-3" id="referralForm" method="POST" on:submit={submitForm}>
        <h2 class="form-required">Patient</h2>
        <input type="button" on:click={patientDialogOpen()} value={selectedPatient ? getPatientName(selectedPatient) : "-- Select a Patient --"} class="text-start btn-alt"/>

        <h2 class="form-required">Destination</h2>
        <input type="button" on:click={hospitalDialogOpen()} value={selectedHospital? selectedHospital.hname : "-- Select a Hospital --"} class="text-start btn-alt"/>

        <label for="reason" class="form-required">Reason for Referral</label>
        <textarea id="reason" name="reason" rows="3"/>

        <label for="history" class="form-required">Medical History</label>
        <textarea id="history" name="history" rows="7"/>
        
        <label for="diagnosis" class="form-required">Examination & Diagnosis</label>
        <textarea id="diagnosis" name="diagnosis" rows="7"/>

        <label for="diagnosis" class="form-required">Data</label>
        <button on:click={dataDialogOpen()} type="button" id="attachmentDialog" class="btn-alt text-start">
            {#if selectedData}
            <p>Selected Data:</p>
                {#each medicalData.filter((v)=>selectedData.includes(v.id)) as visit}
                    <p>{visit.date} - {visit.doctor} - {visit.diagnosis}</p>
                {/each}
            {:else}
                <p>-- Select Data --</p>
            {/if}
        </button>
        <div class="mx-auto">
            <input type="submit" class="btn" value="Create Referral &rarr;"/>
        </div>
    </form>
</div>
