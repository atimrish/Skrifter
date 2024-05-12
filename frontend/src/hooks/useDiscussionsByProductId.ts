import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

const useDiscussionsByProductId = (id: number) => {
    const [discussion, setDiscussion] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: `/product/${id}/discussion`,
            })

            let json = await res.json()

            setDiscussion(json)
        }
        fetchData()

        return
    }, [])
    return [discussion, setDiscussion]
}

export default useDiscussionsByProductId;