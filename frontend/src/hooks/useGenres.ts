import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type Genre = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    Name: string
}

const useAgeRating = () => {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/genres",
            })

            let json = await res.json()

            setGenres(json)
        }
        fetchData()

        return
    }, [])
    return [genres, setGenres]
}

export default useAgeRating;