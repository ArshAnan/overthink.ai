export default function ChatBox()
{
    const messages = [
        { id: 1, sender: "User", message: "Hey, how are you?" },
        { id: 2, sender: "Bot", message: "I'm good, thanks for asking! How about you?" },
        { id: 3, sender: "User", message: "I'm doing great, just working on my project." },
        { id: 4, sender: "Bot", message: "That sounds awesome! What kind of project?" },
        { id: 5, sender: "User", message: "I'm building a chat app with FastAPI and Tailwind CSS. you are not the person who can do this bruh. Youre not him" },
        { id: 6, sender: "Bot", message: "That sounds really cool! I hope it turns out great!" },
        { id: 7, sender: "User", message: "Thanks! I'm excited about it." },
        { id: 8, sender: "Bot", message: "That sounds really cool! I hope it turns out great!" },
        { id: 9, sender: "User", message: "Thanks! I'm excited about it." },
      ];
      

    return(
        <div className="chat-box flex h-125 w-125 bg-gray-800 overflow-y-auto [scrollbar-width:none] p-4 flex-col border-1 rounded-xl m-3">
            {messages.map((message) => (
                
                <div key={message.id} className={`message-box  mt-5 mb-5 p-3 ${message.sender === "User" ? "bg-emerald-300 text-right border rounded-lg " : " text-left"}`}>
                    <p className="message">{message.message}</p>
                </div>
            ))}
        </div>
    );
}