import { useEffect, useState } from 'react';
import {
    Paper,
    Modal,
    Box,
    IconButton,
    Typography,
    List,
    ListItem,
    Stack,
    ListItemText,
    Button
} from '@mui/material';
import Categoria from '../../../../entidades/Categoria';
import { getSucursalesEmpresa } from '../../../../servicios/FuncionesAPI';
import { Add, Remove } from '@mui/icons-material';
import Sucursal from '../../../../entidades/Sucursal';

interface EditarSucursalesModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (sucursales: Sucursal[]) => void;
    iCategoria: Categoria;
}

function EditarSucursalesModal({ open, onClose, onSubmit, iCategoria }: EditarSucursalesModalProps) {
    const [sucursales, setSucursales] = useState<Sucursal[]>(iCategoria.sucursales);
    const [sucursalesNoAgreg, setSucursalesNoAgreg] = useState<Sucursal[]>([]);
    const idEmpresa = 1;
    const { data: sucursalesEmp } = getSucursalesEmpresa(idEmpresa);
    
    useEffect(() => {
        if (sucursalesEmp) {
            const sucuAux = sucursalesEmp.filter((sucursal: Sucursal) =>
                !sucursales.some((suc: Sucursal) => suc.id === sucursal.id)
            );
            setSucursalesNoAgreg(sucuAux);
        }
    }, [sucursalesEmp, sucursales]);

    const handleAgregarSucursal = (sucursal: Sucursal) => {
        setSucursales((prev) => [...prev, sucursal]);
        setSucursalesNoAgreg((prev) => prev.filter((cat) => cat.id !== sucursal.id));
    };

    const handleEliminarSucursal = (sucursal: Sucursal) => {
        setSucursales((prev) => prev.filter((cat) => cat.id !== sucursal.id));
        setSucursalesNoAgreg((prev) => [...prev, sucursal]);
    };

    const handleSubmit = () => {
        onSubmit(sucursales);
        setSucursales([]);
        setSucursalesNoAgreg([]);
        onClose();
    };

    const handleClose = () => {
        setSucursales([]);
        setSucursalesNoAgreg([]);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                    Editar Sucursales
                </Typography>
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Paper elevation={5} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                            Sucursales
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>



                            {sucursales?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                            .map((item: Sucursal) => (

                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleEliminarSucursal(item)}>
                                                <Remove />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper elevation={5} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                            Agregar sucursales
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>



                            {sucursalesNoAgreg?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                            .map((item: Sucursal) => (

                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleAgregarSucursal(item)}>
                                                <Add />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: 25 }}>
                        Guardar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} style={{ margin: 25}}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditarSucursalesModal;