import { ReactNode } from "react";

type MenuItem = {
    id: number;
    name: string;
    icon?: ReactNode;
    children?: MenuItem[];
};

export default MenuItem;
