type ActiveSelectProps = SelectProps & {
    selected: {
        value: any;
        text: string;
    };
    setSelected: (value: any) => void;
}