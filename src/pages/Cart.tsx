import { Typography } from "@mui/material";
import { Navbar } from "../components/Navbar"
import { Product } from "../components/Product"

const template = {
    label:"Salo",
    price:"500",
    discount:false,
    view:102,
    store:"АТБ",
    away:"2km",
    awayTime:"20 min",
    id:1,
    rating:5,
    img:"",
};

export const Cart:React.FC = () =>{
    return <section className="page">
        <Navbar/>
        <div className="page__container">
        <Typography className="page__title">Cart</Typography>
            <div className="product__wrapper">
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
                <Product product={template}/>
            </div>
        </div>
    </section>
}