import { Box, Container, CssBaseline, useTheme } from "@mui/material";
import AppHeader from "../../componentes/dashboard/AppHeader";
import Sidebar from "../../componentes/dashboard/Sidebar";
import { ReactNode, useState } from "react";

interface DashboardSidebarTypes {
  children: ReactNode;
}
function DashboardSidebar({ children }: DashboardSidebarTypes) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const basilTheme = useTheme();
  return (
    <>
      <CssBaseline />
      <AppHeader
        collapsed={collapsed}
        setCollapse={setCollapsed}
        broken={broken}
        setToggle={setToggled}
        toggled={toggled}
      />
      <Box
        sx={{
          display: "flex",
          height: "calc(100%-64px)",
          backgroundColor: basilTheme.palette.secondary.light,
        }}
      >
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          setBroken={setBroken}
        />
        <Box component="main">
          <Container>{children}</Container>
        </Box>
      </Box>
    </>
  );
}
export default DashboardSidebar;
