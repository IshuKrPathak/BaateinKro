
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { UserStore } from "../state/userStore";
import { Models } from "appwrite";
import LogoutModel from "./LogoutModel";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  const user = UserStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;
  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-inherit">BaateinKaro</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <h1>{user.name}</h1>
        </NavbarItem>

        <NavbarItem>
          <LogoutModel />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
