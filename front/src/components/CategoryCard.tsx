import { CategoryCardProps } from '../models/CategoryInterface';
import { CategoryCardStyled } from './CategoryCardStyled';

function CategoryCard({ data }: CategoryCardProps) {
    return (
        <CategoryCardStyled>
            {data.name}
        </CategoryCardStyled>
    )
}

export default CategoryCard