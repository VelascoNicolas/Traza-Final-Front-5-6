import Articulo from "./Articulo";
import Sucursal from "./Sucursal";

class Categoria {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    denominacion: string = '';
    articulos: Articulo[] = [];
    subCategorias: Categoria[] = [];
    sucursales: Sucursal[] = [];
}

export default Categoria;