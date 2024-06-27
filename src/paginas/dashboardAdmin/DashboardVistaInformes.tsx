import MUITabs from "../../componentes/ui/dashboard/vistaInformes/MUITabs";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaInformes(){
    return(
        <DashboardSidebar>
            <h1>Informes</h1>
            <MUITabs/>
        </DashboardSidebar>
    )
}
export default DashboardVistaInformes;