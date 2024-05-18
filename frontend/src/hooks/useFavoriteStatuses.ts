import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type FavoriteStatus = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    Name: string
}

const useAgeRating = () => {
    const [statuses, setStatuses] = useState<FavoriteStatus[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/favorite-statuses",
            })

            let json = await res.json()

            setStatuses(json)
        }
        fetchData()

        return
    }, [])
    return [statuses, setStatuses]
}

export default useAgeRating;