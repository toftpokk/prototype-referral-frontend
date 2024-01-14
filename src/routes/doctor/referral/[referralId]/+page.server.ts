import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public"
import type { Referral } from "$lib/global"

export const load = async ({ params }) => {
    const referralId = params.referralId
    let response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
    let fetchData : Referral = await response.json()
    return {
        title: "Referral",
        referralId: referralId,
        referral: fetchData
    }
}