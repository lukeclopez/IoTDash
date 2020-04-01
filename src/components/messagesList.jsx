import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const MessagesList = ({ items }) => {
  return (
    <>
      <ListGroup>
        {items.map((item, index) => (
          <ListGroupItem key={index} disabled tag="a" href="#">
            {item}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default MessagesList;
