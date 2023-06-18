import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";


export const useUnsplash = (query:string) =>{
    const [photo,setPhoto] = useState<null | string>(null);
    
    useEffect(()=>{
        (async ()=>{
            const unsplash = createApi({
                accessKey: import.meta.env.VITE_UNSPLASH_API_KEY,
            });
            const response = (await (unsplash.search.getPhotos({
                query,
                perPage:length,
                orientation:"landscape",
                orderBy:"latest"
            }))).response?.results[0].links.download;
            response && setPhoto(response);
        })()
    },[])

    return photo;
}