import {
    Collapse,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import MenuItem from "../../types/menu-item";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuItems } from "../../config";

// Might have to be rewritten later
function renderMenuItem(item: MenuItem) {
    const [open, setOpen] = useState(false);

    if (!item.children)
        return (
            <ListItem button key={item.id}>
                {!item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.name} />
            </ListItem>
        );

    return (
        <>
            <ListItem button key={item.id} onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    {!item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemIcon sx={{ ml: 9 }}>
                    <ExpandMoreIcon />
                </ListItemIcon>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.children.map((item) => renderMenuItem(item))}
                </List>
            </Collapse>
            <Divider />
        </>
    );
}

const MenuList: FC = () => {
    return (
        <>
            <List>{menuItems.map((item) => renderMenuItem(item))}</List>
        </>
    );
};

export default MenuList;
