import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarUnidadMedidaModal from './AgregarUMedidaModal';
import UnidadMedida from '../../../../entidades/UnidadMedida';
import { saveUnidadMedida } from '../../../../servicios/FuncionesAPI';

function BotonAgregarUnidadMedida() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSubmit = (unidadmedida: UnidadMedida) => {
        unidadmedida.fechaBaja = "9999-12-31";
        saveUnidadMedida(unidadmedida);
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
                Agregar Unidad de Medida
            </Button>
            {open && (
                <AgregarUnidadMedidaModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iUnidadMedida={new UnidadMedida}
                />
            )}
        </>
    );
}

export default BotonAgregarUnidadMedida;