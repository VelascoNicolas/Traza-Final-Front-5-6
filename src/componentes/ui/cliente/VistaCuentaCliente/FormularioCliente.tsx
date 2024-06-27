import { CloudUpload, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Cliente from "../../../../entidades/Cliente";
import { editCliente } from "../../../../servicios/FuncionesAPI";

interface FormularioClienteTypes {
  cliente:Cliente;
  idSucursal:number;
}

export default function FormularioCliente({
  cliente, idSucursal
}: FormularioClienteTypes) {
  const [datosCliente,setDatosCliente]=useState<Cliente>(cliente);
  const [imagen, setImagen] = useState<string>(cliente.imagenCliente.url);


  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "grupardo");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dafcqvadi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setImagen(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setImagen("");
  };

  const handleSubmit=async (e:SyntheticEvent)=>{
    e.preventDefault();

    if(imagen==""){
      alert("Debe seleccionar una imagen");
      return;
    }
    let imgCliente=datosCliente.imagenCliente;
    imgCliente.url=imagen;
    setDatosCliente({...datosCliente,imagenCliente:imgCliente})
    if(await editCliente(datosCliente)){
      window.location.replace(`/cliente/sucursal/${idSucursal}`);
    }
    return;
    
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
      <Stack spacing={2} sx={{ padding: 4 }}>
        <Typography variant={"h4"} textAlign={"center"}>
          Edita tus datos
        </Typography>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <div>
            {imagen ? (
              <>
                <img
                  src={imagen}
                  alt="imagenCliente"
                  style={{ maxWidth: 200, maxHeight: 300 }}
                />
                <IconButton
                  aria-label="eliminar"
                  onClick={() => handleDeleteImage()}
                >
                  <Delete />
                </IconButton>
              </>
            ) : (
              <label htmlFor="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <Button variant="contained" component="span" startIcon={<CloudUpload />}>
                  Agregar Imagen
                </Button>
              </label>
            )}
          </div>
        </Stack>
        <TextField
          required
          label="Nombre"
          value={datosCliente.nombre}
          onChange={(e) => setDatosCliente({...datosCliente,nombre:e.target.value})}
        />
        <TextField
          required
          label="Apellido"
          value={datosCliente.apellido}
          onChange={(e) => setDatosCliente({...datosCliente,apellido:e.target.value})}
        />
        <TextField
          required
          type="tel"
          placeholder="261-1234567"
          label="Telefono"
          inputProps={{
            pattern: "[0-9]{3}-[0-9]{7}",
          }}
          value={datosCliente.telefono}
          onChange={(e) => setDatosCliente({...datosCliente,telefono:e.target.value})}
        />
        <TextField
          disabled
          type="email"
          label="Email"
          value={datosCliente.userName}
          onChange={(e) => setDatosCliente({...datosCliente,userName:e.target.value})}
        />
        <Button type="submit" variant="contained" sx={{ color: "white" }} color="secondary">
          Guardar Cambios
        </Button>
      </Stack>
    </Box>
  );
}
