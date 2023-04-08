import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home";
import List from "./pages/List/List";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<List />}>
                <Route path='/:pokemonId' element={<Detail />} />
            </Route>
        </Routes>
    )
}
export default Router;