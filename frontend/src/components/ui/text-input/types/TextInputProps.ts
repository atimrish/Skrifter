type TextInputProps = {
    value?: string | number;
    type?: 'text' | 'password' | 'number' | 'email';
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocusout?: React.FocusEventHandler<HTMLInputElement>;
    styles?: React.CSSProperties;
}