import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarEmpleadoModal from './AgregarEmpleadoModal';
import { saveEmpleado } from '../../../../servicios/FuncionesAPI';
import Empleado from '../../../../entidades/Empleado';

function BotonAgregarEmpleado() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (empleado: Empleado) => {
        empleado.fechaBaja = "9999-12-31";
        saveEmpleado(empleado);
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
                Agregar Empleado
            </Button>
            {open && (
                <AgregarEmpleadoModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iEmpleado={new Empleado}
                />
            )}
        </>
    );
}

export default BotonAgregarEmpleado;