import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Tabs from "@components/ui/tabs/Tabs.tsx";
import useFavoriteStatuses from "../../../hooks/useFavoriteStatuses.ts";
import FavoriteItem from "@components/common/favorite-item/FavoriteItem.tsx";

const FavoritePage = () => {

    const [statuses] = useFavoriteStatuses()
    const mappedStatuses = statuses.map(i => i.Name)

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        className={"text-[24px] font-mono my-[40px] text-center "}
                        text={'Избранное'}
                    />
                    <Tabs
                        titles={mappedStatuses}
                    />

                    <div
                        className="my-[20px]"
                    >
                        <FavoriteItem
                            photo={''}
                            title={'Тест'}
                            authors={['Ntfdsf', 'Rew']}
                        />
                    </div>

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default FavoritePage;