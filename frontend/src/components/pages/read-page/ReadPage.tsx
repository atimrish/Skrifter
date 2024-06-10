import ReadLayout from "@components/layouts/read-layout/ReadLayout.tsx";
import useProduct from "../../../hooks/useProduct.ts";
import {useParams} from "react-router";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './style/read.css';
import Image from "@components/ui/image/Image.tsx";

const ReadPage = () => {
    const {id} = useParams();
    const [product] = useProduct(+id)
    const [searchParams, setSearchParams] = useSearchParams({p: '1'});
    const [content, setContent] = useState<string | null>(null);
    const [page, setPage] = useState(+searchParams.get('p'));
    const navigate = useNavigate();

    const getPage = async () => {
        if (product) {

            const digits = product.ext.count_pages.length

            const formatPage = (() => {
                const diff = digits - page.toString().length
                let res = ''
                for (let i = 0; i < diff; i++) {
                    res += '0'
                }
                res += page.toString()
                return res
            })()

            const dir = product.ext.source.split("/")[2]
            const path = `/storage/product/source/${dir}/pages/p-${formatPage}.jpg`
            setContent(path)
        }
    }


    useEffect(() => {
        (async () => {
            await getPage()
        })()
    }, []);

    useEffect(() => {
        if (product) {
            (async () => {
                const dir = product.ext.source.split("/")[2]
                const path = `/storage/product/source/${dir}/pages/`
                const res = await fetch('/storage/get-pages-count', {
                    method: "POST",
                    headers: {
                        contentType: "application/json"
                    },
                    body: JSON.stringify({path: path})
                })
                console.log(await res.text())
            })()
        }
    }, []);

    useEffect(() => {
        (async () => {
            await getPage()
        })()
    }, [page]);

    const body = document.body

    body.onclick = (e) => {
        const middle = body.clientWidth / 2

        if (product) {
            if (e.clientX > middle) {
                console.log('right')
                if (page < product.ext.count_pages) {
                    setPage(page + 1)
                }
            } else {
                console.log('left')
                if (page <= 1) {
                    return
                }
                setPage(page - 1)
            }
        }

    }

    return (
        <>
            <ReadLayout
                title={product?.title}
                currentPage={page}
                backAction={() => navigate(`/product/${id}`)}
                countPages={product?.ext.count_pages}
            >
                <div
                    className="w-[100%] min-h-[100%] xl:w-[60%] mx-auto"
                    id="content"
                >
                    <Image
                        src={content}
                    />
                </div>
            </ReadLayout>
        </>
    )
}

export default ReadPage;