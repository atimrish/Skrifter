import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Tabs from "@components/ui/tabs/Tabs.tsx";
import useFavoriteStatuses from "../../../hooks/useFavoriteStatuses.ts";
import FavoriteItem from "@components/common/favorite-item/FavoriteItem.tsx";
import {useEffect, useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import {useNavigate} from "react-router-dom";

const FavoritePage = () => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState(1)
    const [statuses] = useFavoriteStatuses()
    const mappedStatuses = statuses.map(i => {
        return {
            id: i.ID,
            title: i.Name,
            selected: i.ID === selected,
        }
    })
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        (async () => {
           const res = await MakeAuthRequest({
               action: '/favorite',
               method: "GET"
           })

            if (res.message === "не авторизован") {
                return
            }

            setFavorites(res)
        })()
    }, []);

    const renderedItems = favorites.filter((i:unknown) => i.favorite_status_id === selected).map((i: unknown) => (
        <div
            onClick={() => navigate(`/product/${i.product.ID}`)}
            key={i.ID}
        >
            <FavoriteItem
                photo={`/storage/product/cover_photos/${i.product.cover_photo}`}
                title={i.product.title}
                authors={i.product.authors.map(j => `${j.surname} ${j.name}`)}
            />
        </div>
    ))

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
                        setSelected={setSelected}
                    />

                    <div
                        className="my-[20px]"
                    >
                        {renderedItems.length > 0 ? renderedItems : <div className="text-center font-mono mt-[40px]">ничего нет</div>}
                    </div>

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default FavoritePage;