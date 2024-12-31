'use server'

import { supabaseServerClient } from "@/supabase/supabaseServer"


export const getUserWorkspaceData = async (workspaceIds:Array<string>)=>{
const supase =await supabaseServerClient();
const {data,error} = await supase
.from('workspace')
.select('*')
.in('in', workspaceIds)

return[data, error];
};



export const getCurrentWorkspaceData = async (workspaceId: string) => {
    const supabase = await supabaseServerClient();

    const { data, error } = await supabase
        .from("workspace")
        .select('*')
        .eq('id', workspaceId)
        .single();

    return { data, error };
};