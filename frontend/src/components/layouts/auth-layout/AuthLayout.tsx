import Header from "@components/common/header/Header.tsx";
import {Children} from "react";

const AuthLayout = (props: AuthLayoutProps) => {
    return (
        <>
            <div>
                <div className="xl:hidden">
                    <Header/>
                </div>
                <main>
                    {Children.map(props.children, child => child)}
                </main>
            </div>
        </>
    )
}

export default AuthLayout