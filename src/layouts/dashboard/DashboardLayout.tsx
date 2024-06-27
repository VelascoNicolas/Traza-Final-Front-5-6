import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface DashboardSidebarTypes {
  children: ReactNode;
}
function DashboardLayout({ children }: DashboardSidebarTypes) {
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={{ width: 80, margin: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            El Buen Sabor Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </>
  );
}
export default DashboardLayout;
