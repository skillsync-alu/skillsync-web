import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { TbArrowLeft } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";
// Firebase imports
import { auth, db } from "../config/firebase";
import { signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  type GetMatchersInput,
  GET_MATCHES,
  type GetMatchesResponse,
  type GetMatchesInput,
} from "../api/queries/match";
import {
  GET_FIREBASE_CUSTOM_TOKEN,
  type GetFirebaseTokenResponse,
} from "../api/mutations/user";
import { userMatchesListState } from "../resources/match";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { getFullName } from "../utilities/names";
import { UserType } from "../interfaces/user";

type Message = {
  sender: string;
  content: string;
  timestamp: string;
};

type Chat = {
  id: string; // matchId
  avatar: string;
  username: string;
  messages: Message[];
};

function MyMatches() {
  const [user] = useRecoilState(userState);

  const [openedTutorID, setOpenedTutorID] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [firebaseReady, setFirebaseReady] = useState(false);

  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const [sending, setSending] = useState(false);

  const [messageInput, setMessageInput] = useState("");

  const [matches, setMatches] = useRecoilState(userMatchesListState);

  const [chats, setChats] = useState<Chat[]>([]);

  // Fetch matches
  const [getMatches, getMatchesResult] = useLazyQuery<
    GetMatchesResponse,
    GetMatchesInput
  >(GET_MATCHES, {
    fetchPolicy: "no-cache",
  });

  // Fetch Firebase custom token
  const [getFirebaseToken] = useMutation<GetFirebaseTokenResponse>(
    GET_FIREBASE_CUSTOM_TOKEN
  );

  const handleGetMatches = async (filter: GetMatchersInput["filter"] = {}) => {
    try {
      filter.take = 10;

      const response = await getMatches({ variables: { filter } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getMatches) {
        return;
      }

      setMatches(response.data.getMatches);

      setChats(
        response.data.getMatches.list.map(match => {
          const sender =
            user.type === UserType.Tutor ? match.matchee : match.matcher;

          return {
            id: match.id,
            avatar: sender.avatar || "",
            username: getFullName(sender) || "",
            messages: [], // Will be filled by Firestore listener
          };
        })
      );
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // Fetch Firebase custom token from backend
  const fetchFirebaseToken = async () => {
    try {
      const response = await getFirebaseToken();

      if (response.errors) {
        handleResponseErrors(response);
        return null;
      }

      if (!response.data?.getFirebaseCustomToken) {
        return null;
      }

      return response.data?.getFirebaseCustomToken;
    } catch (error) {
      handleErrorMessage(error);

      return null;
    }
  };

  const ensureFirebaseAuth = async () => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        setFirebaseReady(true);
      } else {
        try {
          const token = await fetchFirebaseToken();
          if (token) {
            await signInWithCustomToken(auth, token);
            setFirebaseReady(true);
          } else {
            setFirebaseError("No Firebase token returned");
          }
        } catch (err: any) {
          setFirebaseError("Failed to authenticate with Firebase");
        }
      }
    });
  };

  // Send message to Firestore
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !openedTutorID || !firebaseReady) {
      return;
    }

    setSending(true);

    try {
      const chatId = openedTutorID;

      const messagesRef = collection(db, "chats", chatId, "messages");

      await addDoc(messagesRef, {
        sender: user.id,
        timestamp: new Date(),
        content: messageInput.trim(),
      });

      setMessageInput("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }
    } catch (err) {
      setFirebaseError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const currentChat = useMemo(() => {
    return chats.find(chat => chat.id === openedTutorID);
  }, [openedTutorID, chats]);

  // Helper to get sender info for a message
  const getSenderInfo = (msg: Message) => {
    if (msg.sender === user.id) {
      return { name: getFullName(user), avatar: user.avatar };
    }
    // Find the match for this chat
    const match = matches.list.find(m => m.id === openedTutorID);
    if (!match) return { name: "", avatar: "" };
    // Determine the other participant
    const other = match.matcher.id === user.id ? match.matchee : match.matcher;
    return { name: getFullName(other), avatar: other.avatar };
  };

  useEffect(() => {
    handleGetMatches();

    ensureFirebaseAuth();
  }, []);

  // Listen to Firestore for real-time chat messages for the opened chat
  useEffect(() => {
    if (!firebaseReady) return;

    if (!openedTutorID) return;

    const chatId = openedTutorID;

    const messagesRef = collection(db, "chats", chatId, "messages");

    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const messages: Message[] = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          sender: data.sender,
          content: data.content,
          timestamp:
            data.timestamp?.toDate?.() instanceof Date
              ? data.timestamp.toDate().toISOString()
              : new Date().toISOString(),
        };
      });

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatId ? { ...chat, messages } : chat
        )
      );
    });

    return () => unsubscribe();
  }, [firebaseReady, openedTutorID, matches.list]);

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
              {getMatchesResult.loading ? (
                <div className="w-full flex items-center justify-center py-10 text-textWeak text-sm">
                  Loading matches...
                </div>
              ) : chats.length === 0 ? (
                <div className="w-full flex items-center justify-center py-10 text-textWeak text-sm">
                  No matches found.
                </div>
              ) : (
                chats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setOpenedTutorID(chat.id)}
                    className={`text-sm flex items-center justify-start gap-4 cursor-pointer w-full p-2 rounded-xl relative
                  ${openedTutorID === chat.id ? "bg-cardBg" : "hover:bg-cardBg"}
              `}
                  >
                    <div className="size-12 aspect-square rounded-full overflow-hidden">
                      <img
                        src={chat.avatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start flex-col">
                      <p className="text-base break-all line-clamp-1">
                        {chat.username}
                      </p>
                      <p className="text-sm text-textWeak">
                        @{chat.username.toLowerCase().replace(" ", "_")}
                      </p>
                    </div>
                  </button>
                ))
              )}
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
                          src={currentChat.avatar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm">{currentChat.username}</p>
                    </button>
                  </div>
                  {/* chats body */}
                  <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col gap-3">
                    {currentChat &&
                      currentChat.messages.map((msg: Message, idx: number) => {
                        const senderInfo = getSenderInfo(msg);
                        return (
                          <div
                            key={idx}
                            className={`mb-2 py-2 px-3 rounded-xl w-fit max-md:w-full max-w-[70%] max-md:max-w-[90%] flex items-end justify-start max-sm:flex-col max-sm:items-start gap-3 ${
                              msg.sender === user.id
                                ? "bg-mainWeak2 dark:bg-[#286f9e] self-end"
                                : "bg-lines self-start"
                            }`}
                          >
                            {/* Optionally show avatar for received messages */}
                            {msg.sender !== user.id && senderInfo.avatar && (
                              <img
                                src={senderInfo.avatar}
                                alt={senderInfo.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                            )}
                            <div>
                              <p className="text-sm flex-1">{msg.content}</p>
                              <p className="text-xs text-textWeak float-end leading-[10px] whitespace-nowrap max-sm:self-end">
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
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
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      disabled={!firebaseReady || sending}
                    />
                    <button
                      className="size-[44px] flex items-center justify-center rounded-full transition-all active:scale-95 bg-main text-white"
                      onClick={handleSendMessage}
                      disabled={
                        !firebaseReady || sending || !messageInput.trim()
                      }
                    >
                      <RiSendPlaneFill className="text-2xl mt-0.5 mr-0.5" />
                    </button>
                  </div>
                  {firebaseError && (
                    <div className="text-red-500 text-xs px-3 pb-2">
                      {firebaseError}
                    </div>
                  )}
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
