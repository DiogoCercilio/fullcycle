import { useNavigate } from 'react-router-dom';
import { FormLoginStyled } from './FormLoginStyled';
import { Button, Input, Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthResponse } from '../../models/AuthInterface';
import { useService } from '../../hooks/useService';
import 'react-toastify/dist/ReactToastify.css';

function FormLogin() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const authService = useService().auth;
    const navigate = useNavigate();

    const doLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(!email || !password) return;

        setIsLoading(true);
        authService.login(email, password).then((res: AuthResponse) => {
            localStorage.setItem('token', res.access_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            navigate("/")
        }).catch(() => {
            toast.success('Não foi possível efetuar o login', { position: toast.POSITION.BOTTOM_RIGHT, });
        }).finally(() => setIsLoading(false));
    }

    return (
        <div className="w-full h-screen flex">
            <div className="m-auto flex-col items-center flex">
                <em className="text-gray-800 mb-3">admin@user.com / 123456</em>
                <FormLoginStyled>
                    <h2 className="text-blue-gray-500 font-thin mb-4">
                        Faça Login Para continuar
                    </h2>

                    <div className="mb-3 w-full">
                        <Input crossOrigin={false} label="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3 w-full">
                        <Input crossOrigin={false} label="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button color={'amber'} className="items-center m-auto w-full block" onClick={doLogin}>
                        {isLoading ? <Spinner color="brown" className="m-auto w-5 h-5" /> : 'Entrar'}
                    </Button>
                </FormLoginStyled>
            </div>
            <ToastContainer />
        </div>
    )
}

export default FormLogin