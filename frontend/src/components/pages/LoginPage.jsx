import MainLayout from "../layouts/MainLayout.jsx";
import Heading from "@components/ui/heading/Heading.jsx"
import Wrapper from "@components/helpers/wrapper/Wrapper.jsx";
import TextInput from "@components/ui/text-input/TextInput.jsx";

export default function LoginPage() {
    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        text="Вход"
                        number={1}
                        className="text-[32px] font-[FiraMono] text-center my-[50px]"
                    />

                    <TextInput/>
                </Wrapper>
            </MainLayout>
        </>
    )
}