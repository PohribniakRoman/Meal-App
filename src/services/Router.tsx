import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Shop } from "../pages/Shop"
import { Error404 } from "../pages/Error404"
import { Cart } from "../pages/Cart"
import { Saved } from "../pages/Saved"
import { DishPage } from "../pages/DishPage"

export const Router:React.FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/saved" element={<Saved/>}/>
            <Route path="/dish/:id" element={<DishPage/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    </BrowserRouter>
}