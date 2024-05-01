type FormProps = {
    onSubmit: () => Promise<any>,
    action: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
    headers?: HeadersInit
}