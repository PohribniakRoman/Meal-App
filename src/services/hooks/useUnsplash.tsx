import { createApi } from "unsplash-js";


export const useUnsplash = () =>{
    const generatePhoto = async (query:string,size:number ):Promise<any[]> => {
        const unsplash = createApi({
            accessKey: import.meta.env.VITE_UNSPLASH_API_KEY,
        });
        const response = (await (unsplash.search.getPhotos({
            query,
            perPage:size,
            orientation:"squarish",
            orderBy:"relevant"
            }))).response?.results;
            return response as any[];
    }

    return {generatePhoto};
}