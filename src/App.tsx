import AuthProvider from "./provider/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes.tsx";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <PrivateRoutes />
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App
