import {Children} from "react";

const Modal = (props: ModalProps) => {
    return (
        <>
            <div
                className="fixed top-[40px] z-50 w-[328px]"
                style={{
                    display: props.isOpen ? "block" : "none",
                    left: 'calc(50% - 164px)',
                }}
            >
                {Children.map(props.children, child => child)}
            </div>
        </>
    )
}

export default Modal