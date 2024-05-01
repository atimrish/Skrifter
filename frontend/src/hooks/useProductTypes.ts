import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type ProductType = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    Name: string
}

const useProductTypes = () => {
    const [productType, setProductType] = useState<ProductType[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: "/product-type",
            })

            const json = await res.json()

            setProductType(json)
        }
        fetchData()

        return
    }, [])
    return [productType, setProductType]
}

export default useProductTypes;