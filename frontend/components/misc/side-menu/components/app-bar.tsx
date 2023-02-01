import { Toolbar, IconButton, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { appBarTextFallback, drawerWidth } from "../config";
import MenuIcon from "@mui/icons-material/Menu";

interface StyledAppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<StyledAppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: 1500,
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface AppBarProps {
    text?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const AppBar: FC<AppBarProps> = ({ text, open, setOpen }) => {
    return (
        <StyledAppBar>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(!open)}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {text || appBarTextFallback}
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
};

export default AppBar;
