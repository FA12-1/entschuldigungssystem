import { FC, ReactNode } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Container, Drawer, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLocalStorage from "../../../hooks/use-local-storage";
import AppBar from "./components/app-bar";
import SideMenuContextProvider from "./components/context";
import Main from "./components/main";
import MenuList from "./components/menu-list";
import { drawerWidth } from "./config";

type SideMenuProps = {
    children: ReactNode;
};

const SideMenu: FC<SideMenuProps> = ({ children }) => {
    const [open, setOpen] = useLocalStorage("drawer_open", true);

    return (
        <SideMenuContextProvider>
            <Box sx={{ display: "flex" }}>
                <AppBar open={open} setOpen={setOpen} />
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <DrawerHeader>
                        <IconButton onClick={() => setOpen(!open)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <MenuList />
                </Drawer>
                <Main>
                    <DrawerHeader />
                    <Container sx={{ maxWidth: "sm" }}>{children}</Container>
                </Main>
            </Box>
        </SideMenuContextProvider>
    );
};

export default SideMenu;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));
