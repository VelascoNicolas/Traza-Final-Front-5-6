import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarInsumoModal from './AgregarInsumoModal';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';
import { saveArticuloInsumo } from '../../../../servicios/FuncionesAPI';

function BotonAgregarInsumo() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (insumo: ArticuloInsumo) => {
        insumo.fechaBaja = "9999-12-31";
        saveArticuloInsumo(insumo);
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
                Agregar insumo
            </Button>
            {open && (
            <AgregarInsumoModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                iInsumo={new ArticuloInsumo}
            />
            )}
        </>
    );
}

export default BotonAgregarInsumo;