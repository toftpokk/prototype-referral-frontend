import { env } from "$env/dynamic/public"
import type { HospitalData } from "$lib/global"

let hospitalCache : HospitalData[] = []
export async function translateHospitalServer(hcode: string) : Promise<string>{
    // Check if in cache
    let filtered = hospitalCache.filter((d)=>d.HospitalId == hcode)
    if(filtered.length > 0){
        return filtered[0].HospitalName
    }
    // Not -> fetch
    let response
    try{
        response = await fetch(env.PUBLIC_SERVER_FRONTEND_URL + "/hospitals")
        .then(async (d: Response)=>{
            if(d.status != 200){
                throw await d.json()
            }
            return d.json()
        })
    } catch(e){
        return String(e)
    }
    hospitalCache = response
    // Check in cache
    filtered = hospitalCache.filter((d)=>d.HospitalId == hcode)
    if(filtered.length > 0){
        return filtered[0].HospitalName
    }
    console.log(filtered)
    return "Unknown Hospital"
}