import styled from "styled-components";

interface ItemProps {
    qtde: number;
}

export const ProductCardStyled = styled.div.attrs(() => ({
    className: 'relative bg-[#2227] text-white justify-center items-center flex shadow-xl p-4 rounded m-1'
}))`
    ul {
        flex: auto;
    }
    li {
        color: #aaa;
        
        strong {
            color: #ddd;
            margin-right: 8px;
        }

        em {
            color: ${(props: ItemProps) => props.qtde > 10 ? '#a8e4a8' : '#ea8484'};
        }
    }
`
