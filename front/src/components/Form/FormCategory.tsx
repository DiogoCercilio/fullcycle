import { Button, Input, Spinner } from '@material-tailwind/react'
import { useState } from 'react';
import { useService } from '../../hooks/useService';

function FormCategory({ onCategoryAdded, onCategoryError }) {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState('')
    const categoryService = useService().category;
    
    const createCategory = () => {
        setIsloading(true)
        categoryService.create(categoryName)
            .then(res => onCategoryAdded(res))
            .catch(() => onCategoryError())
            .finally(() => setIsloading(false))
    }

    return (
        <>
            <div className="flex flex-col">
                <Input
                    crossOrigin={false}
                    label="Nome da Categoria"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                />
            </div>
            <div className="mt-10">
                <Button
                    color={'amber'}
                    className="items-center m-auto w-full"
                    onClick={createCategory} disabled={!categoryName}
                >
                    {isLoading ?
                        <Spinner color="brown" className="m-auto w-5 h-5" /> :
                        'Cadastrar nova Categoria'}
                </Button>
            </div>
        </>
    )
}

export default FormCategory