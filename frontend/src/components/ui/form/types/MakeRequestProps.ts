type MakeRequestProps = {
    action: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: BodyInit,
    headers?: HeadersInit
}