import Categoria from "./Categoria";
import Domicilio from "./Domicilio";
import Empresa from "./Empresa";
import Promocion from "./Promocion";

class Sucursal {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    nombre: string = '';
    esCasaMatriz: boolean = false;
    domicilio: Domicilio = new Domicilio;
    empresa: Empresa = new Empresa;
    promociones: Promocion[] = [];
    categorias: Categoria[] = [];
}

export default Sucursal