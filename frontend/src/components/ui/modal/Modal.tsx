import {Children} from "react";

const Modal = (props: ModalProps) => {
    return (
        <>
            <div
                className="fixed top-[100px] z-50 w-[328px] left-[calc(50%-164px)]
                 xl:w-[600px] xl:left-[calc(50%-300px)]
                 transition-all ease-in-out duration-600"
                style={{
                    display: props.isOpen ? "block" : "none",
                    top: props.isOpen ? '40px' : '100px',
                    opacity: props.isOpen ? 1 : 0,
                }}
            >
                {Children.map(props.children, child => child)}
            </div>
        </>
    )
}

export default Modal