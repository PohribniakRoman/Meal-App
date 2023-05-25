import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Error404 } from "../pages/Error404"

export const Router:React.FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    </BrowserRouter>
}