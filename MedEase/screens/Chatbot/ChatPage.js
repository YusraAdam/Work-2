import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, Color, FontFamily, Border } from "../../GlobalStyles";
import { Image } from "expo-image";
import Navbar from './../navbar-footer/Navbar';

const API_KEY = "YOUR-API-KEY";
const systemMessage = {
  "role": "system", 
  "content": "Limit your answers to medical, health, blood pressure and blood sugar readings questions, to anything else say You are medical chatbot and you will answer medical related queries, you cant response"
}

const ChatPage = () => {
  const scrollViewRef = useRef();
  const [userMessage, setUserMessage] = useState(""); // State for user input
  const [messages, setMessages] = useState([]); // State for chat messages
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Send initial message from bot when component mounts
    sendInitialBotMessage();
  }, []);

  const sendInitialBotMessage = async () => {
    const initialBotMessage = {
      message: "Hi.. How can I help you!",
      sender: "ChatGPT"
    };

    setMessages([initialBotMessage]);
  };

  const handleSend = async () => {
    if (userMessage.trim() !== "") {
      const newMessage = {
        message: userMessage,
        direction: 'outgoing',
        sender: "user"
      };
  
      const newMessages = [...messages, newMessage];
      
      setMessages(newMessages);
      setUserMessage(""); // Clear the user input
  
      setIsTyping(true);
      setIsLoading(true);
      // console.log("User message:", userMessage); // Log user message
      await processMessageToChatGPT(newMessages);
    }
  };

  const Message = ({ type, text }) => {
    return (
      <View style={type === "user" ? styles.userMessage : styles.botMessage}>
        <Text style={styles.messageTextBot}>{text}</Text>
      </View>
    );
  };

  async function processMessageToChatGPT(chatMessages) {
    try {
      // Check if chatMessages is an array and not empty
      if (Array.isArray(chatMessages) && chatMessages.length > 0) {
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message };
        });
  
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,
            ...apiMessages
          ]
        }
  
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch response from API");
        }
  
        const responseData = await response.json();
        // Check if responseData contains choices array and is not empty
        if (responseData.choices && responseData.choices.length > 0) {
          setMessages([...chatMessages, {
            message: responseData.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
          setIsLoading(false);
        } else {
          throw new Error("Unexpected response format from API");
        }
      } else {
        throw new Error("Invalid chatMessages data");
      }
    } catch (error) {
      console.error("Error processing message to ChatGPT:", error);
      setIsTyping(false);
      setIsLoading(false);
      // Handle error gracefully, e.g., display error message to user
    }
  }
  
  

  return (
    <>
      <LinearGradient
        style={styles.chatpage}
        locations={[0, 0.3, 8.5, 1]}
        colors={[
          "rgba(252, 252, 252, 0)",
          "rgba(231, 205, 230, 0.2)",
          "rgba(172, 86, 188, 0.5)",
          "#a2429e",
        ]}
      >
        <View style={[styles.topBar, styles.topBarPosition]}>
        
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
        >
          {messages.map((message, index) => (
            <Message key={index} type={message.sender} text={message.message} />
          ))}
          {isTyping && ( // Conditionally render loading message
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBox}>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity style={styles.inputContainer} onPress={handleSend}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={userMessage} // Use userMessage as the value of the text input
            onChangeText={(text) => setUserMessage(text)} // Update userMessage state when the input changes
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </LinearGradient>
      <Navbar />
    </>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingBox: {
    backgroundColor: "white",
    padding: 10,
    left:-120,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  loadingText: {
    fontSize: 12,
    fontFamily: FontFamily.interSemiBold,
  },

  display:{
    paddingTop:120,
  },
  topBarItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  mdirobotOutlineIcon: {
    height: "30.79%",
    width: "7.67%",
    top: "19.21%",
    right: "82.67%",
    left: "6.67%",
  },
  onlineTypo: {
    lineHeight: 24,
    fontSize: 14.5,
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  topBarChild: {
    height: "73.77%",
    backgroundColor: Color.colorPurple,
  },
  rectanglePosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  rectangle: {
    height: "100%",
    bottom: "0%",
  },
  topBarPosition: {
    width: 420,
    left: 0,
    position: "absolute",
    top:45,
    height:80,
  },
  chatContainer: {
    flex: 1,
    marginBottom:100,
  },

  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop:70,
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#AC56A8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },

  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },

  messageTextBot: {
    fontSize: 12,
    color: "black",
    fontFamily: FontFamily.interSemiBold,
  },


  inputContainer: {
    borderRadius:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: "absolute",
    bottom: 60,
    left: 10,
    right: 10,
    backgroundColor: "white", // Adjust the background color as needed
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: Color.colorPurple,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  sendButtonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },

  topBarContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  chatbot: {
    top: "12.66%",
    fontSize: FontSize.size_xl,
    lineHeight: 36,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: "18.53%",
    position: "absolute",
  },

  online: {
    top: "39.34%",
    textAlign: "center",
    left: "22.53%",
    lineHeight: 24,
  },

  chatpage: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default ChatPage;