import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";

const AuthorPage = () => {
    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        text={'Автор'}
                        className={"text-[24px] font-mono my-[40px]"}
                    />
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default AuthorPage;