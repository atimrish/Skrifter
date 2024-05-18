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
import CreateAuthor from "@pages/admin-page/CreateAuthor.tsx";
import CommentPage from "@pages/comment-page/CommentPage.tsx";
import DiscussionPage from "@pages/discussion-page/DiscussionPage.tsx";
import SearchPage from "@pages/search-page/SearchPage.tsx";
import FeedbackPage from "@pages/feedback-page/FeedbackPage.tsx";
import FavoritePage from "@pages/favorite-page/FavoritePage.tsx";
import ReadPage from "@pages/read-page/ReadPage.tsx";
import AuthorPage from "@pages/author-page/AuthorPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/profile/my",
        element: <ProfilePage/>
    },
    {
        path: "/profile/edit",
        element: <ProfileEditPage/>
    },
    {
        path: "/product/:id",
        element: <ProductPage/>
    },
    {
        path: "/product/:id/comments",
        element: <CommentPage/>
    },
    {
        path: "/product/:id/discussions",
        element: <DiscussionPage/>
    },
    {
        path: "/admin",
        element: <AdminPage/>
    },
    {
        path: "/admin/author",
        element: <CreateAuthor/>,
    },
    {
        path: "/search",
        element: <SearchPage/>,
    },
    {
        path: "/feedback",
        element: <FeedbackPage/>,
    },
    {
        path: "/favorite",
        element: <FavoritePage/>,
    },
    {
        path: "/product/:id/read",
        element: <ReadPage/>,
    },
    {
        path: "/author",
        element: <AuthorPage/>,
    }
])

export default router;