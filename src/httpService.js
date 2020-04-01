import axios from "axios";

const endpoint =
  "https://gt952bieic.execute-api.us-east-1.amazonaws.com/default/sendOrReceiveFromSQS";

export const getMessages = async (thingName, topic) => {
  const res = await axios.get(endpoint, {
    params: {
      thingName,
      topic
    }
  });
  return res.data;
};

export const sendMessage = async ({ thing_name, topic, qos, message }) => {
  return await axios.post(
    endpoint,
    { thing_name, topic, qos, message },
    { headers: { "content-type": "application/json" } }
  );
};
