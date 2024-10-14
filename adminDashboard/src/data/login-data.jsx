import { supabase } from '../supabaseClient';

const LoginData = async (email, password, captcha) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
    options: {
      captchaToken : captcha
    }
  });
  return { data, error };
};

export default LoginData;
