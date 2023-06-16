import { Typography } from "@mui/material"
import { Navbar } from "../components/Navbar"
import { Search } from "../components/Search"
import { Product } from "../components/Product"
import { SideCart } from "../components/SideCart";
const template = {
    label:"Salo",
    price:500,
    discount:false,
    view:102,
    store:"АТБ",
    away:"2km",
    awayTime:"20 min",
    id:1,
    rating:5,
    img:"",
};

export const Shop:React.FC = () => {
    return <section className="page">
        <Navbar/>
        <div className="page__container">   
            <Search/>
            <Typography className="page__title">Shop</Typography>
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
        <SideCart/>
    </section>
}