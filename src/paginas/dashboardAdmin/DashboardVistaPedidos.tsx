import GrillaPedidos from "../../componentes/ui/dashboard/vistaPedidos/GrillaPedidos";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

export default function DashboardVistaPedidos(){
    return(
        <DashboardSidebar>
            <GrillaPedidos />
        </DashboardSidebar>
    )
}