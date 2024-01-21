import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

async function loadReferrals(): Promise<Referral[]> {
    let response : Response
    try {
        // TODO
        response = await fetch(PUBLIC_CLIENT_FRONTEND_URL+"/")
        if(!response.ok){
            console.log(await response.text())
            throw new Error("Could not fetch from referral system client: "+response.statusText);
        }
    } catch (error) {
        return []
    }
    let fetchData : {"referrals":Referral[]} = await response.json()
    let referrals = fetchData["referrals"]
    referrals.sort((a,b)=>{
        return a.Id > b.Id ? -1 : 1
    }) 
    await sleep(5000);
    return referrals
}

export async function load(){
    return {
        title: "Referral Cases",
        referrals: await loadReferrals(),
    } 
}
