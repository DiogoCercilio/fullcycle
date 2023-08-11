import styled from "styled-components";

export const TopbarStyled = styled.div.attrs(() => ({
    className: 'm-auto mb-4 bg-[#2a2a2a] shadow-md rounded-md px-4 p-2 flex justify-center text-right'
}))`
    li {
        cursor: pointer;
        margin: 0 24px;
    }
`
