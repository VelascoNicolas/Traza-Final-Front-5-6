import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarPromocionModal from './AgregarPromocionModal';
import Promocion from '../../../../entidades/Promocion';
import { savePromocion } from '../../../../servicios/FuncionesAPI';

function BotonAgregarPromocion() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (promocion: Promocion) => {
        promocion.fechaBaja = "9999-12-31";
        savePromocion(promocion);
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
                Agregar promoción
            </Button>
            {open && (
                <AgregarPromocionModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iPromocion={new Promocion}
                />
            )}
        </>
    );
}

export default BotonAgregarPromocion;