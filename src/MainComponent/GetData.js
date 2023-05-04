import React, { useEffect, useState } from "react";
import "./Style.css";
import RenderedData from "./RenderData";
const URL = "https://my-json-server.typicode.com/codebuds-fk/chat/chats";
const GetData = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [displayChat, setDisplayChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatStore, setChatStore] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((result) => setData(result));
  };

  const onchangeHandle = (event) => {
    // if(event.target.value.trim()==="" || event.target.value.trim().length){
    //     return
    // }
    console.log(event.target.value, "va;");
    let searchTitle =
      data &&
      data.filter((item, index) =>
        item.title.toLowerCase().trim().split(" ").join("") ===
          event.target.value ||
        item.orderId.toLowerCase().trim().split(" ").join("") ===
          event.target.value
          ? item
          : item.title
              .toLowerCase()
              .trim()
              .split(" ")
              .join("")
              .includes(
                event.target.value.toLowerCase().trim().split(" ").join("")
              ) ||
            item.orderId
              .toLowerCase()
              .trim()
              .split(" ")
              .join("")
              .includes(
                event.target.value.toLowerCase().trim().split(" ").join("")
              )
      );
    setSearchItem(searchTitle);
  };

  const handleClickButton = (event) => {
    event.preventDefault();
    if (chatInput.trim() === "") {
      return;
    }

    setChatStore([
      ...chatStore,
      { id: displayChat.orderId, message: chatInput },
    ]);
    setChatInput("");

    //  Or we can directly Add our message in the api's data,Here we added data in element's messageList.
    //  but if we click on other elements then our message will deleted for previously set message.

    // setDisplayChat((displayChat)=>({
    //   ...displayChat,
    //   messageList:[
    //     ...displayChat.messageList,
    //     {
    //       message:chatInput,
    //       sender:"USER"
    //     }
    //   ]
    // }))
  };

  return (
    <>
      <div
        className={
          displayChat && displayChat.title
            ? "subContainerCondition"
            : "subContainer"
        }
      >
        <div className="elements">
          <div className="heading">
            <div style={{ marginLeft: "5px" }}>Filter by Title / Order ID</div>
            <input
              type="search"
              placeholder="Start typing to search"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                onchangeHandle(event);
              }}
            />
          </div>

          {input.length === 0 &&
            data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(event) => {
                    setDisplayChat(item);
                  }}
                >
                  <RenderedData item={item} displayChat={displayChat} />
                </div>
              );
            })}

          {input &&
            input.length > 0 &&
            searchItem &&
            searchItem.length > 0 &&
            searchItem.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(event) => {
                    setDisplayChat(item);
                  }}
                >
                  <RenderedData item={item} displayChat={displayChat} />
                </div>
              );
            })}
        </div>

        <div className="chatContainer">
          {displayChat && displayChat.title && displayChat.title.length > 0 && (
            <div className="chatBot">
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  marginLeft: "10px",
                  borderBottom: "1px solid gray",
                }}
              >
                <img
                  src={displayChat.imageURL}
                  alt={displayChat.title}
                  width="30px"
                  height="40px"
                />
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  {" "}
                  {displayChat.title}
                </span>
              </div>
              {/* <hr /> */}
              <div className="chattingArea">
                {displayChat &&
                  displayChat.messageList &&
                  displayChat.messageList.length === 0 &&
                  chatInput.length === 0 &&
                  chatStore &&
                  chatStore.length === 0 && (
                    <span
                      style={{
                        margin: "auto",
                        position: "relative",
                        top: "200px",
                      }}
                    >
                      Send a message to start chatting
                    </span>
                  )}

                {displayChat &&
                  displayChat.messageList &&
                  displayChat.messageList.length > 0 &&
                  displayChat.messageList.map((item, index) => {
                    return (
                      <div key={index} className="userBotChat">
                        <span className="botChat">
                          {item.sender === "BOT" && item.message}
                        </span>

                        <span className="userChat">
                          {item.sender === "USER" && item.message}
                        </span>
                        <br />
                      </div>
                    );
                  })}
                {/*Here we are Storing chats  */}

                {chatStore &&
                  chatStore.length > 0 &&
                  chatStore
                    .filter((item, index) => displayChat.orderId === item.id)
                    .map((items,index) => {
                      return <li key={index} className="arrayInput">{items.message}</li>;
                    })}
              </div>
              <div className="inputText">
                <input
                  type="text"
                  value={chatInput}
                  placeholder="Type a message"
                  onChange={(event) => setChatInput(event.target.value)}
                />
                <button
                  className="hitButton"
                  onClick={(event) => handleClickButton(event)}
                >
                  ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default GetData;
