import { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext.js";
export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [isChatSelected,setIsChatSelected] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const initialState = {
    ChatId: null,
    user: {},
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "changeUser":
        return {
          ChatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,

          user: action.payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ data: state, dispatch,isChatSelected,setIsChatSelected}}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
