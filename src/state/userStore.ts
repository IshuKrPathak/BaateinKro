import { create } from "zustand";
import { Models } from "appwrite";
import { devtools, persist } from "zustand/middleware";
type States = {
  userSession: Models.Session | object;
};
type Actions = {
  updateUserSession: (session: Models.Session) => void;
};
export const UserStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        userSession: {},
        updateUserSession: (session: Models.Session) =>
          set(() => ({
            userSession: session,
          })),
      }),
      { name: "BaateinKaro_user_store" }
    )
  )
);
