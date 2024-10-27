import { supabase } from "../supabaseClient"

const usersDatas = async () => {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
        return {
            error : error.message,
        };
    } else {
        return {
            data : data?.users || [],
        };
    }
}
export default usersDatas;