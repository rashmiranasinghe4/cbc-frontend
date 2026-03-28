const url = "https://ddavukofbzormscyygkb.supabase.co"


const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYXZ1a29mYnpvcm1zY3l5Z2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NzIyMjAsImV4cCI6MjA5MDI0ODIyMH0.IX5_W73wHi18w95iqJ4jpnCaL_xK22muqWKr9peM5i4"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise  = new Promise(

        (resolve, reject)=>{

            if(file == null){
                reject("Please select a file to upload");
                return;
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file");
                }
            )
            

        }

    )
    return promise;
}