import  { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import { UserStore } from "../state/userStore";
import { AppwriteException, Models } from "appwrite";
import { toast } from "react-toastify";

export default function LogoutModel() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const session = UserStore((state) => state.userSession) as Models.Session;
  const logout = () => {
    setLoading(true);

    account
      .deleteSession(session.$id)
      .then(() => {
        setLoading(false);
        navigate("/Login");
        toast.success("Logged out successfully. ", { theme: "colored" });
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message, { theme: "colored" });
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="flat">
        Log Out{" "}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <h1 className="text-2xl font-bold">Are you sure ?</h1>
                <p>
                  {" "}
                  Once you logged out then you can't access the private route.{" "}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={logout} disabled={loading}>
                  {loading ? "Processing" : "Logout"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


// 1:12