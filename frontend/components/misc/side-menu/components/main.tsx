import { styled } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import { drawerWidth } from "../config";

const StyledMain = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface MainProps {
    children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
    return <StyledMain>{children}</StyledMain>;
};

export default Main;
