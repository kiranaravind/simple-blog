"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect,useRef } from "react";

export default function Home() {
  const [posts,setPosts] = useState([]);
  const searchRef = useRef("");
  const [search,setSearch] = useState(false);
  useEffect(()=>{
    fetch('/api/posts')
    .then((res)=>res.json())
    .then(res => setPosts(res))
  }, [])




  const searchP = () => {
    setSearch(true);
    const query = searchRef.current.value;
    fetch('/api/posts?q=' + query)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false));
  };

  return (

    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here you can find the latest updates and news.</p>
    </main>
    <div className="flex justify-end px-4">
        <input onKeyDown={(e) => e.key === "Enter" && searchP()}
          
            type="text" 
            className="px-4 py-2 border border-gray-300 rounded-md" 
            placeholder="Search..." 
            ref={searchRef}
        />
        <button disabled={search} onClick={searchP} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search ? "Searching..." : "Search"}</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post)=>(<Link key={post._id} href={`/post/${post._id}`}><div className="border border-gray-200 p-4">
          <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image"/>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.sd}</p>
        </div></Link>))}
        {posts.length === 0 && <p className="text-gray-600">No posts found.</p>}
    </div>
    </>
  );
}
