import React from 'react';
import Post from "../components/Post.jsx";
import http from "../services/http.service.js";
import {useQuery} from "@tanstack/react-query";

const Home = () => {
    const {data} = useQuery(
        ['getAllPosts'],
        () => http.get('/posts').then(res => res.data),
    );

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    {data?.posts.map(post => <Post key={post?.id} post={post}/>)}
                </div>
            </div>
        </section>
    );
};

export default Home;