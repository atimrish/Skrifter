import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";



const useAgeRating = () => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/author",
            })

            let json = await res.json()

            setAuthors(json)
        }
        fetchData()

        return
    }, [])
    return [authors, setAuthors]
}

export default useAgeRating;