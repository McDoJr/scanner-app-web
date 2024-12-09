import {Route, Routes} from "react-router-dom";
import SignIn from "../pages/SignIn.tsx";
import MuseumItems from "../pages/MuseumItems.tsx";
import Logs from "../pages/Logs.tsx";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route index element={<SignIn />} />
            <Route path="admin/logs" element={<Logs />} />
            <Route path="admin/items" element={<MuseumItems />} />
        </Routes>
    )
}
export default PrivateRoutes
