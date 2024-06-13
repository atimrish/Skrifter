import Product from "@components/common/product/Product.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";

const ProductContainer = ({p}: {p: Array<ProductProps> }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams({});

    return (
        <>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                {
                    p.map(i =>
                        <div
                            onClick={() => navigate(`/product/${i.id}`)}
                        >
                            <Product
                                key={i.id}
                                title={i.title}
                                rating={i.rating}
                                authors={i.authors}
                                cover_photo={i.cover_photo}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ProductContainer;