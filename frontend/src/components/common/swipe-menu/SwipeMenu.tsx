import {Link} from "react-router-dom";
import GoBack from "@components/icons/go-back/GoBack.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import ActiveSearchInput from "@components/ui/search-input/ActiveSearchInput.tsx";
import Feedback from "@components/icons/feedback/Feedback.tsx";
import useUserInfo from "../../../hooks/useUserInfo.ts";
import Image from "@components/ui/image/Image.tsx";

const SwipeMenu = (props: SwipeMenuProps) => {

    const [userInfo] = useUserInfo()

    return (
        <>
            <div
                className="transition-all ease-in duration-100 w-[100vw] h-[100cqh] bg-white z-40 fixed top-0 rounded-tr-[30px]"
                style={props.styles}
            >
                <div className="border-b">
                    <Wrapper>
                        <div className="flex items-center justify-between h-[50px]">
                            <div>

                                {
                                    (userInfo.nickname == undefined) ?
                                        (
                                            <Link
                                                to={'/login'}
                                                className="font-mono font-medium text-[24px]"
                                            >Войти</Link>
                                        ) :
                                        (
                                            <div className="w-[52px] h-[52px] rounded-full bg-gray overflow-hidden">
                                                <Link
                                                    to={'/profile/my'}
                                                    className="w-[100%] h-[100%]"
                                                >
                                                    <Image src={`/storage/${userInfo.photo}`}/>
                                                </Link>
                                            </div>
                                        )
                                }

                            </div>
                            <div onClick={props.onClose}>
                                <GoBack/>
                            </div>
                        </div>
                    </Wrapper>
                </div>

                <div>
                    <Wrapper>
                        <div className="my-[20px]">
                            <ActiveSearchInput/>
                        </div>

                        <div>
                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Главная</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Книги</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Комиксы</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Аудиокниги</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Подкасты</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Избранное</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/'} className="text-[24px] font-mono font-bold">Подписки</Link>
                            </div>

                            <div className="my-[15px]">
                                <Link to={'/search'} className="text-[24px] font-mono font-bold">Поиск</Link>
                            </div>
                        </div>

                    </Wrapper>
                </div>

                <div className="absolute bottom-0 left-0 w-[100%] h-[72px] border-t">
                    <Wrapper>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <Feedback/>
                            </div>
                            <div className="font-mono text-[24px]">Обратная связь</div>
                        </div>
                    </Wrapper>
                </div>

            </div>
        </>
    )
}

export default SwipeMenu;
