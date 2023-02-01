"use client";

import SideMenu from "@/components/misc/side-menu";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <body>
                <SideMenu>{children}</SideMenu>
            </body>
        </html>
    );
}
