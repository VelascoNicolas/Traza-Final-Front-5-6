import ArticuloInsumo from "../entidades/ArticuloInsumo";

export function controlNivelStockInsumo(insumo:ArticuloInsumo):number{
    if(insumo.stockActual<=(insumo.stockMaximo/2) && insumo.stockActual>=(insumo.stockMaximo/3)){
        //Alerta Baja con Stock Medio
        return 1;
    }else if(insumo.stockActual<=(insumo.stockMaximo/3) && insumo.stockActual>=(insumo.stockMaximo/4)){
        //Alerta Media con Stock a 1/3
        return 2;
    }else if(insumo.stockActual<=(insumo.stockMaximo/4)){
        //Alerta Maxima con stock a 1/4
        return 3;
    }
    return 0;
}