<script lang="ts">
    import { onMount } from "svelte";
    import type { PatientData } from "$lib/global";
    import { getPatientName, setFormElement } from "$lib/global";

    export let patients : PatientData[]
    export let selectedPatient : PatientData

    let dialog : HTMLDialogElement;
    let form : HTMLFormElement;
    let manual_disabled : boolean = false

    export const dialogOpen : Function = ()=>{
        dialog.showModal()
    }
    const dialogClose = ()=>{
        dialog.close()
    }
    const handleSelect = (e: Event)=>{
        if(!e.target) return
        const target = e.target
        if(!(target instanceof HTMLSelectElement)) return
        if(!target.value){
            // empty string
            manual_disabled = false
            return
        }
        manual_disabled = true

        const patient = patients.filter((v)=>v.hn == target.value)[0]
        // setFormElement("hn", patient.hn)
        setFormElement("citizenId", patient.citizenId)
        setFormElement("prefix", patient.prefix)
        setFormElement("firstname", patient.firstname)
        setFormElement("lastname", patient.lastname)
        setFormElement("address", patient.address)
        setFormElement("birthDate", patient.birthDate)
        if(patient.gender == "gender-male"){
            const element = document.getElementById("gender-male") as HTMLInputElement
            element.checked = true
        }
        else{
            const element = document.getElementById("gender-female") as HTMLInputElement
            element.checked = true
        }
        setFormElement("email", patient.email)
        setFormElement("telephone", patient.telephone)
    }
    const handleDialogSubmit = ()=>{
        const data = new FormData(form,null)
        const dataJson = Object.fromEntries(data) as PatientData
        selectedPatient = dataJson
        dialogClose()
    }
    onMount(() => {
		dialog = document.getElementById('patientDialog') as HTMLDialogElement;
        form = document.getElementById('patientForm') as HTMLFormElement;
        const chooser = document.getElementById("selectPatient") as HTMLSelectElement
        manual_disabled = !(chooser.value == "")
    })
</script>
<dialog id="patientDialog" class="border">
    <div class="flex flex-col m-10 gap-3">
        <h2>Choose Patient</h2>
        <select on:change={handleSelect} class="basis-0 flex-grow-[1]" id="selectPatient" required>
            <option value="">-- Manual Input --</option>
            {#each patients as patient}
                <option value={patient.hn}>{getPatientName(patient)}</option>
            {/each}
        </select>
    </div>
    <p class="my-3 mx-10 text-center border-b leading-[0.1px]">
    </p>
    <form class="flex flex-col w-[40rem] m-10 gap-3" id="patientForm" on:submit={handleDialogSubmit} class:disabled={manual_disabled}>
        <label for="citizenId">Citizen Id</label>
        <input name="citizenId" id="citizenId" type="text" placeholder="000-000-000" class="basis-0 flex-grow-[2] min-w-0" required/>
        <div class="flex gap-1">
            <select name="prefix" class="basis-0 flex-grow-[1]" required>
                <option value="">Prefix.</option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
            </select>
            <input name="firstname" type="text" placeholder="First Name" class="basis-0 flex-grow-[3] min-w-0" required/>
            <input name="lastname" type="text" placeholder="Last Name" class="basis-0 flex-grow-[3] min-w-0" required/>
        </div>
        <input name="address" placeholder="Address" type="text" required>
        <div class="flex gap-1">
            <input name="birthDate" class="min-w-10" type="date" required>

            <input name="gender" class="basis-0 ms-4" value="gender-male" id="gender-male" type="radio" required>
            <label for="gender-male" class="my-auto">Male</label>
            <input name="gender" class="basis-0 ms-4" value="gender-female" id="gender-female" type="radio" required>
            <label for="gender-female" class="my-auto">Female</label>
        </div>
        <div class="flex gap-1">
            <input name="email" class="basis-0 flex-grow min-w-0" placeholder="Email" type="text" required>
            <input name="telephone" class="basis-0 flex-grow min-w-0" placeholder="Phone Number" type="tel" required>
        </div>
        <div class="mx-auto">
            <input type="button" on:click={dialogClose} class="btn-err enabled" value="Cancel"/>
            <input type="submit" class="btn enabled" value="Select"/>
        </div>
    </form>
</dialog>