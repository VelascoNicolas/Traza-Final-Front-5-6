import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarSucursalModal from './AgregarSucursalModal';
import { saveSucursal } from '../../../../servicios/FuncionesAPI';
import Empresa from '../../../../entidades/Empresa';
import Sucursal from '../../../../entidades/Sucursal';

interface BotonAgregarSucursalProps {
    iEmpresa: Empresa;
}

function BotonAgregarSucursal({ iEmpresa }: BotonAgregarSucursalProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (sucursal: Sucursal) => {
        sucursal.fechaBaja = "9999-12-31";
        sucursal.domicilio.fechaBaja = "9999-12-31";
        sucursal.empresa = iEmpresa;
        saveSucursal(sucursal);
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
                Agregar sucursal
            </Button>

            {open && (
                <AgregarSucursalModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iSucursal={new Sucursal}
                />
            )}
        </>
    );
}

export default BotonAgregarSucursal;