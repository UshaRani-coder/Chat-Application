import { createContext, useContext, useReducer, useState, useRef } from 'react'
import { AuthContext } from './AuthContext.js'
export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [isChatSelected, setIsChatSelected] = useState(false)
  const [isEmojiSelected, setIsEmojiSelected] = useState(null)
  const [text, setText] = useState('')
  const textInputRef = useRef(null)
  const fileInputRef = useRef(null)
  const [users, setUsers] = useState([])
  const [deleteChat, setDeleteChat] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const initialState = {
    ChatId: null,
    user: {},
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeUser':
        return {
          ChatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,

          user: action.payload,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ChatContext.Provider
      value={{
        data: state,
        dispatch,
        isChatSelected,
        setIsChatSelected,
        isEmojiSelected,
        setIsEmojiSelected,
        showEmojis,
        setShowEmojis,
        text,
        setText,
        textInputRef,
        fileInputRef,
        users,
        setUsers,
        deleteChat,
        setDeleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider
