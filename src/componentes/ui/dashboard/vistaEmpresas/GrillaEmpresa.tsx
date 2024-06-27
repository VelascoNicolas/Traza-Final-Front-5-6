import { Button, Grid } from "@mui/material";
import {
  editEmpresa,
  getAllEmpresas,
} from "../../../../servicios/FuncionesAPI";
import Empresa from "../../../../entidades/Empresa";
import ItemGrilla from "./ItemGrilla";
import { useState } from "react";
import { Edit, Info } from "@mui/icons-material";
import AgregarEmpresaModal from "./AgregarEmpresaModal";
import MostrarSucursalesModal from "./MostrarSucursalesModal";
import getTokenAuth0 from "../../../../hooks/getTokenAuth0";

interface GrillaProps {
  busqueda: string;
}

export default function Grilla({ busqueda }: GrillaProps) {
  const token = getTokenAuth0();//Funcion para traer el token
  //console.log(token);
  const { data: empresa } = getAllEmpresas(token);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleSubmit = (empresa: Empresa) => {
    if (editingEmpresa != null) {
      editEmpresa(empresa);
      handleCloseEditar();
    }
  };

  const handleOpenEditar = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingEmpresa(null);
    setOpenEditar(false);
  };

  const handleOpenInfo = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setEditingEmpresa(null);
    setOpenInfo(false);
  };

  const empresasFiltradas = empresa?.filter((item: Empresa) => {
    return (
      busqueda === "" ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={1}
      >
        {empresasFiltradas
          ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((item: Empresa) => (
            <ItemGrilla
              key={item.id}
              nombre={item.nombre}
              descripcion={"Razón social: " + item.razonSocial}
              info={"CUIT: " + item.cuil.toString()}
              info2={""}
              urlImagen="/imgs/empresa.jpg"
            >
              <Button
                size="small"
                variant="contained"
                color="info"
                startIcon={<Info />}
                onClick={() => handleOpenInfo(item)}
              >
                Sucursales
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleOpenEditar(item)}
              >
                Editar
              </Button>
            </ItemGrilla>
          ))}
      </Grid>
      {openEditar && editingEmpresa && (
        <AgregarEmpresaModal
          open={openEditar}
          onClose={handleCloseEditar}
          onSubmit={handleSubmit}
          iEmpresa={editingEmpresa}
        />
      )}
      {openInfo && editingEmpresa && (
        <MostrarSucursalesModal
          open={openInfo}
          onClose={handleCloseInfo}
          iEmpresa={editingEmpresa}
        />
      )}
    </>
  );
}
