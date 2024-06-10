type TabsProps = {
    titles?: Array<{
        id: number,
        title: string,
        selected: boolean,
    }>;
    setSelected: (i: any) => void,
}