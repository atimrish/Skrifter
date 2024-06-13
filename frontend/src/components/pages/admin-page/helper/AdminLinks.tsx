import {useNavigate} from "react-router-dom";
import UiButton from "@components/ui/button/UiButton.tsx";

const AdminLinks = () => {

    const navigate = useNavigate();

    const links = [
        {
            name: 'Продукт',
            link: '/admin',
        },
        {
            name: 'Жанр',
            link: '/admin/genre',
        },
        {
            name: 'Автор',
            link: '/admin/author',
        }
    ]

    return (
        <>
            <div className="flex text-[20px] font-mono mt-[40px]">
                {links.map(i =>
                    <UiButton
                        onClick={() => navigate(i.link)}
                        className="mr-[20px] hover:bg-black hover:text-white transition-all duration-300"
                    >{i.name}</UiButton>)}
            </div>
        </>
    )
}

export default AdminLinks;