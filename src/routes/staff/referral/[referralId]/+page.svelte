<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { env } from '$env/dynamic/public';
    import ReferralView from '$lib/ReferralView.svelte';
    import FileView from '$lib/FileView.svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import { ReferralStatus, translateFileState, translateHospitalClient } from '$lib/global';
    export let data : import('./$types').PageData;
    let grantError = ""
    const grant = (verdict: boolean)=>()=>{
        const payload = JSON.stringify({
            Granted: verdict
        })
        const response = fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+data.referralId+"/grant",{
            method: "POST",
            body: payload
        }).then(async (d: Response)=>{
            if(d.status != 200){
                grantError = (await d.json()).message
                return
            }
            grantError = ""
        })
        invalidateAll()
    }
    const sendReferral = ()=>{
        const response = fetch(env.PUBLIC_CLIENT_FRONTEND_URL+"/assign/"+data.referralId+"?doctor=test",{
            method: "POST",
        }).then(async (d: Response)=>{
            if(d.status != 200){
                grantError = (await d.json()).message
                return
            }
            grantError = ""
        })
        invalidateAll()
    }
</script>
<div class="mx-auto max-w-[40rem]">
    <Card.Root class="my-2">
        <Card.Header class="pb-0">
          <Card.Title>Grant</Card.Title>
        </Card.Header>
        <Card.Content>
        {#if data.referral.Origin == env.PUBLIC_HOSPITAL_ID}
            <!--I am origin-->
            {#if data.referral.ReferralStatus == ReferralStatus.Created}
                <p>The referral is awaiting patient consent</p>
            {:else if data.referral.ReferralStatus == ReferralStatus.Consented}
                <p>The referral is awaiting permisson to refer</p>
            
            {:else if data.referral.ReferralStatus == ReferralStatus.NotGranted}
                <p>The destination has denied permission to refer.</p>
            {:else}
                <p>The destination has given permission to refer. The referral is being processed.</p>
            {/if}
        {:else}
            <div>
                {#if grantError}
                    <p>Grant Error: {grantError}</p>
                {/if}
                <div class="my-4">
                {#if data.referral.ReferralStatus == ReferralStatus.Created}
                    <p>The referral is awaiting patient consent</p>
                {:else if data.referral.ReferralStatus == ReferralStatus.Consented}
                    <Button on:click={grant(true)}>Grant Permission to Refer</Button>
                    <Button on:click={grant(false)} variant="destructive">Deny Permission to Refer</Button>
                
                {:else if data.referral.ReferralStatus == ReferralStatus.NotGranted}
                    <p>You have denied permission to refer.</p>
                {:else}
                    <p>You have given permission to refer. The referral is being processed.</p>
                {/if}
                </div>
            </div>
        {/if}
        </Card.Content>
      </Card.Root>
        <FileView 
        referral={data.referral}
        referralId={data.referralId}
        files={data.referralFiles}
        isAssigned={data.isAssigned}
        isOrigin={data.referral.Origin == env.PUBLIC_HOSPITAL_ID}
        isDoc={false}
        sendReferral={sendReferral}
        ></FileView>
      <ReferralView referral={data.referral} referralId={data.referralId} translateHospital={translateHospitalClient}/>
</div>