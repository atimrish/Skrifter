import {useNavigate} from "react-router-dom";

const UnauthorizedModal = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="font-mono my-[20px]">
                Для выполянения этого действия ниобходимо&nbsp;
                <span
                    className="text-blue"
                    onClick={() => navigate('/login')}
                >Авторизоваться</span>
            </div>
        </>
    )
}

export default UnauthorizedModal;