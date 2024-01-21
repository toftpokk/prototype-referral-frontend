import { PUBLIC_CLIENT_FRONTEND_URL } from '$env/static/public'
import type { HospitalData, PatientData } from '$lib/global'

export const load = ({ params }) => {

  const response = fetch(PUBLIC_CLIENT_FRONTEND_URL + "/patients")
    .then(d => d.json())
    .catch((e) => {
      return new Error("a")
    })
    const response2 = fetch(PUBLIC_CLIENT_FRONTEND_URL + "/hospitals")
    .then(d => d.json())
    .catch((e) => {
      return new Error("a")
    })

  return {
    title: "New Referral",
    patients: response as Promise<PatientData[]>,
    hospitals: response2 as Promise<HospitalData[]>
  }
}

export const actions : import('./$types').Actions = {
    default: async ({request})  => {
        console.log(await request.formData())
//         // console.log(await request.formData())
//         // return fail(400, {
//         //     error: "Test Error"
//         // })
//         cookies.set("username","test",{path: '/'})
//         // login as doctor
//         cookies.set("role","doctor",{path: '/'})
        
//         // Accepted
//         throw redirect(303,"/doctor")
    }
};