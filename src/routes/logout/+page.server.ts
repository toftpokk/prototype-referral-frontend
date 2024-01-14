import { redirect } from '@sveltejs/kit'

export const load: import('./$types').PageServerLoad = ({cookies}) => {
    cookies.delete("username",{path: '/'})
    cookies.delete("role",{path: '/'})
    
    // Accepted
    throw redirect(303,"/")
}