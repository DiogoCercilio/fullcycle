import { size } from "@material-tailwind/react/types/components/dialog";

export interface DialogDataPropsContent {
    title: string;
    content: any;
}

export interface DialogDataProps {
    handleOpen: any;
    open: boolean;
    data: DialogDataPropsContent;
    size?: size;
    className?: string;
    hideFooter?: boolean
}