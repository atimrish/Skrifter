import {
    createBrowserRouter
} from "react-router-dom";

import MainPage from "@pages/MainPage.jsx";
import LoginPage from "@pages/LoginPage.jsx";

const router = createBrowserRouter([
    {
        "path": "/",
        element: <MainPage/>
    },
    {
        "path": "/login",
        element: <LoginPage/>
    }
])

export default router;