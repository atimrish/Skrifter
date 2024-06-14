import AdminLinks from "@pages/admin-page/helper/AdminLinks.tsx";
import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import useFeedbacks from "../../../hooks/useFeedbacks.ts";

const GetFeedbacksPage = () => {

    const [feedbacks] = useFeedbacks();

    console.log(feedbacks)

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <AdminLinks/>
                    <Heading
                        number={2}
                        text={'Обращения'}
                        className={'text-[24px] font-mono my-[40px]'}
                    />
                    <div>
                        {feedbacks.map(i => (
                            <div className="text-[20px] font-mono my-[20px] shadow-2xl p-[20px]">
                                <div className="font-bold">{new Date(Date.parse(i.CreatedAt)).toLocaleDateString()}</div>
                                <div className="mt-[10px] mb-[30px]">Текст проблемы:</div>
                                <div>{i.description}</div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </MainLayout>

        </>
    )
}

export default GetFeedbacksPage;