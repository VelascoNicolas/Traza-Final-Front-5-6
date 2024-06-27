import Sucursal from "./Sucursal";
import UsuarioEmpleado from "./UsuarioEmpleado";

class Empleado {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    rol: string = '';
    nombre: string = '';
    apellido: string = '';
    telefono: string = '';
    email: string = '';
    fechaNacimiento: string = '';
    usuarioEmpleado: UsuarioEmpleado = new UsuarioEmpleado;
    sucursal: Sucursal = new Sucursal;
}

export default Empleado;