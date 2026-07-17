import React, { useState, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import axios from "axios";

const N8N_CHAT_URL = process.env.EXPO_PUBLIC_N8N_CHAT_URL;

const Chatscreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

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

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );

    // Tomamos el último mensaje enviado por el usuario
    const userMessage = newMessages[0]?.text;

    // Enviar el mensaje al backend de n8n
    try {
      if (!N8N_CHAT_URL) {
        throw new Error("EXPO_PUBLIC_N8N_CHAT_URL no está configurada");
      }
      const response = await axios.post(
        N8N_CHAT_URL,
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
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(),
            text: "El arcano medita en silencio... (no se pudo obtener respuesta, intenta de nuevo)",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Nathan",
            },
          },
        ])
      );
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
