import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

const useFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/feedback",
            })

            let json = await res.json()

            setFeedbacks(json)
        }
        fetchData()

        return
    }, [])
    return [feedbacks, setFeedbacks]
}

export default useFeedbacks;