import { SyntheticEvent, useState } from "react";
import {
  getProvinciasIdPais,
  getLocalidadesIdProvincia,
  saveCliente,
} from "../../../servicios/FuncionesAPI";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Cliente from "../../../entidades/Cliente";
import Domicilio from "../../../entidades/Domicilio";
import ImagenCliente from "../../../entidades/ImagenCliente";
import Localidad from "../../../entidades/Localidad";
import Provincia from "../../../entidades/Provincia";

interface FormRegistroTypes {
  userEmail: string;
}

export default function FormRegistro({ userEmail }: FormRegistroTypes) {
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:600px)");
  //Si es falso, entonces estas en vista mobile
  const {
    data: provincias,
    isLoading: prvinciasLoading,
    error: provinciaError,
  } = getProvinciasIdPais(1);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [email, setEmail] = useState<string>(userEmail);
  const [calle, setCalle] = useState<string>("");
  const [numero, setNumero] = useState<number>(0);
  const [codPostal, setCodPostal] = useState<number>(0);
  const [nroPiso, setNroPiso] = useState<number>(0);
  const [nroDepto, setNroDepto] = useState<number>(0);
  const [localidad, setLocalidad] = useState<number>(0);
  const [provincia, setProvincia] = useState<number>(0);
  const [imagen, setImagen] = useState<string>("");

  const {
    data: localidades,
    isLoading: localidadesLoading,
    error: localidadError,
  } = getLocalidadesIdProvincia(provincia);

  if (provinciaError || localidadError) {
    return <h1>Ocurrio un error al cargar los datos...</h1>;
  }

  if (prvinciasLoading || localidadesLoading) {
    return <CircularProgress />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (provincia == 0) {
      alert("Debe seleccionar una provincia ");
      return;
    } else if (localidad == 0) {
      alert("Debe seleccionar una localidad");
      return;
    }else if(imagen==""){
      alert("Debe seleccionar una imagen");
    }


    let cliente = new Cliente();

    let localArray = localidades!.filter(
      (item: Localidad) => item.id == localidad
    );

    let img = new ImagenCliente();
    img.url = imagen;

    let domicilio = new Domicilio();
    domicilio.calle = calle;
    domicilio.numero = numero;
    domicilio.cp = codPostal;
    domicilio.piso = nroPiso;
    domicilio.nroDpto = nroDepto;
    domicilio.localidad = localArray[0];

    cliente.userName = email!;
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.telefono = telefono;
    cliente.imagenCliente = img;
    cliente.domicilios = [domicilio];

    saveCliente(cliente);
  };

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

  return (
    <Container>
      <Paper elevation={5} sx={{ padding: 5, marginTop: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Cuentanos mas sobre ti...
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Ingresa Tu Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
                <TextField
                  required
                  label="Ingresa Tu Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
                <TextField
                  required
                  type="tel"
                  placeholder="261-1234567"
                  label="Telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  inputProps={{
                    pattern: "[0-9]{3}-[0-9]{7}",
                  }}
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
              </Stack>
              <Stack alignItems={"center"} justifyContent={"center"}>
                <div>
                  {imagen ? (
                    <>
                      <img
                        src={imagen}
                        alt="imagenEmpleado"
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
                      <Button variant="contained" component="span">
                        Agregar Imagen
                      </Button>
                    </label>
                  )}
                </div>
              </Stack>
              <TextField
                disabled
                type="email"
                label="Email"
                placeholder="ejemplo@ejemplo.com.ar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography>Datos de envio</Typography>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Calle"
                  sx={vistaEscritorio ? { width: 710 } : {}}
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                />
                <TextField
                  required
                  label="Numero"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                  type="number"
                  value={numero}
                  onChange={(e) => setNumero(Number(e.target.value))}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Codigo Postal"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                  value={codPostal}
                  onChange={(e) => setCodPostal(Number(e.target.value))}
                />
                <TextField
                  required
                  label="Nro Piso"
                  helperText="Si no vive en un piso/departamento deje el valor en 0"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                  value={nroPiso}
                  onChange={(e) => setNroPiso(Number(e.target.value))}
                />
                <TextField
                  required
                  label="Nro Departamento"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                  value={nroDepto}
                  onChange={(e) => setNroDepto(Number(e.target.value))}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <FormControl fullWidth>
                  <InputLabel id="provincia-select">Provincia</InputLabel>
                  <Select
                    labelId="provincia-select"
                    label="Provincia"
                    onChange={(e) => setProvincia(Number(e.target.value))}
                    value={provincia}
                  >
                    <MenuItem value={0}>Selecciona una provincia</MenuItem>
                    {provincias
                      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((item: Provincia,index:number) => (
                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="localidad-select">Localidad</InputLabel>
                  <Select
                    labelId="localidad-select"
                    required
                    label="Localidad"
                    onChange={(e) => setLocalidad(Number(e.target.value))}
                    value={localidad}
                    disabled={provincia == 0}
                  >
                    <MenuItem value={0}>Selecciona una localidad</MenuItem>
                    {localidades
                      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((item: Localidad,index:number) => (
                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Stack>
              <Button type="submit" variant="contained">
                Finalizar Registro
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
