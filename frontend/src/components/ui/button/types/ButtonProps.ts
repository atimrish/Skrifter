type ButtonProps = {
    type?: 'submit' | 'button' | 'reset';
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}