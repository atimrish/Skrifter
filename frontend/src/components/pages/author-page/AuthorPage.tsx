import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import {useParams} from "react-router";
import useAuthorById from "../../../hooks/useAuthorById.ts";
import Image from "@components/ui/image/Image.tsx";

const AuthorPage = () => {

    const {id} = useParams();

    if (!id) {
        return 404;
    }
    const [author] = useAuthorById(+id)
    if (!author) {
        return 404;
    }

    console.log(author)

    return (
        <>
            <MainLayout>
                <Wrapper>

                    <div className="mt-[40px] w-[400px] h-[400px]">
                        <Image src={`/storage/${author.photo}`}/>
                    </div>

                    <Heading
                        number={2}
                        text={`${author.surname} ${author.name} ${author.patronymic}`}
                        className={"text-[24px] font-mono my-[40px]"}
                    />

                    <div>

                    </div>

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default AuthorPage;