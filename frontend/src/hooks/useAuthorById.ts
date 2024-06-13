import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type Author = {
    ID: number,
    surname: string,
    name: string,
    patronymic: string,
    year_of_birth: number,
    nickname: string,
    photo: string
}

const useAuthorById = (id: number) => {
    const [authors, setAuthors] = useState<Author|null>(null)

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: `/author/${id}`,
            })

            let json = await res.json()

            setAuthors(json)
        }
        fetchData()

        return
    }, [])
    return [authors, setAuthors]
}

export default useAuthorById;