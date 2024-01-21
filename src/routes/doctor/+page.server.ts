import { PUBLIC_CLIENT_FRONTEND_URL } from "$env/static/public";
import type { Referral } from "$lib/global"
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export function load(){
    const response = fetch(PUBLIC_CLIENT_FRONTEND_URL+"/")
        .then(d=>d.json())
        .then((d:{"referrals":Referral[]})=>d["referrals"]
            .sort((a,b)=>{
                return a.Id > b.Id ? -1 : 1
            })
        )
        .catch((e)=>{
            console.log(e)
            return new Error("a")
        })
    return {
        title: "Referral Cases",
        referrals: response as Promise<Referral[]>,
    } 
}
