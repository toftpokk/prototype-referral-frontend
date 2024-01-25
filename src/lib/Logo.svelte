<script>

    import { PUBLIC_HOSPITAL_ID, PUBLIC_HOSPITAL_NAME, PUBLIC_ROLE } from "$env/static/public";

</script>
<div class="flex">
    <div class="flex flex-col ml-1">
        <span class="font-black text-xl leading-5">Referral System</span>
        {#if PUBLIC_ROLE == "Client"}
            <span class="">{PUBLIC_HOSPITAL_NAME} (ID: {PUBLIC_HOSPITAL_ID})</span>
        {:else}
        <span class="">Server</span>
        {/if}
    </div>
</div>