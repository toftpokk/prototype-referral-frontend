<script lang="ts">
    import { onMount } from "svelte";
    import type { HospitalData } from "$lib/global";
    import { setFormElement } from "$lib/global";
    import Table from "$lib/Table.svelte";

    // export let hospitals : HospitalData[]
    export let selectedData : string[]
    export let data: any[]

    let form : HTMLFormElement
    let dialog : HTMLDialogElement

    export const dialogOpen : Function = ()=>{
        dialog.showModal()
    }
    const dialogClose = ()=>{
        dialog.close()
    }
    const handleSubmit = (e: Event) => {
        const data = new FormData(form,null)
        const dataJson = Object.fromEntries(data)
        selectedData = Object.keys(dataJson)
        console.log(selectedData)
        dialogClose()
        e.preventDefault()
    }
    onMount(() => {
		dialog = document.getElementById('dataDialog') as HTMLDialogElement;
        form = document.getElementById('dataForm') as HTMLFormElement;
    })
</script>
<dialog id="dataDialog">
    <form class="flex flex-col w-[50rem] m-10 gap-3" id="dataForm" on:submit={handleSubmit}>
        <h2>Select Visit</h2>
        <Table
            header={
                [
                    {key:"visit", name:"", type:"select"},
                    {key:"date", name:"Date"},
                    {key:"department", name:"Department"},
                    {key:"doctor", name:"Physician"},
                    {key:"diagnosis", name:"Diagnosis"},
                ]
            }
            data={data}
        />
        <div class="mx-auto">
            <input type="button" on:click={dialogClose} class="btn-err" value="Cancel"/>
            <input type="submit" class="btn" value="Select"/>
        </div>
    </form>
</dialog>