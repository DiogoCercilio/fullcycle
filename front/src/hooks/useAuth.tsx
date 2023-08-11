export const useAuth = (): boolean => {
    return !!localStorage.getItem('token');
}

