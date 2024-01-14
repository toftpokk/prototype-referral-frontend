<script lang="ts">
    import { onMount } from "svelte";
    import type { HospitalData } from "$lib/global";
    import { setFormElement } from "$lib/global";

    export let hospitals : HospitalData[]
    export let selectedHospital : HospitalData

    let form : HTMLFormElement
    let dialog : HTMLDialogElement
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
        console.log(target)
        if(!(target instanceof HTMLSelectElement)) return
        if(!target.value){
            // empty string
            manual_disabled = false
            return
        }
        manual_disabled = true

        const hospital = hospitals.filter((v)=>v.hcode == target.value)[0]
        setFormElement("hcode", hospital.hcode)
        setFormElement("hname", hospital.hname)

    }
    const handleSubmit = () => {
        const data = new FormData(form,null)
        const dataJson = Object.fromEntries(data) as HospitalData
        selectedHospital = dataJson
        dialogClose()
    }
    onMount(() => {
		dialog = document.getElementById('hospitalDialog') as HTMLDialogElement;
        form = document.getElementById('hospitalForm') as HTMLFormElement;
        const chooser = document.getElementById("selectHospital") as HTMLSelectElement
        manual_disabled = !(chooser.value == "")
    })
</script>
<dialog id="hospitalDialog">
    <div class="flex flex-col m-10 gap-3">
        <h2>Choose Destination</h2>
        <select id="selectHospital" name="choose" on:change={handleSelect} class="basis-0 flex-grow-[1]" required>
            <option value="">-- Select a Destination --</option>
            {#each hospitals as hospital}
                <option value={hospital.hcode}>{hospital.hname}</option>
            {/each}
        </select>
    </div>
    <p class="my-3 mx-10 text-center border-b leading-[0.1px]">
    <form class="flex flex-col w-[40rem] m-10 gap-3" id="hospitalForm" class:disabled={manual_disabled} on:submit={handleSubmit}>
        <div class="flex gap-1">
            <input name="hcode" class="basis-0 flex-grow min-w-0" placeholder="Hospital Code" type="text">
            <input name="hname" class="basis-0 flex-grow min-w-0" placeholder="Hospital Name" type="tel">
        </div>
        <div class="mx-auto">
            <input type="button" on:click={dialogClose} class="btn-err enabled" value="Cancel"/>
            <input type="submit" class="btn enabled" value="Select"/>
        </div>
    </form>
</dialog>