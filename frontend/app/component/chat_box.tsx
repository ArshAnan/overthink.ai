"use client";
import { useEffect, useState,useRef } from "react";
import { ArrowRight } from "lucide-react";
export default function ChatBox()
{
    const[inputValue, setInputValue] = useState("");
    const [messages,setMessages] =useState([
            { id: 1, sender: "Bot", message: "Hey, how are you? How can I help today?" },

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
            const message = data.response
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
        < div className='Chat-container flex flex-col justify-center items-end'>
        <div ref={messagesEndRef}
            
            className="chat-box flex h-100   w-125 bg-gray-800 overflow-y-auto [scrollbar-width:none] p-4 flex-col  rounded-xl m-3">
            {messages.map((message) => (
                
                <div key={message.id} className={`message-box  mt-5 mb-5 p-3 ${message.sender === "User" ? "bg-emerald-300 border rounded-lg w-1/2 break-words self-end " : " text-left self-start"}`}>
                    <p className="message">{message.message}</p>
                </div>
            ))}
            {isThinking && <div className="typing-indicator">AI is typing...</div>}
        </div>
        <div className="input-box flex flex-row justify-center items-center">
        <textarea rows={2} placeholder="Enter your thoughts" className="bg-gray-500  rounded-lg w-120 p-4"  value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
        <button className="bg-gray-500 rounded-lg ml-1 hover:bg-gray-700" onClick={() => handleInput()}><ArrowRight className ='w-6 h-6'/> </button>
        
        </div>
        </div>
    );
}