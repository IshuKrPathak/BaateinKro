import { useEffect, useRef } from "react";
import "./App.css";
import { account } from "./config/appwriteConfig";
import { UserStore } from "./state/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppNavbar from "./components/AppNavbar";
import CreateCommunity from "./components/CreateCommunity";
import CommunityList from "./components/CommunityList";

function App() {
  const isRendered = useRef<boolean>(false);
  const userState = UserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRendered.current) {
      account
        .get()
        .then((res) => {
          userState.updateUser(res);
        })
        .catch(() => {
          userState.resetState();
          navigate("/Login");
          toast.error("Your session got expired . Please Login once again ", {
            theme: "colored",
          });
        });
      isRendered.current = true;
    }
  }, []);

  return (
    <>
      <AppNavbar />
      <div
        className="p-10
     h-screen
     "
      >
        <div className="flex justify-end">
          <CreateCommunity />
        </div>
        <CommunityList />
      </div>
    </>
  );
}

export default App;
