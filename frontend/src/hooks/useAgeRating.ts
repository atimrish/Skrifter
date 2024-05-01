import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type AgeRating = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    Name: string
}

const useAgeRating = () => {
    const [ageRating, setAgeRating] = useState<AgeRating[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/age-rating",
            })

            const json = await res.json()

            setAgeRating(json)
        }
        fetchData()

        return
    }, [])
    return [ageRating, setAgeRating]
}

export default useAgeRating;