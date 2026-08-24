"use client";
import {useState} from "react";

export default function Contact(){
    const[inputs,setInputs] = useState({});
    const[message,setMessage] = useState("");
    const handleInput = (e) =>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value})); 
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("/api/enq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        const result = await response.json();
        setMessage(result.message);

        setTimeout(() => {
            setMessage("");
            setInputs({});
        }, 3000);
    }
    return(
    <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex items-center mb-4">
                <label htmlFor="name" className="w-1/4">Name:</label>
                <input type="text" value={inputs.name ?? ""} name="name" className="border rounded px-2 py-1 w-3/4" onChange={handleInput}/>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="email" className="w-1/4">Email:</label>
                <input type="email" value={inputs.email ?? ""} name="email" className="border rounded px-2 py-1 w-3/4" onChange={handleInput}/>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="message" className="w-1/4">Message:</label>
                <textarea id="message" name="message" onChange={handleInput} className="border rounded px-2 py-1 w-3/4" rows="4" value={inputs.message ?? ""}></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
        {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                {message}
            </div>
        )}
    </main>
    )
}