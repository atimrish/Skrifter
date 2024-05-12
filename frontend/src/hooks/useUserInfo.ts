import {useEffect, useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const useUserInfo = () => {
    const [userData, setUserData] = useState({
        login: '',
        nickname: '',
        email: '',
        photo: '',
        description: '',
        year_of_birth: 0,
    })


    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeAuthRequest({
                method: "GET",
                action: "/users/me",
            })

            setUserData({
                login: res.login,
                nickname: res.nickname,
                email: res.email,
                photo: res.photo,
                description: res.description,
                year_of_birth: res.year_of_birth,
            })

        }
        fetchData()

        return
    }, [])
    return [userData, setUserData]
}

export default useUserInfo;