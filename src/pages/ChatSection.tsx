import React, { useState, useEffect, useRef } from "react";
import { Input, Spinner } from "@nextui-org/react";
import AppNavbar from "../components/AppNavbar";
import {
  CHAT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  client,
} from "../config/appwriteConfig";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UserStore } from "../state/userStore";
import { AppwriteException, ID, Models } from "appwrite";
import { chatStore } from "../state/chatStore";

export const ChatSection = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isFetched = useRef(false);
  // const session = UserStore((state) => state.userSession) as Models.Session;
  const user = UserStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;
  // const numbers = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  // ];
  const chatState = chatStore();
  useEffect(() => {
    if (!isFetched.current) {
      fetchMessages();

      // for realtime value
      client.subscribe(
        `databases.${DATABASE_ID}.collections.${CHAT_COLLECTION_ID}.documents`,
        (response) => {
          console.log("The realtime response is :", response);
          const payload = response.payload as Models.Document;

          // if its a new message
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            if (user.$id !== payload["user_id"]) {
              chatState.addChat(payload);
            }
          }
          else  if(response.events.includes(
            "databases.*.collections.*.documents.*.delete")){
              chatState.deleteChats(payload.$id)

          }
        }
      );
      isFetched.current = true;
    }
  }, []);

  //   to handle submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    databases
      .createDocument(DATABASE_ID, CHAT_COLLECTION_ID, ID.unique(), {
        message: message,
        user_id: user.$id,
        baateinKaroCollection_id: id,
        name: user.name,
      })
      .then((res) => {
        chatState.addChat(res);
        setMessage("");
      })
      .catch((err: AppwriteException) => {
        toast.error(err.message, { theme: "colored" });
      });
  };
  // fetching all messages
  const fetchMessages = () => {
    setLoading(true);
    databases
      .listDocuments(DATABASE_ID, CHAT_COLLECTION_ID)
      .then((res) => {
        setLoading(false);
        chatState.addChats(res.documents);
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  // deleting the message from database
  const deleteMsg = (id: string) => {
    databases
      .deleteDocument(DATABASE_ID, CHAT_COLLECTION_ID, id)
      .then(() => {
        chatState.deleteChats(id);
      })
      .catch((err: AppwriteException) => {
        toast.error(err.message, { theme: "colored" });
      });
  };
  return (
    <div>
      <AppNavbar />
      <div className="h-screen">
        <div className="text-center">
          {loading && <Spinner color="danger" />}
        </div>
        <div
          className="flex flex-col
            "
        >
          {/* displaying all messages  */}
          <div className="flex-1 p-4 mb-20">
            {chatState.chats.length > 0 &&
              chatState.chats.map((item) =>
                item["user_id"] == user.$id ? (
                  <div
                    className=" flex
             justify-end mb-2"
                    key={item.$id}
                  >
                    <div className="bg-orange-400 px-4 py-2 max-w-lg rounded-xl">
                      <h1 className="font-bold">{item["name"]}</h1>
                      <h1>{item["message"]}</h1>

                      <div className="flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2 text-red-500 cursor-pointer"
                          onClick={() => deleteMsg(item.$id)}
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className=" flex
             justify-start mb-2"
                    key={item.$id}
                  >
                    <div className="bg-green-400 px-4 py-2 max-w-lg rounded-xl">
                      <h1 className="Font-bold">{item["name"]}</h1>
                      <h1>{item["message"]}</h1>
                    </div>
                  </div>
                )
              )}
          </div>

          {/* input box */}
          <div
            className=" p-4 bottom-0 left-0 right-0 bg-white  "
            style={{ position: "fixed" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  label="Type your Text...."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
