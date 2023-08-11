import { Button } from "@material-tailwind/react"
import { ProductCardStyled } from "./ProductCardStyled"
import { ProductCardProps } from "../models/ProductInterface"

function ProductCard({ item, onChangeInventory }: ProductCardProps) {
  return (
    <ProductCardStyled qtde={item.quantity}>
      <ul>
        <li><strong>Nome:</strong> {item.name}</li>
        <li><strong>Categoria:</strong> {item.category_name}</li>
        <li><strong>Disponível em estoque:</strong><em>{item.quantity}</em></li>
      </ul>

      <div>
        <Button size="sm" color={"indigo"} onClick={()=> onChangeInventory(item)}>
          Alterar estoque
        </Button>
      </div>
    </ProductCardStyled>
  )
}

export default ProductCard