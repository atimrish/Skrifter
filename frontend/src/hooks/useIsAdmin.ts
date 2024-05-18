import {useEffect, useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeAuthRequest({
                method: "POST",
                action: "/check-admin",
            })

            console.log(res)
            setIsAdmin(res.result)
        }
        fetchData()

        return
    }, [])
    return [isAdmin, setIsAdmin]
}

export default useIsAdmin;