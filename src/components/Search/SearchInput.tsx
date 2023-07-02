import { TextField, Typography } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";

export type InputCotroller = {
    value:string,
    setValue:Function,
}

export const SearchInput:React.FC<InputCotroller> = ({value,setValue})=>{
    return <div className="search-modal__input--container">
    <TextField autoFocus variant="outlined" name="meal-search" label="Dish name" className="search-modal__input" value={value} onChange={(event)=>{
        const element = event.target as HTMLInputElement;
        const string = element.value.replace(/[.*+?^${}()|[\]\\1-9-+/0:,;'"`~=]/g,"");
        setValue(string?string:"");
    }}/>
    <Typography className={`search-modal__input--clear ${value?"shown":"hidden"}`} onClick={()=>setValue("")}><AiFillDelete/></Typography>
</div>
}