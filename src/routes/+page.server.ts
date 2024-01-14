import { redirect } from '@sveltejs/kit'

export const load: import('./$types').PageServerLoad = ({cookies}) => {
    const role = cookies.get('role')
    if(role == "doctor"){
        // redirect to role
        redirect(303, "/doctor")
    }
    else if(role == "patient"){
        // redirect to role
        redirect(303, "/patient")
    }
    else if(role == "staff"){
        // redirect to role
        redirect(303, "/staff")
    }
    else{
        redirect(303, "/login")
    }
}