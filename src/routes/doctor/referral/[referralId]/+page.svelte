<script lang="ts">
    import ReferralView from '$lib/ReferralView.svelte';
import { translateReferralStatus } from '$lib/global';

    export let data : import('./$types').PageData;
    function getPrefix(p: string){
        if(p == "mr"){
            return "Mr."
        }
        else if(p == "mrs"){
            return "Mrs."
        }
        else if(p == "ms"){
            return "Ms."
        }
    }
</script>
<div>
    {#await data.referral}
        <p>Loading Referral...</p>
    {:then referral} 
        <ReferralView referral={referral}/>
    {:catch}
        <p>Error: Could not fetch referral</p>
    {/await}
</div>