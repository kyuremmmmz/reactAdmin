import { supabase } from "../supabaseClient";
const LoginData = async (email, password) => {
  const { error, session } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(`${error.message}`);
    return error.status;
  } else {
    return session;
  }
}

export default LoginData;
