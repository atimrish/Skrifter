import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";

export default function MainPage() {
    return (
        <>
            <MainLayout>
                <div
                    className="w-[100%] h-[432px] bg-[#D6A795] rounded-b-[80px] shadow-2xl"
                >
                    <Wrapper>
                        <div className="text-[48px] font-mono font-bold text-[#fff] pt-[70px] ">Какой-то текст</div>
                    </Wrapper>
                </div>
            </MainLayout>
        </>
    )
}