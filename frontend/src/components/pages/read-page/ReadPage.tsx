import ReadLayout from "@components/layouts/read-layout/ReadLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import useProduct from "../../../hooks/useProduct.ts";
import {useParams} from "react-router";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import parse from 'html-react-parser';
import './style/read.css';

const ReadPage = () => {
    const {id} = useParams();
    const [product] = useProduct(+id)
    const [searchParams, setSearchParams] = useSearchParams({p: '1'});
    const [content, setContent] = useState<string | Element | Element[] | null>(null);
    const [page, setPage] = useState(+searchParams.get('p'));
    const navigate = useNavigate();

    const getPage = async () => {
        if (product) {
            const dir = product.ext.source.split("/")[2]
            const res = await fetch(`/storage/book-page?dir=${dir}&p=${page}`)
            const text = await res.text();
            const parsed = parse(text);

            if (Array.isArray(parsed)) {
                parsed.forEach(i => {
                    console.log(i)

                    if (i.type === "img") {
                        console.log(i.prototype)
                    }

                })
            }

            setContent(parsed)
        }
    }

    useEffect(() => {
        (async () => {await getPage()})()

        if (product) {
            const dir = product.ext.source.split("/")[2]
            const content = document.querySelector('#content')

            content.querySelectorAll('img').forEach(i => {
                i.setAttribute('src', `/storage/product/source/${dir}/pages/${i.getAttribute('src')}`);
            })
        }
    }, [page]);

    const body = document.body

    body.onclick = (e) => {
        const middle = body.clientWidth / 2

        if (e.clientX >  middle) {
            console.log('right')
            setPage(page + 1)
        } else {
            console.log('left')
            if (page <= 1) {
                return
            }
            setPage(page - 1)
        }

    }

    return (
        <>
            <ReadLayout
                title={product?.title}
                currentPage={page}
                backAction={() => navigate(`/product/${id}`)}
            >
                <Wrapper>
                    <div
                        className="mx-auto"
                        id="content"
                    >
                        {content}
                    </div>
                </Wrapper>
            </ReadLayout>
        </>
    )
}

export default ReadPage;