import {
  Sidebar as SidebarPro,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from '@mui/icons-material/BarChart';
import { useTheme } from "@emotion/react";
import { Receipt, Straighten } from "@mui/icons-material";
import { localData } from "../../servicios/FuncionesAPI";

interface SidebarProps {
  collapsed: boolean;
  toggled: boolean;
  setBroken: any;
}

function Sidebar({ collapsed, setBroken, toggled }: SidebarProps) {
  const basil = useTheme();

  const userRoles:string[] = localData.getRol('userRoles');
  return (
    <SidebarPro
      style={{
        height: "100vh",
        top: "auto",
        //@ts-ignore
        backgroundColor: basil.palette.secondary.dark,
        borderRight: "1px solid black",
      }}
      breakPoint="md"
      onBreakPoint={setBroken}
      collapsed={collapsed}
      toggled={toggled}
    >
      <Menu>
      {userRoles.includes("ADMIN") && (
          <MenuItem component={<a href="/dashboard"></a>} icon={<CorporateFareIcon />}>
            Empresas
          </MenuItem>
        )}
        {userRoles.includes("ADMIN") && (
          <MenuItem component={<a href="/dashboard/informes"></a>} icon={<BarChartIcon />}>Informes</MenuItem>
        )}
        {(userRoles.includes("ADMIN") || userRoles.includes("COCINERO") )  && (
          <SubMenu label="Artículos" icon={<FastfoodIcon />}>
            {userRoles.includes("ADMIN") && (
              <MenuItem component={<a href="/dashboard/categorias"></a>} icon={<CategoryIcon />}>Categorias</MenuItem>
            )}

            {userRoles.includes("ADMIN") && (
               <MenuItem component={<a href="/dashboard/insumos"></a>} icon={<ShoppingBasketIcon />}>Insumos</MenuItem>
            )}
            <MenuItem component={<a href="/dashboard/productos"></a>} icon={<MenuBookIcon />}>Manufacturados</MenuItem>
            {userRoles.includes("ADMIN") && (
               <MenuItem component={<a href="/dashboard/uDeMedida"></a>} icon={<Straighten />}>U. de medida</MenuItem>
            )}
        </SubMenu>
        )}
        {userRoles.includes("ADMIN") && (
          <MenuItem component={<a href="/dashboard/empleados"></a>} icon={<PeopleIcon />}>Empleados</MenuItem>
        )}
        {userRoles.includes("ADMIN") && (
          <MenuItem component={<a href="/dashboard/promociones"></a>} icon={<AttachMoneyIcon />}>Promociones</MenuItem>
        )}
        <MenuItem component={<a href="/dashboard/pedidos"></a>} icon={<Receipt />}>Pedidos</MenuItem>
      </Menu>
    </SidebarPro>
  );
}
export default Sidebar;
