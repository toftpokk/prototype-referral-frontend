
<script lang="ts">
    import { PUBLIC_CLIENT_FRONTEND_URL, PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
    import { ConsentStatus, type Consent, GrantStatus, type Referral } from "$lib/global";
    import { onMount } from "svelte";
    // import type { HospitalData } from "$lib/global";
    // import { setFormElement } from "$lib/global";

    // export let hospitals : HospitalData[]
    // export let selectedHospital : HospitalData
    let referralId : number

    // let form : HTMLFormElement
    let dialog : HTMLDialogElement
    // let manual_disabled : boolean = false

    export const dialogOpen : Function = (id: number)=>{
        referralId =  id
        dialog.showModal()
    }
    const dialogClose = ()=>{
        dialog.close()
    }
    const handleAccept = async ()=>{
        const verdict = GrantStatus.Accepted
        const response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+`/staff/grant?Id=${referralId}&Grant=${verdict}`,
        {
            method: "POST"
        })
        if(!response.ok){
            console.log(response)
            return // TODO Error
        }
        dialogClose()
    }
    const handleDecline = async ()=>{
        const verdict = GrantStatus.Declined
        const response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+`/staff/grant?Id=${referralId}&Grant=${verdict}`,
        {
            method: "POST"
        })
        if(!response.ok){
            console.log(response)
            return // TODO Error
        }
        dialogClose()
    }
    onMount(() => {
		dialog = document.getElementById('grantDialog') as HTMLDialogElement;
    })
</script>
<dialog id="grantDialog">
    <div class="flex flex-col m-10 gap-3">
        <h2 class="text-xl">Referral Request to Transfer from A to B</h2>
        <!-- <h2>{consent?consent.Message:""}</h2> -->
    </div>
    <form class="flex flex-col w-[40rem] m-10 gap-3" id="hospitalForm">
        <div class="mx-auto">
            <input type="button" class="btn" value="Accept" on:click={handleAccept}/>
            <input type="button" class="btn-err" value="Decline" on:click={handleDecline}/>
        </div>
        <p class="my-3 mx-10 text-center border-b leading-[0.1px]">
        <div class="mx-auto">
            <input type="button" on:click={dialogClose} class="btn-alt enabled" value="Cancel"/>
        </div>
    </form>
</dialog>