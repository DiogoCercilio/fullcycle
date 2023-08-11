import { WrapperStyled } from "./WrapperStyled"

export default function Wrapper({ children }: any) {
    return (
        <WrapperStyled>
            {children}
        </WrapperStyled>
    )
}