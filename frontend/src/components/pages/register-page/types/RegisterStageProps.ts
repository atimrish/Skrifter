type RegisterStageProps = {
    formState: {
        login: string,
        nickname: string,
        email: string,
        year_of_birth: string,
        password: string,
        password_confirmation: string,
        checked: boolean
    },
    setFormField: Function,
    stage: number,
    setStage: Function,
}