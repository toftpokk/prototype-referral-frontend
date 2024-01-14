import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public"
import type { Referral } from "$lib/global"

export const load = async ({ params }) => {
    const referralId = params.referralId
    let fetchData : Referral
    try{
        let response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/referral/"+referralId)
        fetchData = await response.json()
    } catch(e){
        return {
            error: String(e)
        }
    }
    return {
        title: "Referral",
        referralId: referralId,
        referral: fetchData
    }
}