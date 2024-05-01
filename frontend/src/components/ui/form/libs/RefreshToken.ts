import config from '@config/config.ts'

const RefreshToken = async () => {
    try {

        const body = {
            refresh_token: localStorage.getItem('refresh_token'),
        }

        const response = await fetch(`${config.apiUrl}/refresh-token`, {
            method: 'POST',
            body: JSON.stringify(body)
        })

        const json = await response.json()
        localStorage.setItem('refresh_token', json.refresh_token)
    } catch (err) {
        console.error(err);
    }
}

export default RefreshToken
