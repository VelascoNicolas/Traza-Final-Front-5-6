import Cliente from "./Cliente";
import DetallePedido from "./DetallePedido";
import Domicilio from "./Domicilio";
import Empleado from "./Empleado";
import Factura from "./Factura";
import Sucursal from "./Sucursal";

class Pedido {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    horaEstimadaFinalizacion: string = '';
    total: number = 0;
    totalCosto: number = 0;
    estado: string = '';
    tipoEnvio: string = '';
    formaPago: string = '';
    fechaPedido: string = '';
    domicilio: Domicilio = new Domicilio;
    sucursal: Sucursal = new Sucursal;
    factura: Factura | null = new Factura;
    cliente: Cliente = new Cliente;
    detallePedidos: DetallePedido[] = [];
    empleado: Empleado = new Empleado;
}

export default Pedido