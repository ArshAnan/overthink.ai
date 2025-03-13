import ChatBox from "./component/chat_box";
export default function Home() {

  return (
    <div className="justify-center items-center flex flex-col">
      <h1 className="p-2.5  text-8xl"> 🧠AM I OVERTHINKING?</h1>
      <ChatBox/>
      
    </div>
  );
}
