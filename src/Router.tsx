import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Detail />} />
        </Routes>
    )
}