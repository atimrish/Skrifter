import {Link, useNavigate} from "react-router-dom";
import Logo from "@components/icons/logo/Logo.tsx";
import Burger from "@components/icons/burger/Burger.tsx";
import Wrapper from "../../helpers/wrapper/Wrapper.tsx";
import SwipeMenu from "@components/common/swipe-menu/SwipeMenu.tsx";
import {useState} from "react";
import ActiveSearchInput from "@components/ui/search-input/ActiveSearchInput.tsx";
import UiButton from "@components/ui/button/UiButton.tsx";
import useIsAdmin from "../../../hooks/useIsAdmin.ts";

export default function Header() {

    const [styles, setStyles] = useState({
        left: '-100vw',
    });

    const [isAdmin] = useIsAdmin();
    const navigate = useNavigate();

    const onClose = () => {
        setStyles({
            left: '-100vw',
        })
    }

    return (
        <>
            <Wrapper>
                <header>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between xl:flex-row-reverse w-[100%] xl:w-[10%]">
                            <div id="logo">
                                <Link to={'/'}>
                                    <Logo/>
                                </Link>
                            </div>

                            <div
                                onClick={() => setStyles({left: '0'})}
                            >
                                <Burger/>
                            </div>
                        </div>
                        <div className="hidden xl:block">
                            <ActiveSearchInput/>
                        </div>
                        <div className="hidden xl:flex">
                            <div
                                style={{
                                    display:  isAdmin ? "block" : "none",
                                }}
                            >
                                <UiButton
                                    className={" w-[96px] mr-[20px] "}
                                    onClick={() => navigate('/admin')}
                                >админ</UiButton>
                            </div>

                            <UiButton
                                className={" w-[96px] "}
                            >войти</UiButton>
                        </div>
                    </div>
                </header>
            </Wrapper>
            <SwipeMenu
                styles={styles}
                onClose={onClose}
            />
        </>
    )
}