import ActiveModal from "@components/ui/modal/ActiveModal.tsx";

const InfoModal = (props: InfoModalProps) => {

    console.log(props.product)

    let ageRating: string
    switch (props.product.age_rating_id) {
        case 1:
            ageRating = '0+'
            break
        case 2:
            ageRating = '6+'
            break
        case 3:
            ageRating = '12+'
            break
        case 4:
            ageRating = '16+'
            break
        case 5:
            ageRating = '18+'
            break
        default:
            ageRating = 'неизвестно'
    }

    let productType: string
    switch (props.product.product_type_id) {
        case 1:
            productType = 'Книга'
            break
        case 2:
            productType = 'Комикс'
            break
        case 3:
            productType = 'Манга'
            break
        case 4:
            productType = 'Аудиокнига'
            break
        case 5:
            productType = 'Подкаст'
            break
        default:
            productType = 'неизвестно'
    }

    const info: Array<{title: string, value:string}> = []
    info.push({
        title: 'Название',
        value: props.product.title,
    })
    info.push({
        title: 'Год выпуска',
        value: props.product.year_of_issue,
    })
    info.push({
        title: 'Возрастной рейтинг',
        value: ageRating
    })
    info.push({
        title: 'Тип',
        value: productType
    })
    info.push({
        title: 'Жанры',
        value: props.product.genres.map(i => i.name).join(', ')
    })

    switch (props.product.product_type_id) {
        case 1:
            info.push({
                title: 'Примерное время чтения',
                value: props.product.ext.read_time
            })
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        default:
            break
    }



    return (
        <>
            <ActiveModal
                setIsOpen={props.setIsOpen}
                isOpen={props.isOpen}
            >
                <div className="text-center font-mono my-[20px]">Информация о продукте</div>

                <table>
                    <tbody>
                    {
                        info.map((i) =>
                            <tr className="font-mono">
                                <td className="font-bold py-[10px]">{i.title}:</td>
                                <td className="text-right py-[10px]">{i.value}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>

            </ActiveModal>
        </>
    )
}

export default InfoModal;