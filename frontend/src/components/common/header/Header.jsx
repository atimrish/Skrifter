import {Link} from "react-router-dom";
import Logo from "../../ui/logo/Logo.jsx";
import Burger from "../../ui/burger/Burger.jsx";
import Wrapper from "../../helpers/wrapper/Wrapper.jsx";

export default function Header() {
    return (
        <>
            <Wrapper>
                <header>
                    <div className="flex items-center justify-between">
                        <div id="logo">
                            <Link to={'/'}>
                                <Logo/>
                            </Link>
                        </div>

                        <div>
                            <Burger/>
                        </div>
                    </div>
                </header>
            </Wrapper>
        </>
    )
}