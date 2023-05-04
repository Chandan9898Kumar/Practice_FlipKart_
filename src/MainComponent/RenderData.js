import React from "react";
const RenderedData = ({ item ,displayChat}) => {
  return (console.log(item,'item',displayChat),
    <>
      <div className={item.orderId===displayChat.orderId? 'isActive':'Items'}>
        <img src={item.imageURL} alt={item.title} width="30px" height="40px" />
        <div style={{ display: "inline-block", marginLeft: "15px" }}>
          <span>{item.title}</span>
          <br />
          <span>{item.orderId}</span>
          
        </div>
        <span style={{textAlign:'right',marginLeft:'80%'}}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(item.latestMessageTimestamp)}</span>
      </div>
      <hr />
    </>
  );
};
export default RenderedData;
