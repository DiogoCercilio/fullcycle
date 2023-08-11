import { Button, Input, Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ICategory } from '../../models/CategoryInterface';
import { useService } from '../../hooks/useService';

function FormProduct({ onProductAdded }) {
    const [productName, setProductName] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [categories, setCategories] = useState<ICategory[]>([]);
    const categoryService = useService().category;
    const productService = useService().product;
    const { data, isSuccess } = useQuery('categories', categoryService.findAll, { 
        refetchOnMount: true,
        staleTime: 10000
    })

    const createProduct = () => {
        productService
            .create(productName, parseInt(productCategory))
            .then(res => {
                res.quantity = 0 // A especificação da API não prevê a quantidade no produto criado.
                res.category_name = categories.find(category => category.id === res.category_id)?.name || '';
                onProductAdded(res)
            })
    }

    useEffect(() => {
        if (isSuccess) setCategories(data)
      }, [data, isSuccess])    

    return (
        <>
            <div className="flex flex-col">
                <div className="mb-6">
                    <Input
                        crossOrigin={false}
                        label="Nome do Produto"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                    />
                </div>

                <Select label="Categoria do Produto" onChange={(e: any) => setProductCategory(e)}>
                    {categories.map(category =>
                        <Option children={category.name} value={category.id.toString()} />
                    )}
                </Select>
            </div>
            <div className="mt-10">
                <Button
                    color={'amber'}
                    className="items-center m-auto w-full"
                    onClick={createProduct}
                    disabled={!productName || !productCategory}
                >
                    Cadastrar novo Produto
                </Button>
            </div>
        </>
    )
}

export default FormProduct