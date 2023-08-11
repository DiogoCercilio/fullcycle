import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { Button, Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { InventoryOperation, InventoryResponse } from '../models/InventoryInterface';
import { IProduct } from '../models/ProductInterface';
import FormProduct from '../components/Form/FormProduct';
import Dialog from '../components/Dialog';
import FormInventory from '../components/Form/FormInventory';
import { useService } from '../hooks/useService';
import ProductCard from '../components/ProductCard';

function Products() {
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [inventoryItem, setInventoryItem] = useState<IProduct>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const productService = useService().product;
    const { data, isLoading, isSuccess, isError, refetch } = useQuery(`products_pg_${current}`, () => {
        return productService.findAll(current)
    }, { refetchOnMount: true, staleTime: 10000 });
    const params = useParams()
    const inventoryService = useService().inventory;

    const onProductAddedHandler = (productAdded: IProduct) => {
        handleOpen();
        setProducts([productAdded, ...products]);
        toast.success('Produto criado com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT, });
    }

    const normalizeProduct = (res: InventoryResponse) => {
        return products.map(product => {
            if (product.id === res.product_id) product.quantity = res.quantity;
            return product;
        })
    }

    const onInventoryUpdated = (type: InventoryOperation, quantity: number, item: IProduct) => {
        const body = {
            product_id: item.id,
            quantity
        };

        inventoryService[type](body).then((res: InventoryResponse) => {
            setProducts(normalizeProduct(res));
            handleOpen();
            toast.success('Estoque alterado com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT, });
        })
    }

    const createProduct = {
        title: 'Criar novo Produto',
        content: <FormProduct onProductAdded={onProductAddedHandler} />
    }

    const updateInventory = {
        title: 'Atualizar Estoque',
        content: <FormInventory item={inventoryItem} onSubmit={onInventoryUpdated} />
    }

    const onChangeInventoryHandler = (item: IProduct) => {
        setInventoryItem(item);
        handleOpen();
    }

    const createProductHandler = () => {
        setInventoryItem(undefined);
        handleOpen()
    }

    const paginationPrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(current === 1) return;
        setCurrent(current - 1)
        refetch()
    }
    
    const paginationNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrent(current + 1)
        refetch()
    }

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        if (isSuccess) {
            setProducts(data.data)
        }
    }, [isSuccess, data])

    return (
        <div>
            <div className="flex text-center items-center justify-center relative my-10">
                <h1 className="font-thin text-center flex-1">
                    Produtos
                </h1>
                <div className="absolute right-0">
                    <Button color={"amber"} className="items-center m-auto block" onClick={() => createProductHandler()}>
                        Cadastrar novo Produto
                    </Button>
                </div>
            </div>
            <h1 className="text-center">
                {params.id}
            </h1>

            {isSuccess &&
                <div className="flex flex-col mb-20">
                    {products?.map(product => {
                        return <ProductCard
                            key={product.id}
                            item={product}
                            onChangeInventory={onChangeInventoryHandler}
                        />
                    }
                    )}
                    <div className="flex w-80 justify-around items-center m-auto mt-10">
                        <Button disabled={current === 1} onClick={(e) => paginationPrev(e)}>
                            Anterior
                        </Button>
                        <Button disabled={!!products.length && products.length < 15} onClick={(e) => paginationNext(e)}>
                            Próximo
                        </Button>
                    </div>
                </div>
            }


            {isLoading && <Spinner color="brown" className="mt-20 w-full h-5" />}
            {isError &&
                <p className="text-gray-600 text-center">
                    Não foi possível carregar a listagem de Produtos
                </p>}

            <Dialog
                size={'sm'}
                data={inventoryItem ? updateInventory : createProduct}
                open={open}
                handleOpen={handleOpen}
                hideFooter={true}
                className="mh-80"
            />
            <ToastContainer />
        </div>
    )
}

export default Products