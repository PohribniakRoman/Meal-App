import { Navbar } from "../components/Navbar"
import { Product } from "../components/Product"
import { CartItem } from "../services/reducers/cartReducer"

export const Cart:React.FC = () =>{
    const template = {
        label:"Salo",
        price:"500",
        discount:false,
        store:"АТБ",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, beatae!",
        id:1,
        img:"",
    };
    return <section className="page">
        <Navbar/>
        <Product product={template}/>
    </section>
}