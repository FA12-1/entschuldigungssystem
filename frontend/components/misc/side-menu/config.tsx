import MenuItem from "./types/menu-item";

const drawerWidth = 240;
const appBarTextFallback = "TGBBZ1 Entschuldigungssystem";

const menuItems: MenuItem[] = [
    {
        id: 1,
        name: "Schüler",
        children: [
            {
                id: 2,
                name: "Übersicht Anträge",
            },
        ],
    },
];

export { drawerWidth, appBarTextFallback, menuItems };
