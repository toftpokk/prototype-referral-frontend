import { redirect } from '@sveltejs/kit'

export const load: import('./$types').LayoutServerLoad = ({cookies}) => {
    const username = cookies.get('username')
    const role = cookies.get('role')
    if(!username){
        return redirect(303,"/login")
    }
    if(role != "doctor"){
        return redirect(303,"/login")
    }
    return {
        role,
        username
    }
}