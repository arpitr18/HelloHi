import useChatStore from "../store/useChatStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen relative bg-neutral-100 dark:bg-neutral-900">
     
      <div className="flex items-center justify-center pt-20 px-4 relative z-10">
        <div className="bg-base-100 dark:bg-neutral-800 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex gap-2 h-full rounded-lg overflow-hidden">
            <SideBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
