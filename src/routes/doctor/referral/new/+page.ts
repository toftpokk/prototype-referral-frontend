import { env } from '$env/dynamic/public'
import type { HospitalData, PatientData } from '$lib/global'

export const load = ({ params }) => {
  const response = fetch(env.PUBLIC_CLIENT_FRONTEND_URL + "/patient")
  .then(async (d: Response)=>{
      if(d.status != 200){
          throw await d.json()
      }
      return d.json()
  })
    .catch((e) => {
      return new Error("a")
    })
    const response2 = fetch(env.PUBLIC_CLIENT_FRONTEND_URL + "/hospitals")
    .then(async (d: Response)=>{
        if(d.status != 200){
            throw await d.json()
        }
        return d.json()
    })
    .catch((e) => {
      return new Error("a")
    })

  return {
    title: "New Referral",
    patients: response as Promise<PatientData[]>,
    hospitals: response2 as Promise<HospitalData[]>
  }
}