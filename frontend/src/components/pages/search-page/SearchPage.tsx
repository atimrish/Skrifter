import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import ActiveSearchInput from "@components/ui/search-input/ActiveSearchInput.tsx";
import Heading from "@components/ui/heading/Heading.tsx";

const SearchPage = () => {
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
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default SearchPage;