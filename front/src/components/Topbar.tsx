import { NavLink, useNavigate } from "react-router-dom";
import { TopbarStyled } from "./TopbarStyled";

function Topbar() {
    const navigate = useNavigate();
    const doCheckout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <TopbarStyled>
            <ul className="flex w-auto flex-1">
                <NavLink to={'/'} className="mx-5">
                    Categorias
                </NavLink>
                <NavLink to={'/produtos'} className="mx-5">
                    Produtos
                </NavLink>
            </ul>

            <ul className="flex w-auto justify-end">
                <li>
                    <NavLink onClick={doCheckout} to="#">
                        Sair
                    </NavLink>
                </li>
            </ul>
        </TopbarStyled>
    )
}

export default Topbar