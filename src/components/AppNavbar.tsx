import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { UserStore } from "../state/userStore";
import { Models } from "appwrite";
import LogoutModel from "./LogoutModel";

export default function AppNavbar() {
  const user = UserStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">BaateinKaro</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <h1>{user.name}</h1>
        </NavbarItem>

        <NavbarItem>
         <LogoutModel/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
