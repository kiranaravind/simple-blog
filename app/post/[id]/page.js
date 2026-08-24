"use client";
import { use, useState, useEffect } from "react";
export default function Post({params}) {
    const { id } = use(params);
    const[post,setPost] = useState(null);
    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/post/" + id);
            const postData = await response.json();
            setPost(postData[0]);}

        fetchPost();
    }, [id]);

    
    

    
    if (!post) return <p className="p-6">Loading...</p>;

    return (<main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-500">Published on {post.date}</p>
        <img width={300} height={200} src={post.image} alt="Post Image" className="my-4"/>
        <p>{post.description}</p>
    </main>);
} 