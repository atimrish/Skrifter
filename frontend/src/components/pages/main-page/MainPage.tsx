import MainLayout from "@components/layouts/MainLayout.tsx";
import Image from "@components/ui/image/Image.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";

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
                            <div className="w-[100%] h-[100%] flex items-center justify-between">
                                <div>
                                    <div className="font-mono text-[56px] mb-[20px]">Лучшие новинки<br/>года</div>
                                    <div
                                        className="w-[170px] h-[50px] bg-black text-white font-mono leading-[50px] text-center"
                                    >Подробнее</div>
                                </div>
                                <div className="flex">

                                    <div className="w-[146px] bg-light-gray h-[190px] rounded-[10px]">
                                        <Image src={''}/>
                                    </div>

                                    <div className="w-[146px] bg-light-gray h-[190px] rounded-[10px]">
                                        <Image src={''}/>
                                    </div>

                                    <div className="w-[146px] bg-light-gray h-[190px] rounded-[10px]">
                                        <Image src={''}/>
                                    </div>

                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </section>
                <section>

                </section>
            </MainLayout>
        </>
    )
}