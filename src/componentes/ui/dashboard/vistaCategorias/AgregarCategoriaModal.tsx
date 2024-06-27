import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';
import Categoria from '../../../../entidades/Categoria';

interface AgregarCategoriaModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (categoria: Categoria) => void;
    iCategoria: Categoria;
}

function AgregarCategoriaModal({ open, onClose, onSubmit, iCategoria }: AgregarCategoriaModalProps) {
    const [categoria, setCategoria] = useState<Categoria>(iCategoria);

    const handleSubmit = () => {
        onSubmit(categoria);
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
                        Agregar Nueva Categoria
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Nombre"
                            variant="outlined"
                            value={categoria.denominacion}
                            onChange={(e) => setCategoria({ ...categoria, denominacion: e.target.value })}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Guardar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default AgregarCategoriaModal;