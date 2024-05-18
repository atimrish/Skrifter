type NotifyProps = {
    title: string;
    description: string;
    icon?: React.ReactNode;
    onClose?: () => void
    temporary?: boolean;
}