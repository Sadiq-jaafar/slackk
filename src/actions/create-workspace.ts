'use server';

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { error } from "console";

export const createWorkspace= async ({
    imageUrl, 
    name,
    slug, 
    invite_code
}:{
    imageUrl?:string;
     name:string;
    slug:string; 
    invite_code:string;
})=> {
    const supabase =await supabaseServerClient()
    const userData = await getUserData()

    if (!userData){
        return {error:"user not Found"};
    }

    const {error, data:workspaceRecord}= await supabase.from('workspace').insert({
        image_url:imageUrl,
        name,
        super_admin: userData.id,
        invite_code,
    }).select('*')

    if (error){
        return {insertError:error}
    }
    const []= await updateUserWorkspace(userData.id,workspaceRecord[0].id)
}