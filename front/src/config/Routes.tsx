import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import Products from "../pages/Products";

export const routes = [
    {
        path: "/login",
        element: <AuthLayout />,
    },
    {
        path: "/",
        errorElement: <NotFound />,
        element: <MainLayout />,
        children: [{
            path: "",
            element: <Categories />
        }],
    },
    {
        path: "/produtos",
        element: <MainLayout />,
        children: [{
            path: "",
            element: <Products />,
        }],
    }
]