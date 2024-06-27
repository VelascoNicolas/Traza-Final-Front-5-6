import ArticuloInsumo from "./ArticuloInsumo";
import ArticuloManufacturado from "./ArticuloManufacturado";
import Promocion from "./Promocion";

class DetallePedido {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    cantidad: number = 0;
    subTotal: number = 0;
    articulo: number | null = null;
    promocion: number | null = null;
    articuloAux: ArticuloManufacturado | ArticuloInsumo | null = null; //Trascient
    promocionAux: Promocion | null = null; //Trascient
}

export default DetallePedido;