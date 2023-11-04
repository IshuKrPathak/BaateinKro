import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "./../../config/appwriteConfig";
import { AppwriteException, ID } from "appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    const promis = account.create(
      ID.unique(),
      authState.email,
      authState.password,
      authState.name
    );
    promis
      .then((res) => {
        console.log("The response id ", res);
        setLoading(false);
        navigate("/Login");
        toast.success("Account created Successfully ! Please Login now  ", {
          theme: "colored",
        });
      })
      .catch((err: AppwriteException) => {
        toast.error(err.message, { theme: "colored" });
        setLoading(false);
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
          Register
        </h1>
        <p>Welcome to BaateinKaro </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <Input
              label="Name"
              type="name"
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
            />
          </div>
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
                Already have an account ?{" "}
                <strong>
                  <Link to="/Login">Login</Link>
                </strong>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
