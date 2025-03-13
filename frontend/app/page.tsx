"use client";
import { useState } from "react";
import ChatBox from "./component/chat_box";
export default function Home() {

  const[inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  return (
    <div className="justify-center items-center flex flex-col">
      <h1 className="p-2.5  text-8xl"> 🧠AM I OVERTHINKING?</h1>
      <ChatBox/>
      <input className="bg-gray-500 border-4 border-amber-500 rounded-lg" type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
      <p>{inputValue}</p>
    </div>
  );
}
