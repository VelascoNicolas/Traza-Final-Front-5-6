import { IconButton, Box, AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

// LogOutButton Component
export const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
      <Link to="#" className="btn btn-outline-light" onClick={()  =>  {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.removeItem("userRoles");
      }}
        >
          Cerrar sesión&nbsp;
          <Logout />
      </Link>
  );
};

interface AppHeaderTypes {
  setCollapse: (item: boolean) => void;
  setToggle: (item: boolean) => void;
  broken: boolean;
  collapsed: boolean;
  toggled: boolean;
}

function AppHeader({ broken, setCollapse, setToggle, collapsed, toggled }: AppHeaderTypes) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {broken ? (<IconButton
            size="large"
            edge="start"
            color='inherit'
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { setToggle(!toggled) }}
          >
            <MenuIcon />
          </IconButton>) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => { setCollapse(!collapsed) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box component="img" src="/imgs/Icono.svg" sx={{ width: 70, margin: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            El Buen Sabor Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <LogOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AppHeader;
