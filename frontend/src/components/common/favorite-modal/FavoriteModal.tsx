import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import useFavoriteStatuses from "../../../hooks/useFavoriteStatuses.ts";
import UiButton from "@components/ui/button/UiButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";
import {useState} from "react";

const FavoriteModal = (props: FavoriteModalProps) => {

    const [status] = useFavoriteStatuses()

    const [notify, setNotify] = useState<boolean>(false)

    const addToFavorite = async (id: number) => {
        await MakeAuthRequest({
            method: "POST",
            headers: {
                contentType: "application/json",
            },
            action: `/product/${props.product_id}/favorite`,
            body: JSON.stringify({
                status_id: id
            })
        })

        setNotify(true)

        setTimeout(() => { setNotify(false) }, 5000)

    }

    return (
        <>
            <ActiveModal
                setIsOpen={props.setIsOpen}
                isOpen={props.isOpen}
            >
                {
                    status.map(i =>
                        <div className="my-[10px]">
                            <UiButton
                                className={" bg-light-gray hover:bg-black hover:text-white transition-all duration-300 "}
                                onClick={async () => {
                                    await addToFavorite(i.ID)
                                }}
                            >{i.Name}</UiButton>
                        </div>
                    )
                }
            </ActiveModal>
            {notify && <SuccessNotify title={'Успешно'} description={'Продукт добавлен в избранное'}/>}
        </>
    )
}

export default FavoriteModal;