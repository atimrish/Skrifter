import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import ActiveSearchInput from "@components/ui/search-input/ActiveSearchInput.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import ProductContainer from "@components/common/product-container/ProductContainer.tsx";
import {useSearchParams} from "react-router-dom";

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({type: 'all'});
    const [products] = useProducts(searchParams.get('type'))

    console.log(products)

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <div className="my-[20px] md:hidden">
                        <ActiveSearchInput/>
                    </div>
                    <div>
                        <Heading
                            text={'Результаты поиска'}
                            number={2}
                            className={"text-[24px] font-mono my-[40px] text-center"}
                        />
                    </div>

                    <ProductContainer
                        p={products.map(i => {
                            const rating = i.ratings.reduce((acc, cur) => acc + cur.value, 0) / i.ratings.length

                            return {
                                id: i.ID,
                                title: i.title,
                                authors: i.authors.map(i => `${i.surname} ${i.name} ${i.patronymic}`),
                                rating: isNaN(rating) ? 0 : rating,
                                cover_photo: '/storage/product/cover_photos/' + i.cover_photo,
                            }
                        })}
                    />
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default SearchPage;