import { Button, Input } from '@material-tailwind/react';
import { useState } from 'react';
import { FormInventoryStyled } from './FormInventoryStyled';
import { IProduct } from '../../models/ProductInterface';

interface FormInventoryProps {
    onSubmit: any;
    item: IProduct | undefined
}

function FormInventory({ item, onSubmit }: FormInventoryProps) {
    const [operationType, setOperationType] = useState<string>('add');
    const [inventoryUpdateQuantity, setInventoryUpdateQuantity] = useState<string>('0');

    const handleOperationType = (type: string) => {
        setOperationType(type)
        return;
    }

    const getQuantityPreview = () => {
        if (operationType === 'add' || !item?.quantity) {
            return (item?.quantity || 0) + parseInt(inventoryUpdateQuantity)
        }
        return (item?.quantity || 0) - parseInt(inventoryUpdateQuantity)
    }

    return (
        <>
            <FormInventoryStyled>
                <ul className="mb-5">
                    <li><strong>Nome:</strong> {item?.name}</li>
                    <li><strong>Categoria:</strong> {item?.category_name}</li>
                    <li><strong>Disponível </strong>em estoque: <em>{item?.quantity}</em></li>
                </ul>

                <h3 className="font-bold mb-2">
                    {item?.quantity ? 'Escolha uma ação:' : 'Dar entrada'}
                </h3>

                <div className="flex w-full mb-2">
                    {!!item?.quantity &&
                        <>
                            <Button
                                color={'blue'}
                                className={`mr-2 ${operationType === 'sub' ? 'fake-disabled' : ''}`}
                                onClick={() => handleOperationType('add')}
                            >
                                Dar entrada
                            </Button>
                            <Button
                                color={'deep-orange'}
                                className={`mr-2 ${operationType === 'add' ? 'fake-disabled' : ''}`}
                                onClick={() => handleOperationType('sub')}
                            >
                                Dar baixa
                            </Button>
                        </>
                    }

                    {(!!operationType || !item?.quantity) &&
                        <div className="flex-1">
                            <Input
                                crossOrigin={false}
                                type="number"
                                label="Informe a quantidade"
                                min={1}
                                max={operationType === 'sub' ? item?.quantity : Infinity}
                                onChange={(e) => setInventoryUpdateQuantity(e.target.value)}
                            />
                        </div>
                    }
                </div>

                <div>
                    <small className={`mb-10 flex justify-end ${inventoryUpdateQuantity ? '' : 'invisible'}`}>
                        Total disponível (após a confirmação da atualização):
                        <strong className="font-bold">{getQuantityPreview()}</strong>
                    </small>
                    <Button
                        color="amber"
                        className="w-full"
                        onClick={() => onSubmit(operationType, parseInt(inventoryUpdateQuantity), item)}
                        disabled={!inventoryUpdateQuantity || getQuantityPreview() < 0}
                    >
                        Atualizar estoque
                    </Button>
                </div>
            </FormInventoryStyled>
        </>
    )
}

export default FormInventory