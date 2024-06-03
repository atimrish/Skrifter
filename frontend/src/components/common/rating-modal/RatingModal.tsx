import Heading from "@components/ui/heading/Heading.tsx";
import Rating from "@components/icons/rating/Rating.tsx";
import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import {useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const RatingModal = (props: RatingModalProps) => {

    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <div
                className="w-[32px] h-[32px]"
                onClick={() => onClick(i)}
            >
                <Rating/>
            </div>
        )
    }

     const [value, setValue] = useState<number>(0)

    const valueBlock = (
        <div className="mt-[20px] font-mono">
            Ваша оценка: {value}
        </div>
    )

    const onClick = async (i: number) => {
        setValue(i)
        await MakeAuthRequest({
            action: `/product/${props.product_id}/rating`,
            method: "POST",
            body: JSON.stringify({
                "value": i,
            }),
            headers: {
                contentType: "application/json"
            }
        })
    }

    return (
        <>
            <ActiveModal
                setIsOpen={props.setIsOpen}
                isOpen={props.isOpen}
            >
                <div className="py-[10px]">
                    <Heading
                        number={2}
                        className={'text-center font-mono text-[24px] my-[30px] '}
                        text={'Выберите оценку'}
                    />

                    <div className="flex w-[100%] justify-between">
                        {stars}
                    </div>

                    {Boolean(value) && valueBlock}

                </div>
            </ActiveModal>
        </>
    )
}

export default RatingModal;