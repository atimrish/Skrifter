import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";

const FavoritePage = () => {
    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        className={"text-[24px] font-mono my-[40px] text-center "}
                        text={'Избранное'}
                    />

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default FavoritePage;