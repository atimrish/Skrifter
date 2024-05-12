import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

const useCommentsByproductId = (id: number) => {
    const [comments, setComments] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: `/product/${id}/comment`,
            })

            let json = await res.json()

            setComments(json)
        }
        fetchData()

        return
    }, [])
    return [comments, setComments]
}

export default useCommentsByproductId;