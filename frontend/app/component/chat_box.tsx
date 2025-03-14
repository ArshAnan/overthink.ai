"use client";
import { useEffect, useState,useRef } from "react";
export default function ChatBox()
{
    const[inputValue, setInputValue] = useState("");
    const [messages,setMessages] =useState([
            { id: 1, sender: "User", message: "Hey, how are you?" },
            { id: 2, sender: "Bot", message: "I'm good, thanks for asking! How about you?" },
            { id: 3, sender: "User", message: "I'm doing great, just working on my project." },
            { id: 4, sender: "Bot", message: "That sounds awesome! What kind of project?" },
            { id: 5, sender: "User", message: "I'm building a chat app with FastAPI and Tailwind CSS. you are not the person who can do this bruh. Youre not him" },
            { id: 6, sender: "Bot", message: "That sounds really cool! I hope it turns out great!" },
          ]);
    const [response, setResponse] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
      }, [messages]);
    
    const addMessage = (message:string,sender:'User'|'Bot')=>{
        console.log(message);
        const newMessage = {
            id: Date.now(),
            sender: sender,
            message: message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    const addAIResponse = (message:string)=>{
        addMessage(message,'Bot');
    }
    const handleInput = async () =>{
        addMessage(inputValue,'User');
        setInputValue("");
        setIsThinking(true);
        // setTimeout(() => {
        //     addAIResponse("I'm a bot");
        //     setIsThinking(false);
        //   }, 2000); // 10000 ms = 10 seconds

        try{
            const response =  await fetch("http://localhost:8000/analyze",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify({thought:inputValue}),
            });
            const data = await response.json();
            const message = data.classification
            console.log(data);
            addAIResponse(message);
        }
        catch (error) {
            console.error("Error fetching AI response:", error);
          } finally {
            setIsThinking(false);
          }
        
        
    }

    return(
        <>
        <div ref={messagesEndRef}
            
            className="chat-box flex h-125 w-125 bg-gray-800 overflow-y-auto [scrollbar-width:none] p-4 flex-col border-1 rounded-xl m-3">
            {messages.map((message) => (
                
                <div key={message.id} className={`message-box  mt-5 mb-5 p-3 ${message.sender === "User" ? "bg-emerald-300 text-right border rounded-lg " : " text-left"}`}>
                    <p className="message">{message.message}</p>
                </div>
            ))}
            {isThinking && <div className="typing-indicator">AI is typing...</div>}
        </div>
        <div className="input-box flex flex-row justify-center items-center">
        <input className="bg-gray-500 border-4 border-amber-500 rounded-lg" type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
        <button className="bg-gray-500 border-4 border-amber-500 rounded-lg" onClick={() => handleInput()}>Submit</button>
        
        </div>
        <p>{inputValue}</p> 
        </>
    );
}