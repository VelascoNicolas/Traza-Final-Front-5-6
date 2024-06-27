import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';
import Categoria from '../../../../entidades/Categoria';
import EditarSucursalesModal from './EditarSucursalesModal';
import EditarSubCategModal from './EditarSubCategModal';
import Sucursal from '../../../../entidades/Sucursal';

interface EditarCategoriaModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (categoria: Categoria) => void;
    iCategoria: Categoria;
}

function EditarCategoriaModal({ open, onClose, onSubmit, iCategoria }: EditarCategoriaModalProps) {
    const [categoria, setCategoria] = useState<Categoria>(iCategoria);
    const [listaSubCategorias, setListaSubCategorias] = useState<Categoria[]>(iCategoria.subCategorias);
    const [listaSucursales, setListaSucursales] = useState<Sucursal[]>(iCategoria.sucursales);
    const [openSubCat, setOpenSubCat] = useState(false);
    const [openSucursales, setOpenSucursales] = useState(false);

    const handleOpenSubCat = () => setOpenSubCat(true);
    const handleCloseSubCat = () => setOpenSubCat(false);

    const handleSubmitModalSubCat = (nuevasSubCat: Categoria[]) => {
        setListaSubCategorias(nuevasSubCat);
        setOpenSubCat(false);
    };

    const handleOpenSucursales = () => setOpenSucursales(true);
    const handleCloseSucursales = () => setOpenSucursales(false);

    const handleSubmitModalSucursales = (nuevasSucursales: Sucursal[]) => {
        setListaSucursales(nuevasSucursales);
        setOpenSucursales(false);
    };

    const handleSubmit = () => {
        const updatedCategoria = {
            ...categoria,
            subCategorias: listaSubCategorias,
            sucursales: listaSucursales,
        };

        setCategoria(updatedCategoria);
        onSubmit(updatedCategoria);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Typography variant="h6" id="modal-title" gutterBottom>
                        Editar Categoria
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Nombre"
                            variant="outlined"
                            value={categoria.denominacion}
                            onChange={(e) => setCategoria({ ...categoria, denominacion: e.target.value })}
                        />
                        <Button variant="contained" color="info" onClick={handleOpenSubCat}>
                            Editar SubCategorías
                        </Button>
                        <Button variant="contained" color="info" onClick={handleOpenSucursales}>
                            Editar Sucursales
                        </Button>
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 50 }}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Stack>
                    {openSubCat && categoria && (
                        <EditarSubCategModal
                            open={openSubCat}
                            onClose={handleCloseSubCat}
                            onSubmit={handleSubmitModalSubCat}
                            iCategoria={categoria}
                        />
                    )}
                    {openSucursales && categoria && (
                        <EditarSucursalesModal
                            open={openSucursales}
                            onClose={handleCloseSucursales}
                            onSubmit={handleSubmitModalSucursales}
                            iCategoria={categoria}
                        />
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default EditarCategoriaModal;