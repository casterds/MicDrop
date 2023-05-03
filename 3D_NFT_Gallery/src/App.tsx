import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import MicDropGallery from "./components/MicDropGallery";


function App() {
    return (
        <Routes>
            <Route path={"/gallery-micdrop"} element={<MicDropGallery/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default App

