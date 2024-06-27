import Provincia from "./Provincia";

class Localidad {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    nombre: string = '';
    provincia: Provincia = new Provincia;
}
export default Localidad;