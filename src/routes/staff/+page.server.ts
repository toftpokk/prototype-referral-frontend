import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

export async function load(){
    let response : Response
    try {
        // TODO
        response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/staff/referral?Id=1111")
        if(!response.ok){
            throw new Error("Could not connect to client");
        }
    } catch (error) {
        return {
            title: "Referral Cases",
            referrals: [],
            error: "Error: Could not connect to referral system client"
        }
    }
    let fetchData : Referral[] = await response.json()
    return {
        referrals: fetchData,
        title: "Referral Cases"
    } 
}
