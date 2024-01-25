import { redirect } from '@sveltejs/kit'

export const load: import('./$types').PageServerLoad = ({cookies}) => {
    cookies.delete("username",{path: '/',secure:false})
    cookies.delete("role",{path: '/',secure:false})
    
    // Accepted
    throw redirect(303,"/")
}