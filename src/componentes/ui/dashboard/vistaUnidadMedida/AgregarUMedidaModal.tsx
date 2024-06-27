import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';
import UnidadMedida from '../../../../entidades/UnidadMedida';

interface AgregarUnidadMedidaModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (unidadmedida: UnidadMedida) => void;
    iUnidadMedida: UnidadMedida;
}

function AgregarUnidadMedidaModal({ open, onClose, onSubmit, iUnidadMedida }: AgregarUnidadMedidaModalProps) {
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida>(iUnidadMedida);

    const handleSubmit = () => {
        onSubmit(unidadMedida);
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
                        Agregar Unidad Medida
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Nombre"
                            variant="outlined"
                            value={unidadMedida.denominacion}
                            onChange={(e) => setUnidadMedida({ ...unidadMedida, denominacion: e.target.value })}
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

export default AgregarUnidadMedidaModal;