import ExtendLayout from "@components/layouts/extend-layout/ExtendLayout.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Image from "@components/ui/image/Image.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveTextarea from "@components/ui/textarea/ActiveTextarea.tsx";
import Form from "@components/ui/form/Form.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import ActiveCheckbox from "@components/ui/checkbox/ActiveCheckbox.tsx";
import FileInput from "@components/ui/file-input/FileInput.tsx";
import {useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import {useNavigate} from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo.ts";

const ProfileEditPage = () => {

    const [profileImage, setProfileImage] = useState<any>(null);

    const navigate = useNavigate();

    const [userData, setUserData] = useUserInfo()
    const onFileChange = async (e: Event) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            file.previewBase64 = reader.result
            setProfileImage(reader.result)
        }

        const formData = new FormData();
        formData.set("photo", file)

        await MakeAuthRequest({
            method: "PUT",
            action: "/users/update-photo",
            body: formData,
        })
    }

    const deletePhoto = async () => {
        await MakeAuthRequest({
            method: "DELETE",
            action: "/users/delete-photo",
        })
        setProfileImage('')
    }

    let timeout = null

    const updateDescription = async (e) => {
        clearTimeout(timeout)
        setUserData({
            ...userData,
            description: e.target.value,
        })


        const req = async () => {
            await MakeAuthRequest({
                method: "PUT",
                action: "/users/update-description",
                body: JSON.stringify({
                    description: userData.description,
                }),
                headers: {
                    contentType: "application/json"
                }
            })
        }


        timeout = setTimeout(req, 2000)
    }




    return (
        <>
            <ExtendLayout
                title={'Настройки'}
                backAction={() => {
                    navigate('/profile/my')
                }}
            >

                <Wrapper>
                    <Heading
                        number={2}
                        className={"text-[24px] font-mono mt-[40px] mb-[20px] "}
                        text={'Фото профиля'}
                    />

                    <div className="flex justify-between items-start">
                        <div className="w-[154px] h-[154px] bg-gray rounded-[10px] border-gray overflow-hidden">
                            <Image src={
                                profileImage ? profileImage : `/storage/${userData.photo}`
                            }/>
                        </div>

                        <div className="font-mono text-right">
                            <div className="mb-[20px]">
                                <label htmlFor="update-photo" className="cursor-pointer">
                                    изменить
                                    <FileInput
                                        onChange={onFileChange}
                                        id={'update-photo'}
                                        className={"hidden"}
                                        value={''}
                                    />
                                </label>
                            </div>
                            <div onClick={deletePhoto}>удалить</div>
                        </div>

                    </div>


                    <Heading
                        number={2}
                        className={"text-[24px] font-mono mt-[40px] "}
                        text={'Никнейм'}
                    />

                    <ActiveTextInput
                        value={userData.nickname}
                        onChange={() => {}}
                    />

                    <Heading
                        number={2}
                        className={"text-[24px] font-mono mt-[40px] mb-[20px] "}
                        text={'Описание'}
                    />

                    <ActiveTextarea
                        value={userData.description}
                        onChange={updateDescription}
                    />

                    <Heading
                        number={2}
                        className={"text-[24px] font-mono mt-[40px] mb-[20px] "}
                        text={'Изменение пароля'}
                    />

                    <Form
                        onSubmit={async () => {
                        }}
                        action={''}
                        method={"POST"}
                    >
                        <ActiveTextInput
                            placeholder={'Старый пароль'}
                        />

                        <ActiveTextInput
                            placeholder={'Новый пароль'}
                        />

                        <ActiveTextInput
                            placeholder={'Подтвердите пароль'}
                        />

                        <FormButton
                            className="h-[48px] bg-gray py-[5px] "
                        >Изменить</FormButton>

                    </Form>

                    <Heading
                        number={2}
                        className={"text-[24px] font-mono mt-[40px] mb-[20px] text-center "}
                        text={'Приватность'}
                    />

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Отображать статистику по избранным</div>
                        <ActiveCheckbox/>
                    </div>

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Отображать мои комментарии</div>
                        <ActiveCheckbox/>
                    </div>

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Отображать мои обсуждения</div>
                        <ActiveCheckbox/>
                    </div>

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Показывать мои подписки</div>
                        <ActiveCheckbox/>
                    </div>

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Показывать год регистрации аккаунта</div>
                        <ActiveCheckbox/>
                    </div>

                    <div className="flex justify-between items-center mb-[30px] ">
                        <div className="w-[80%] text-[20px] font-mono ">Показывать описание</div>
                        <ActiveCheckbox/>
                    </div>


                </Wrapper>

            </ExtendLayout>
        </>
    )
}

export default ProfileEditPage;
