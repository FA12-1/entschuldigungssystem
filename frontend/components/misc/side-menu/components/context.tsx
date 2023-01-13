import { Props } from "next/script";
import { createContext, FC, useEffect, useState } from "react";

type ContextProps = {};

export const SideMenuContext = createContext<ContextProps>(undefined!);

const SideMenuContextProvider: FC<Props> = ({ children }) => {
    return (
        <SideMenuContext.Provider value={{}}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContextProvider;
