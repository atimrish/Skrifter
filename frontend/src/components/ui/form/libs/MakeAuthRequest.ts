///TODO: Реализовать функцию совершающую запрос к защищенному роуту,
///и при сгорании токена, обновить его и повторить запрос снова, иначе выйти из профиля

import config from '@config/config.ts'
import refreshToken from "@components/ui/form/libs/RefreshToken.ts";

const MakeAuthRequest = async (props: MakeRequestProps) => {

    let response = await fetch(config.apiUrl + props.action, {
        body: props.body,
        method: props.method,
        headers: props.headers,
    })

    if (response.status === 403) {
        await refreshToken()
        response = await fetch(config.apiUrl + props.action, {
            body: props.body,
            method: props.method,
            headers: props.headers,
        })
    }

    return await response.json()

}

export default MakeAuthRequest