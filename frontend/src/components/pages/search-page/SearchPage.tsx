import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import ActiveSearchInput from "@components/ui/search-input/ActiveSearchInput.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import ProductContainer from "@components/common/product-container/ProductContainer.tsx";

const SearchPage = () => {

    console.log('test')
    const [products] = useProducts()

    console.log(products)

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <div className="my-[20px]">
                        <ActiveSearchInput/>
                    </div>
                    <div className="text-[20px] font-mono flex items-center justify-between p-[10px] font-bold bg-light-gray rounded-[10px]">
                        <span>Фильтры</span>
                        <span>...</span>
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
                            return {
                                id: i.ID,
                                title: i.title,
                                authors: ['test'],
                                rating: 4.5,
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