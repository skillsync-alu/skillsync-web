import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { TbArrowLeft, TbSend2, TbStar } from "react-icons/tb";
import { BsSendDashFill, BsSendFill } from "react-icons/bs";
import { RiSendPlane2Fill, RiSendPlaneFill } from "react-icons/ri";

type Message = {
  sender: "tutor" | "student";
  content: string;
  timestamp: string;
};

type Chat = {
  id: string;
  tutor_avatar: string;
  tutor_username: string;
  messages: Message[];
};

function MyMatches() {
  const [openedTutorID, setOpenedTutorID] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  };

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      tutor_avatar:
        "https://images.generated.photos/hTWhfPc0WQUwABdQHBpgtOCTXeZ-cKtJYUQ6cQy_Bbc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk4NTA5LmpwZw.jpg",
      tutor_username: "James Wilson",
      messages: [
        {
          sender: "student",
          content:
            "Hi James, are you available today? I just want to talk about houses and water systems",
          timestamp: "2025-07-15T10:00:00Z",
        },
        {
          sender: "tutor",
          content: "Yes, I'm free after 3 PM",
          timestamp: "2025-07-15T10:05:00Z",
        },
      ],
    },
  ]);

  const currentChat = chats.find((chat) => chat.id === openedTutorID);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenedTutorID(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">My Matches</h1>
          <div className="w-full flex bg-bodyBg ring-1 ring-lines rounded-xl h-[calc(100svh-140px)] overflow-hidden relative">
            {/* Sidebar */}
            <div
              className={`w-[300px] max-md:w-full h-full min-h-full py-3 flex-col gap-1 overflow-y-auto transition-all duration-300
              ${openedTutorID === null ? "flex px-3" : "flex max-lg:hidden md:px-3"}`}
            >
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setOpenedTutorID(chat.id)}
                  className={`text-sm flex items-center justify-start gap-4 cursor-pointer w-full p-2 rounded-xl relative
                  ${openedTutorID === chat.id ? "bg-cardBg" : "hover:bg-cardBg"}
              `}
                >
                  <div className="size-12 aspect-square rounded-full overflow-hidden">
                    <img
                      src={chat.tutor_avatar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-start flex-col">
                    <p className="text-base break-all line-clamp-1">
                      {chat.tutor_username}
                    </p>
                    <p className="text-sm text-textWeak">
                      @{chat.tutor_username.toLowerCase().replace(" ", "_")}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat section */}
            <div
              className={`flex-1 border-l border-lines h-full relative flex flex-col
              ${openedTutorID === null ? "flex max-md:hidden" : "flex"}`}
            >
              {currentChat ? (
                <div className="w-full h-full bg-cardBgWeak flex flex-col">
                  {/* Back button on mobile */}
                  <div className="lg:hidden flex items-center justify-start px-3 py-2">
                    <button
                      onClick={() => setOpenedTutorID(null)}
                      className="text-sm flex items-center gap-1 py-2 text-main underline"
                    >
                      <TbArrowLeft className="text-xl mt-0.5" /> Back
                    </button>
                  </div>

                  {/* header card */}
                  <div className="w-full bg-bodyBg flex items-center justify-between px-2 py-1 border-b border-lines">
                    <button className="flex items-center hover:bg-cardBg rounded-xl gap-3 px-2 py-1 ">
                      <div className="size-9 rounded-full overflow-hidden">
                        <img
                          src={currentChat.tutor_avatar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm">{currentChat.tutor_username}</p>
                    </button>
                  </div>

                  {/* chats body */}
                  <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col gap-3">
                    {currentChat.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`mb-2 py-2 px-3 rounded-xl w-fit max-md:w-full max-w-[70%] max-md:max-w-[90%] flex items-end justify-start max-sm:flex-col max-sm:items-start gap-3 ${
                          msg.sender === "student"
                            ? "bg-mainWeak2 dark:bg-[#286f9e] self-end"
                            : "bg-lines dark: self-start"
                        }`}
                      >
                        <p className="text-sm flex-1">{msg.content}</p>
                        <p className="text-xs text-textWeak float-end leading-[10px] whitespace-nowrap max-sm:self-end">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* chat input */}
                  <div className="w-full min-h-[50px] flex items-end justify-between p-3 gap-3">
                    <textarea
                      ref={textareaRef}
                      onInput={handleInput}
                      placeholder="Type a message"
                      className="bg-bodyBg shadow-md ring-1 ring-lines flex-1 dark:bg-lines resize-none h-[44px] w-full placeholder:truncate max-h-[100px] px-5 py-3 rounded-2xl text-sm outline-none overflow-y-auto"
                      rows={1}
                      name="message"
                    />
                    <button className="size-[44px] flex items-center justify-center rounded-full transition-all active:scale-95 bg-main text-white">
                      <RiSendPlaneFill className="text-2xl mt-0.5 mr-0.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center bg-cardBgWeak justify-center h-full text-textWeak text-sm">
                  Select a tutor to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMatches;
