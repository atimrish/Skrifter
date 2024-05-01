import Header from "../common/header/Header.tsx";
import React, {Children} from "react";

export default function MainLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            <div>
                <Header/>
                <main>
                    {Children.map(children, child => child)}
                </main>
            </div>
        </>
    )
}