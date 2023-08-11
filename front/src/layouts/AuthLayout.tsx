import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FormLogin from '../components/Form/FormLogin';

function AuthLayout() {
    const isAuth = useAuth()

    return (
        <>
            {isAuth ?
                <Navigate to="/" replace={true} />
                :
                <FormLogin />
            }
        </>
    )
}

export default AuthLayout