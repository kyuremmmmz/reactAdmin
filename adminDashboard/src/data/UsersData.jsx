import { supabase } from "../supabaseClient"

const users = async () => {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
        return error;
    } else {
        return data;
    }
}