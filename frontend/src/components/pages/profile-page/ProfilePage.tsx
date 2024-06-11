import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Image from "@components/ui/image/Image.tsx";
import {Link, useNavigate} from "react-router-dom";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import useUserInfo from "../../../hooks/useUserInfo.ts";
import UiButton from "@components/ui/button/UiButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const ProfilePage = () => {

    const [userData] = useUserInfo();

    const navigate = useNavigate();

    const logOut = async () => {
        const res = await MakeAuthRequest({
            method: "POST",
            action: "/logout"
        })

        if (res.message === "вы вышли") {
            navigate('/login')
        }

    }

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <div
                        className="w-[154px] h-[154px] bg-gray rounded-[10px] border-gray overflow-hidden mx-auto my-[40px]">
                        <Image src={userData.photo ? `/storage/${userData.photo}` : ''}/>
                    </div>

                    <div className="text-[24px] font-mono text-center">{'@' + userData.nickname}</div>

                    <div className="text-center my-[10px]">
                        <ActiveLink>
                            <Link to={'/profile/edit'}>настроить профиль</Link>
                        </ActiveLink>
                    </div>

                    <div className="text-center font-main text-[16px] my-[30px]">
                        {userData.description}
                    </div>

                    <UiButton
                        className={" bg-light-gray hover:text-white hover:bg-black transition-all duration-300 "}
                        onClick={logOut}
                    >Выйти</UiButton>

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default ProfilePage;