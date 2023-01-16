"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SideMenu from "@/components/misc/side-menu";
import React from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <body>
                    <SideMenu>{children}</SideMenu>
                </body>
            </LocalizationProvider>
        </html>
    );
}
