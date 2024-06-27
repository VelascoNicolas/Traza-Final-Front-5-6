import { useState } from 'react';
import { Modal, Box, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';
import { getAllUnidadMedida, getCategoriasIdSucursal } from '../../../../servicios/FuncionesAPI';
import Imagen from '../../../../entidades/Imagen';
import DeleteIcon from '@mui/icons-material/Delete';

interface AgregarInsumoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (insumo: ArticuloInsumo) => void;
    iInsumo: ArticuloInsumo;
}

function AgregarInsumoModal({ open, onClose, onSubmit, iInsumo }: AgregarInsumoModalProps) {
    const idSucursal = 1;
    const [insumo, setInsumo] = useState<ArticuloInsumo>(iInsumo);
    const [unidadMedidaL, setUnidadMedida] = useState(insumo.unidadMedida.id);
    const [categoriaL, setCategoria] = useState(insumo.categoria.id);
    const [imagenesL, setImagenesL] = useState<Imagen[]>(insumo.imagenes);
    const { data: unidadesMedida } = getAllUnidadMedida();
    const { data: categorias } = getCategoriasIdSucursal(idSucursal);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = () => {
        if (imagenesL.length === 0) {
            alert('Debe agregar al menos una imagen antes de guardar.');
            return;
        }

        if (insumo.stockActual < insumo.stockMinimo || insumo.stockActual > insumo.stockMaximo) {
            alert('El stock actual no puede ser mayor al maximo ni menor al minimo.');
            return;
        }
        
        const selectedCategoria = categorias?.find(cat => cat.id === categoriaL);
        const selectedUMedida = unidadesMedida?.find(um => um.id === unidadMedidaL);

        if (!selectedCategoria || !selectedUMedida) {
            console.error("La categoría o unidad de medida seleccionados son inválidos.");
            return;
        }

        const updatedInsumo = {
            ...insumo,
            categoria: selectedCategoria,
            unidadMedida: selectedUMedida,
            imagenes: imagenesL,
        };

        setInsumo(updatedInsumo);
        onSubmit(updatedInsumo);
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        if ((files.length + imagenesL.length) > 3) {
            setOpenSnackbar(true);
            return;
        }

        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'grupardo'); // Reemplaza 'your_cloudinary_upload_preset' con tu preset de Cloudinary
            const response = await fetch('https://api.cloudinary.com/v1_1/dafcqvadi/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        });

        try {
            const urls = await Promise.all(uploadPromises);
            const newImages = urls.map(url => {
                const imagen = new Imagen();
                imagen.id = 0;
                imagen.url = url;
                imagen.eliminado = false;
                return imagen;
            });
            setImagenesL([...imagenesL, ...newImages]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = [...imagenesL];
        updatedImages.splice(index, 1);
        setImagenesL(updatedImages);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                    overflow: 'auto',
                    maxHeight: 600
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
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Nombre"
                            variant="outlined"
                            value={insumo.denominacion}
                            onChange={(e) => setInsumo({ ...insumo, denominacion: e.target.value })}
                        />
                        <TextField
                            required
                            label="Precio de venta"
                            variant="outlined"
                            value={insumo.precioVenta}
                            onChange={(e) => setInsumo({ ...insumo, precioVenta: parseInt(e.target.value) })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="uMedida-label">Unidad de medida</InputLabel>
                            <Select
                                required
                                labelId="uMedida-label"
                                value={unidadMedidaL}
                                onChange={(e) => setUnidadMedida(e.target.value as number)}
                                label="Unidad de medida"
                            >
                                {unidadesMedida?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                    .map((unidadMedida) => (
                                        <MenuItem key={unidadMedida.id} value={unidadMedida.id}>
                                            {unidadMedida.denominacion}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel id="categoria-label">Categoría</InputLabel>
                            <Select
                                required
                                labelId="categoria-label"
                                value={categoriaL}
                                onChange={(e) => setCategoria(e.target.value as number)}
                                label="Categoria"
                            >
                                {categorias?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                    .map((categoria) => (
                                        <MenuItem key={categoria.id} value={categoria.id}>
                                            {categoria.denominacion}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            id="file-upload"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span">
                                Agregar Imagen
                            </Button>
                        </label>
                        {/* Visualización de las imágenes */}
                        <Grid container spacing={1}>
                            {imagenesL.map((imagen, index) => (
                                <Grid item key={index} marginBottom={2}>
                                    <img src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: 200 }} />
                                    <IconButton aria-label="eliminar" onClick={() => handleDeleteImage(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            ))}
                        </Grid>
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                                No puedes seleccionar más de 3 imágenes.
                            </Alert>
                        </Snackbar>
                        <TextField
                            required
                            label="Precio de compra"
                            variant="outlined"
                            value={insumo.precioCompra}
                            onChange={(e) => setInsumo({ ...insumo, precioCompra: parseInt(e.target.value) })}
                        />
                        <TextField
                            required
                            label="Stock Mínimo"
                            variant="outlined"
                            value={insumo.stockMinimo}
                            onChange={(e) => setInsumo({ ...insumo, stockMinimo: parseInt(e.target.value) })}
                        />
                        <TextField
                            required
                            label="Stock Máximo"
                            variant="outlined"
                            value={insumo.stockMaximo}
                            onChange={(e) => setInsumo({ ...insumo, stockMaximo: parseInt(e.target.value) })}
                        />
                        <TextField
                            required
                            label="Stock Actual"
                            variant="outlined"
                            inputProps={{ min: insumo.stockMinimo, max: insumo.stockMaximo }}
                            value={insumo.stockActual}
                            onChange={(e) => setInsumo({ ...insumo, stockActual: parseInt(e.target.value) })}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={insumo.esParaElaborar}
                                    onChange={(e) => setInsumo({ ...insumo, esParaElaborar: e.target.checked })}
                                    name="esParaElaborar"
                                    color="primary"
                                />
                            }
                            label="Es para elaborar"
                        />
                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 10 }}>
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

export default AgregarInsumoModal;