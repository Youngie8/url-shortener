import supabase from "./supabase";

export async function getClicksForUrls(UrlIds) {
    const {data, error} = await supabase
        .from('clicks')
        .select("*")
        .in('url_id', UrlIds)        
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load Clicks");
    }

    return data
}