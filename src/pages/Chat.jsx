//https://chatscope.io/storybook/react/?path=/docs/components-maincontainer--without-right-sidebar
import React, { useState, useEffect } from "react";
import {
  MainContainer,
  Sidebar,
  Search,
  ChatContainer,
  ConversationHeader,
  MessageList,
  MessageSeparator,
  Message,
  TypingIndicator,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useAuth } from "../contexts/AuthContext";
import {
  // createConversation,
  // deleteConversation,
  sendMessage,
  getChatRoomsFromDb,
  useMessagesData,
  getChatRoomsFromDbNotOptimized,
  GENERAL_CHATROOM,
} from "../firestore";
import Loader from "../components/Loader";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activateChat, setActivateChat] = useState({
    id: GENERAL_CHATROOM,
    name: "general",
  });
  const { currentUser } = useAuth();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabledInput, setDisabledInput] = useState(!currentUser.instructor);
  // console.log(currentUser);

  const [messages] = useMessagesData(activateChat.id);
  // console.log('activeChat: ', activateChat.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      const conversationsFromDb = await getChatRoomsFromDbNotOptimized(
        currentUser.chatRooms
      );
      console.log("frontend chatRooms", conversationsFromDb);
      console.log("first convo: ", conversationsFromDb[0]);

      setConversations(conversationsFromDb);
      setLoading(false);
    };

    getData();
  }, []);

  // const getConversations = async () => {
  //   const conversation = await getConversationFromDb(UserChatRoomID);
  //   console.log('return list:');
  //   setConversations(conversation);
  // };

  const sendNewMessage = () => {
    sendMessage(
      activateChat.id,
      messageInputValue,
      currentUser.id,
      currentUser.name
    );
    setMessageInputValue("");
  };
  return (
    <div style={{ height: 800 }}>
      {activateChat && console.log("active Chat:", activateChat)}
      <MainContainer>
        <Sidebar position='left' scrollable={true}>
          {loading ? (
            <Loader />
          ) : (
            <ConversationList>
              {conversations.map((conversation) => {
                console.log(conversation);
                return (
                  <Conversation
                    active={conversation.name === activateChat.name}
                    key={conversation.id}
                    id={conversation.id}
                    name={
                      currentUser.name === conversation.name
                        ? "Instructor"
                        : conversation.name
                    }
                    onClick={() => {
                      setActivateChat(conversation);
                      setDisabledInput(
                        currentUser.instructor
                          ? false
                          : conversation.name === "general"
                          ? true
                          : false
                      );
                    }}
                  >
                    <Avatar
                      src={
                        "https://ui-avatars.com/api/?background=random&name=" +
                        (currentUser.name === conversation.name
                          ? "Instructor"
                          : conversation.name)
                      }
                      name={conversation.name}
                    />
                  </Conversation>
                );
              })}
            </ConversationList>
          )}
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={
                "https://ui-avatars.com/api/?background=random&name=" +
                (currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name)
              }
              name={
                currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name
              }
            />

            <ConversationHeader.Content
              userName={
                currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name
              }
            />
            <ConversationHeader.Actions></ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList autoScrollToBottom={true}>
            {messages &&
              messages.map((message) => {
                return (
                  <Message
                    model={{
                      message: message.text,
                      sentTime: message.createdAt,
                      sender: message.username,
                      direction:
                        message.username === currentUser.name
                          ? "outgoing"
                          : "incoming",
                      position: "single",
                    }}
                  >
                    <Message.Footer
                      sentTime={timeAgo.format(
                        new Date(
                          message.createdAt
                            ? message.createdAt.seconds * 1000
                            : new Date()
                        )
                      )}
                    />
                    <Avatar
                      src={
                        "https://ui-avatars.com/api/?name=" + message.username
                      }
                      name={message.username}
                    ></Avatar>
                  </Message>
                );
              })}
          </MessageList>
          <MessageInput
            disabled={disabledInput}
            attachButton={false}
            placeholder='Type message here'
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => sendNewMessage()}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
