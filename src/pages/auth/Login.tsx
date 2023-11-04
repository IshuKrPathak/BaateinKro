import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../../config/appwriteConfig";
import { AppwriteException } from "appwrite";
import { toast } from "react-toastify";
import { UserStore } from "../../state/userStore";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const userState = UserStore();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const promis = account.createEmailSession(
      authState.email,
      authState.password
    );
    promis
      .then((res) => {
        setLoading(false);
        userState.updateUserSession(res);
        toast.success("Logged in sucessfully", { theme: "colored" });
        navigate("/");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);

        toast.error(err.message, { theme: "colored" });
      });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[500px] p-2 rounded-md shadow">
        <h1
          className="text-3xl font-bold text-red-400 text-center
        "
        >
          BaateinKaro
        </h1>
        <h1
          className="text-2xl font-bold
        text-gray-800 mb-4"
        >
          Login
        </h1>
        <p>Welcome Back to BaateinKaro </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Button
              color="danger"
              className=" w-full
            "
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing.." : "Login"}
            </Button>
            <div className=" text-center mt-2">
              <p>
                Don't have an account ?{" "}
                <strong>
                  <Link to="/Register">Register</Link>
                </strong>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
