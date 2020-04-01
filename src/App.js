import React, { useState } from "react";
import "./App.css";

import { Container, Row, Col, Button } from "reactstrap";
import * as http from "./httpService";

import MessagesList from "./components/messagesList";
import PrependForm from "./components/prependForm";
import Header from "./components/header";
import { useInterval } from "./hooks";

function App() {
  const [message, setMessage] = useState("");
  const [thingName, setThingName] = useState("");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([]);
  const [isReceiving, setIsReceiving] = useState(false);

  const onReceive = async () => {
    if (!isReceiving) return;
    const newMessages = await http.getMessages(thingName, topic);
    setMessages([...messages, ...newMessages]);
  };

  const onSend = () => {
    http.sendMessage({ thing_name: thingName, topic, qos: 1, message });
  };

  useInterval(() => onReceive(), 5000);

  return (
    <div className="App">
      <Container className="my-5">
        <Header text="Send a Message" />
        <Row className="my-2">
          <Col>
            <PrependForm
              type="text"
              prependtext="Thing Name"
              onChange={e => setThingName(e.target.value)}
              value={thingName}
            />
          </Col>
          <Col>
            <PrependForm
              type="text"
              prependtext="Topic"
              onChange={e => setTopic(e.target.value)}
              value={topic}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <PrependForm
              type="text"
              prependtext="Message"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Button onClick={onSend}>Send</Button>
          </Col>
        </Row>
        <Header text="Received Messages" />
        <Row className="my-2">
          <Col>
            <Button
              onClick={() => setIsReceiving(!isReceiving)}
              active={isReceiving}
              className="my-2"
            >
              {isReceiving ? "Receiving messages..." : "Receive"}
            </Button>
            <MessagesList items={messages} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
