import Header from "../common/header/Header.jsx";
import {Children} from "react";

export default function MainLayout({children}) {
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