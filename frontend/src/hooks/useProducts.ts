import {useEffect, useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";

type Product = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    title: string
    description: string,
    cover_photo: string,
    year_of_issue: number,
    age_rating_id: number
    authors: Array<string>
    ext: Object
}

const useProducts = (type = 'all') => {
    const [product, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: `/product?type=${type}`,
            })

            let json = await res.json()
            console.log(json)
            setProducts(json)
        }
        fetchData()

        return
    }, [])
    return [product, setProducts]
}

export default useProducts;