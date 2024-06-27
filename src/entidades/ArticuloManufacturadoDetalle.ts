import ArticuloInsumo from "./ArticuloInsumo";

class ArticuloManufacturadoDetalle {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    cantidad: number = 0;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo;
}

export default ArticuloManufacturadoDetalle