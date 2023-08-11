import {
    Button,
    Dialog as _Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { DialogDataProps } from "../models/DialogInterface";

export default function Dialog({ handleOpen, open, data, hideFooter, className, size = 'xs' }: DialogDataProps) {
    return (
        <_Dialog open={open} handler={handleOpen} size={size}>
            <DialogHeader>
                {data?.title || ''}
            </DialogHeader>

            <DialogBody divider className={className}>
                {typeof data?.content === 'string' ?
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                    : data?.content}
            </DialogBody>

            <>
                {!hideFooter && <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={() => handleOpen(false)}>
                        Cancelar
                    </Button>

                    <Button variant="gradient" color="green" onClick={() => handleOpen(true)}>
                        Confirmar
                    </Button>
                </DialogFooter>
                }
            </>
        </_Dialog >
    );
}