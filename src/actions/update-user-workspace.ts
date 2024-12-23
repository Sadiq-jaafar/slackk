'use server'
import { supabaseServerClient } from "@/supabase/supabaseServer"

const updateUserWorkspace = async (userId:string, workspaceId:string)=>{
    const supabase = await supabaseServerClient();
    // update User record

    const {} = await supabase.rpc('add workspace')
}