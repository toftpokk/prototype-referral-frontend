import { PUBLIC_SERVER_FRONTEND_URL } from "$env/static/public";
import type { Hospital, Referral } from "$lib/global"

export function load(){
    const response = fetch(PUBLIC_SERVER_FRONTEND_URL+"/hospital")
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
        .then((d:Hospital[])=>d
            .sort((a,b)=>{
                return a.Id < b.Id ? -1 : 1
            })
        )
        .catch((e)=>{
            console.log(e)
            return new Error("a")
        })
    return {
        title: "Hospitals",
        hospitals: response as Promise<Hospital[]>,
    } 
}
