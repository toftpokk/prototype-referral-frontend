import { PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

export async function load(){
    let response : Response
    try {
        response = await fetch(PUBLIC_SERVER_FRONTEND_URL+"/referral?Id=1232123213")
        if(!response.ok){
            throw new Error("Could not connect to server");
        }
    } catch (error) {
        return {
            title: "Referral Cases",
            referrals: [],
            error: "Error: Could not connect to referral system server"
        }
    }
    let fetchData : Referral[] = await response.json()
    return {
        referrals: fetchData,
        title: "My Referrals"
    } 
}
