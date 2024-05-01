import config from '@config/config.ts'

const MakeRequest = async (props: MakeRequestProps) :Promise<any> => {
    try {
        const res =  await fetch(config.apiUrl + props.action, {
            body: props.body,
            method: props.method,
            headers: props.headers
        })
        return res;
    } catch (error) {
        console.error(error)
    }
}

export default MakeRequest