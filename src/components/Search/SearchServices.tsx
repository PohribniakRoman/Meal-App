export interface FindMatchIE {
    value:string,
    data:any[]
}
const findMatch = ({value,data}:FindMatchIE):any[] => {
    const result = []
    for(let element of data){
        const currentMeal = element.strMeal.toLowerCase(); 
        for(let i = 0;i < currentMeal.length;i++){
            if(value === currentMeal.slice(i,i+value.length)){
                result.push(element);
                break;
            }
        };
    }
    return result;
}

const calculateHeight = (state:("template"|"loading"|any[])):string =>{
    let height = 30;
    const blockHeight = 30;
    if(state === "loading"){
        height = 130;
    }
    if(typeof state === "object"){
        height = state.length * blockHeight;
    }
    return height+"px";
}


export const SearchServices = {findMatch,calculateHeight}