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
                login: res.Login,
                nickname: res.Nickname,
                email: res.Email,
                photo: res.Photo,
                description: res.Description,
                year_of_birth: res.YearOfBirth,
            })

        }
        fetchData()

        return
    }, [])
    return [userData, setUserData]
}

export default useUserInfo;