import { Typography } from "@mui/material";

export interface DishCounter {
  amount:number,
  setAmount:Function,
  isDisabled?:boolean
}

export const DishCounter: React.FC<DishCounter> = ({amount,setAmount,isDisabled = false}) => {

  return (
    <div className="product__amount">
        {!isDisabled && 
        <div className="product__amount--add" onClick={()=>{
            setAmount(amount+1);
        }}>+</div>}
        <Typography className={`product__amount--value ${isDisabled?"disabled":""}`}>{amount}</Typography>
        {!isDisabled && <div className="product__amount--remove" onClick={()=>{
            setAmount(amount-1<0?0:amount-1);
        }}>-</div>}
    </div>
  );
};
