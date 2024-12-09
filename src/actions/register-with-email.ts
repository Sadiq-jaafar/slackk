'use server'
import {supabaseServerClient} from '@supabase/supabase-js'

export async function registerWithEmail({email}:{email:string}){
    const supabase = await supabaseServerClient();
    const curremtOrigin =process.env.NEXT_PUBLIC_CURRENT_ORIGIN;
    const response = await supabase.auth.signInWithOtp({
        email,
        options:{
            emailRedirectTo: process.env.NEXT_PUBLIC_CURRENT_ORIGIN
        }
    });
    return JSON.stringify(response)
}

