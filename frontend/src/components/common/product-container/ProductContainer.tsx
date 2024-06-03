import Product from "@components/common/product/Product.tsx";
import {useNavigate} from "react-router-dom";

const ProductContainer = ({p}: {p: Array<ProductProps> }) => {
    const navigate = useNavigate();

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
                                rating={4.3}
                                authors={['asd']}
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