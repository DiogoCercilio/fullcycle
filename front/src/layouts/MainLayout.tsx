import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Wrapper from "../components/Wrapper";
import Topbar from "../components/Topbar";

export default function MainLayout() {
    const isAuth = useAuth()

    return (
        <main>
            {isAuth ?
                <Wrapper className="mt-2">
                    <Topbar />
                    <Outlet />
                </Wrapper>
                :
                <>
                    Náo esta logado...
                    <Navigate to="/login" replace={true} />
                </>
            }
        </main>
    )
}