import { supabase } from '../supabaseClient';

const LoginData = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
    options: {
      captchaToken
    }
  });
  return { data, error };
};

export default LoginData;
