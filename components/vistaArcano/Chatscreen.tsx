import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

const Chatscreen = () => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // Mensaje de bienvenida inicial
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hi there! 👋 My name is Nathan. How can I assist you today?",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "Nathan",
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );

    // Tomamos el último mensaje enviado por el usuario
    const userMessage = newMessages[0]?.text;

    // Enviar el mensaje al backend de n8n
    try {
      const response = await axios.post(
        "https://n8n.cypherfunk.tech/webhook/cefbc292-9b55-4527-9aaa-9ece1ff713c7/chat",
        {
          chatInput: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Recibir respuesta del backend y mostrarla en el chat
      const botResponse = response.data.reply; // Ajusta según la estructura de tu respuesta

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(),
            text: botResponse,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Nathan",
            },
          },
        ])
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1, // ID del usuario (puede ser dinámico)
      }}
    />
  );
};

export default Chatscreen;
