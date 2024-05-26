import MainLayout from "@components/layouts/MainLayout.tsx";
import Image from "@components/ui/image/Image.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Product from "@components/common/product/Product.tsx";
import HorizontalSwipe from "@components/ui/horizontal-slide/HorizontalSwipe.tsx";

export default function MainPage() {
    return (
        <>
            <MainLayout>
                <section>
                    <div
                        className="w-[100%] h-[588px] relative"
                    >
                        <div className="absolute top-0 left-0 w-[100%] h-[100%] -z-10">
                            <Image src={'./src/assets/images/76087be57431639675763d26656c70a0.svg'}/>
                        </div>
                        <Wrapper>
                            <div className="w-[100%] h-[100%] flex items-center justify-between pt-[80px]">
                                <div>
                                    <div className="font-mono text-[56px] mb-[20px]">Лучшие новинки<br/>года</div>
                                    <div
                                        className="w-[170px] h-[50px] bg-black text-white font-mono leading-[50px] text-center"
                                    >Подробнее</div>
                                </div>
                                <div className="flex items-center">

                                    <div className="w-[202px] bg-light-gray h-[263px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/aaa.webp'}/>
                                    </div>

                                    <div className="w-[245px] bg-light-gray h-[319px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/first.jpg'}/>
                                    </div>

                                    <div className="w-[202px] bg-light-gray h-[263px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/sec.jpg'}/>
                                    </div>

                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </section>
                <section className="my-[40px]">
                    <Wrapper>
                        <div className={"flex justify-between items-center my-[40px]"}>
                            <Heading number={2} className={'font-mono text-[30px]'} text={'Популярное'}/>
                            <div>{'Смотреть все'} &nbsp; {'>>'}</div>
                        </div>
                        <HorizontalSwipe>
                            <div className="mr-[20px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>

                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>
                            <div className="mr-[10px]">
                                <Product
                                    title={'Тест'}
                                    authors={['Вава', 'ddd']}
                                    rating={9.2}
                                />
                            </div>

                        </HorizontalSwipe>
                    </Wrapper>
                </section>

                <section className="bg-[#EBD1AE] py-[50px]">
                    <Wrapper>
                        <div className="flex justify-between items-center">
                            <Heading number={2} className={'text-[36px] font-mono font-bold'} text={'Вам понравится'}/>
                            <div>Больше &nbsp; {'>>'}</div>
                        </div>
                        <div className="bg-white my-[20px] py-[20px]">
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                    </Wrapper>
                </section>

            </MainLayout>
        </>
    )
}