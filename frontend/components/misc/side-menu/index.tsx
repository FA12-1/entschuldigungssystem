import { FC, ReactNode } from "react";

import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import useLocalStorage from "../../../hooks/use-local-storage";
import AppBar from "./components/app-bar";
import Main from "./components/main";
import { drawerWidth } from "./config";

type SideMenuProps = {
    children: ReactNode;
};

const SideMenu: FC<SideMenuProps> = ({ children }) => {
    const [open, setOpen] = useLocalStorage("drawer_open", true);

    return (
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
                // TODO: List Items
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            <Main>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
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
