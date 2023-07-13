import { useEffect, useState } from "react"

export interface CounterInterface {
    value?:number,
}


export const Counter:React.FC<CounterInterface> = ({value = 0}) =>{
    const [currentValue,setCurrentValue]= useState<number>(0);
    useEffect(()=>{
        const timming = value/Math.abs(value-currentValue)-5;
        const count = setInterval(()=>{
            if(currentValue !== value){
                value > currentValue
                ?setCurrentValue(currentValue+1)
                :setCurrentValue(currentValue-1);
            }
            clearInterval(count)
        },timming)
    },[value,currentValue])
    
    return <span className="counter">{currentValue}</span>
}