<script lang="ts">
    import { ReferralStatus, translateReferralStatus } from "./global";
    import { cn } from "./utils";

    export let status : ReferralStatus
    const badgeClass = "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    
    let className: string | undefined | null = undefined;
	export { className as class };
</script>
<style>
    /* Errors */
    .NotGranted{
        @apply bg-red-300;
    }
    /* Action Needed */
    .Created {
        @apply bg-orange-300;
    }
    /* Action Not Needed */
    .Consented{
        @apply bg-gray-300;
    }
    .UploadIncomplete{
        @apply bg-gray-300;
    }
    .Granted{
        @apply bg-gray-300;
    }
    .UploadComplete {
        @apply bg-green-200;
    }
    .Complete{
        @apply bg-green-100 text-green-700 border border-green-200;
    }
</style>
<span class={cn(badgeClass,status, className)}>
    {translateReferralStatus(status)}
</span>