import { FunctionComponent, useState } from "react";

import { RiSpaceShipFill } from "react-icons/ri";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import AdbIcon from "@mui/icons-material/Adb";

const Header: FunctionComponent = () => {
  const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null);

  const closeMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setNavAnchor(null);
  };

  const openMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setNavAnchor(event?.currentTarget);
  };

  const pages = ["characters", "about"];

  return (
    <AppBar position="fixed" sx={{ background: "#141414f2" }}>
      <Container>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RM Universe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openMenuHandler}
              color="inherit"
            >
              {navAnchor ? <AiOutlineClose /> : <AiOutlineMenu />}
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(navAnchor)}
              onClose={closeMenuHandler}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={closeMenuHandler}>
                  <Typography
                    component="a"
                    href={`/${page}`}
                    textTransform="capitalize"
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RM Universe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return (
                <Button
                  key={page}
                  onClick={closeMenuHandler}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <a href={`/${page}`}>{page}</a>
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
