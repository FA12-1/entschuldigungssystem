"use client";

import {
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
import useLocalStorage from "../hooks/useLocalStorage";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useLocalStorage("drawer_open", true);

    return (
        <html>
            <head />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <body>
                    <Drawer variant="persistent" anchor="left" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={() => setOpen(!open)}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
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
                    {children}
                </body>
            </LocalizationProvider>
        </html>
    );
}

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));
