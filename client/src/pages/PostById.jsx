import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import http from "../services/http.service.js";
import {formateDate} from "../lib/date.js";

const PostById = () => {
    const {id} = useParams();
    const {data, isLoading} = useQuery(
        ['post', id],
        () => http.get(`/posts/${id}`).then(res => res.data),
    )


    return (
        <div>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article
                        className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img className="mr-4 w-16 h-16 rounded-full"
                                         src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                         alt="Jese Leos"/>
                                    <div>
                                        <a href="#" rel="author"
                                           className="text-xl font-bold text-gray-900 dark:text-white">{data?.post?.user?.name}</a>
                                        <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                            <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                                                {formateDate(data?.post?.createdAt)}
                                            </time>
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                {data?.post?.title}
                            </h1>
                        </header>
                        <div dangerouslySetInnerHTML={{__html: data?.post?.content}}/>
                    </article>
                </div>
            </main>
        </div>

    );
};

export default PostById;