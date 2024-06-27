import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarProductoModal from './AgregarProductoModal';
import ArticuloManufacturado from '../../../../entidades/ArticuloManufacturado';
import { saveArticuloManufacturado } from '../../../../servicios/FuncionesAPI';

function BotonAgregarProducto() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (articuloM: ArticuloManufacturado) => {
        articuloM.fechaBaja = "9999-12-31";
        saveArticuloManufacturado(articuloM);
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleOpen}
            >
                Agregar producto
            </Button>
            {open && (
                <AgregarProductoModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iArticuloM={new ArticuloManufacturado}
                />
            )}
        </>
    );
}

export default BotonAgregarProducto;