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
    authors: Array<Author>
}

const useAgeRating = (id: number) => {
    const [product, setProducts] = useState<Product>()

    useEffect(() => {

        const fetchData = async () => {
            const res = await MakeRequest({
                method: "GET",
                action: `/product/${id}`,
            })

            let json = await res.json()

            setProducts(json)
        }
        fetchData()

        return
    }, [])
    return [product, setProducts]
}

export default useAgeRating;