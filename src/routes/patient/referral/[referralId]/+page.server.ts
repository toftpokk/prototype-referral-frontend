import { PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public"
import type { Referral, Consent } from "$lib/global"

export const load = async ({ params }) => {
    const referralId = params.referralId
    let response : Response
    let fetchData : Referral
    let fetchConsents : Consent[]
    try{
        response = await fetch(PUBLIC_SERVER_FRONTEND_URL+"/referral/"+referralId)
        fetchData = await response.json()
        if(!response.ok){
            throw new Error("Could not get referral data")
        }
    } catch(e){
        return {
            error: String(e)
        }
    }
    try {
        response = await fetch(PUBLIC_SERVER_FRONTEND_URL+"/referral/"+referralId+"/consent")
        fetchConsents = await response.json()
        if(!response.ok){
            throw new Error("Could not get consent data")
        }
    } catch(e){
        return {
            error: String(e)
        }
    }
    return {
        title: "Referral",
        referralId: referralId,
        referral: fetchData,
        consent: fetchConsents
    }
}