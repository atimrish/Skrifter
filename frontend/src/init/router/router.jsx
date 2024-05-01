import {
    createBrowserRouter
} from "react-router-dom";

import MainPage from "@pages/main-page/MainPage.tsx";
import LoginPage from "@pages/LoginPage.tsx";
import RegisterPage from "@pages/register-page/RegisterPage.tsx";
import ProfilePage from "@pages/profile-page/ProfilePage.tsx";
import ProfileEditPage from "@pages/profile-edit-page/ProfileEditPage.tsx";
import ProductPage from "@pages/product-page/ProductPage.tsx";
import AdminPage from "@pages/admin-page/AdminPage.tsx";

const router = createBrowserRouter([
    {
        "path": "/",
        element: <MainPage/>
    },
    {
        "path": "/login",
        element: <LoginPage/>
    },
    {
        "path": "/register",
        element: <RegisterPage/>
    },
    {
        "path": "/profile/my",
        element: <ProfilePage/>
    },
    {
        "path": "/profile/edit",
        element: <ProfileEditPage/>
    },
    {
        "path": "/product",
        element: <ProductPage/>
    },
    {
        "path": "/admin",
        element: <AdminPage/>
    }
])

export default router;