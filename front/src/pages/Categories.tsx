import { Button, Spinner } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import { ICategory } from "../models/CategoryInterface";
import CategoryCard from "../components/CategoryCard"
import Dialog from "../components/Dialog";
import FormCategory from "../components/Form/FormCategory";
import { useService } from "../hooks/useService";

function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const categoryService = useService().category;
  const { data, isLoading, isSuccess, isError } = useQuery('categories', categoryService.findAll, {
    refetchOnMount: true,
    staleTime: 10000
  })

  const onCategoryAddedHandler = (categoryAdded: ICategory) => {
    handleOpen();
    setCategories([...categories, categoryAdded]);
    toast.success('Categoria criada com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT, });
  }

  const onCategoryErrorHandler = () => {
    handleOpen();
    toast.error('Ocorreu um erro :(', { position: toast.POSITION.BOTTOM_RIGHT, });
  }

  const dialogContent = {
    title: 'Criar nova Categoria',
    content: <FormCategory onCategoryAdded={onCategoryAddedHandler} onCategoryError={onCategoryErrorHandler} />
  }

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (isSuccess) setCategories(data)
  }, [data, isSuccess])

  return (
    <div>
      <div className="flex text-center items-center justify-center relative my-10">
        <h1 className="font-thin text-center flex-1">
          Categorias
        </h1>
        <div className="absolute right-0">
          <Button color={"amber"} className="items-center m-auto block" onClick={() => handleOpen()}>
            Cadastrar nova Categoria
          </Button>
        </div>
      </div>

      <div className="w-full justify-between">
        {isSuccess && categories?.map((category: ICategory) =>
          <CategoryCard key={category.id} data={category} />
        )}
        {isLoading && <Spinner color="brown" className="mt-20 w-full h-5" />}
        {isError &&
          <p className="text-gray-600 text-center">
            Não foi possível carregar a listagem de Categorias
          </p>}
      </div>

      <Dialog
        data={dialogContent}
        open={open}
        handleOpen={handleOpen}
        hideFooter={true}
      />
      <ToastContainer />
    </div>
  )
}

export default Categories