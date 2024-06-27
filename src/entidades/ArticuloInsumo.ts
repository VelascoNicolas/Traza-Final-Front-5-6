import Articulo from "./Articulo";

class ArticuloInsumo extends Articulo {
    id:number=0;
    precioCompra: number=0;
    stockActual:number=0;
    stockMaximo:number=0;
    stockMinimo:number=0;
    eliminado: boolean = false;
    esParaElaborar:boolean=false;
}
export default ArticuloInsumo;