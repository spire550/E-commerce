import { createContext, useState } from "react";

export let UserToken = createContext();

export default function UserContextProvider(props) {
  const [userToken, setToken] = useState();
  return (
    <UserToken.Provider value={{ userToken, setToken }}>
      {props.children}
    </UserToken.Provider>
  );
}
