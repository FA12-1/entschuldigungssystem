import MenuItem from "./types/menu-item";

const drawerWidth = 300;
const appBarTextFallback = "TGBBZ1 Entschuldigungssystem";

const menuItems: MenuItem[] = [
    {
        id: 1000,
        name: "Schüler",
        children: [
            {
                id: 1100,
                name: "Übersicht Anträge",
            },
        ],
    },
    {
        id: 2000,
        name: "Lehrer",
        children: [
            {
                id: 2100,
                name: "Klasse 1",
                children: [
                    {
                        id: 2110,
                        name: "Eingereicht",
                    },
                    {
                        id: 2110,
                        name: "Bestätigt",
                    },
                ],
            },
        ],
    },
];

export { drawerWidth, appBarTextFallback, menuItems };
