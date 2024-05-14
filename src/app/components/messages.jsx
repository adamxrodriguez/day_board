import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

const MessagesSection = () => {

  const { t } = useTranslation();

  // Ref for the latest message or the bottom of the messages container
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([
    { sender: "DPA", time: "12 Nov 2023 @ 14:55:34 UTC", text: "Thanks!" },
    { sender: "Me", time: "12 Nov 2023 @ 14:52:23 UTC", text: "Will do." },
    { sender: "firstofficer", time: "12 Nov 2023 @ 13:23:55 UTC", text: "please be sure to complete the fire drill this month. Also, were still showing that the life rafts are overdue for service. If you have had the inspection done, please upload the new service reports, other please schedule ASAP" },

    // Add more messages as needed
  ]);
  // Effect to scroll to the bottom of the messages list
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Assuming `messages` is your state variable holding the messages

  return (
    <div className="p-4 bg-sky-900 text-white messages " style={{ display: 'flex', flexgrow: '1', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 1rem)' }}> {/* Adjust maxHeight as needed */}
        <div class="flex items-center justify-between bg-sky-400 p-2 mt-4 h-52">
          <div>
            <h2 class="text-lg font-semibold">{t("dashboard.messages.generalchat")}</h2>

            <button class="p-2  h-10 w-10 bg-sky-900 rounded-full">
              <ChatBubbleBottomCenterIcon alt="Add" />
            </button>
          </div>
          <div class="p-2">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender === 'Me' ? 'me' : ''}`}>
                <span style={{ color: 'red' }}>{message.sender}</span> ({message.time}): <span style={{ color: 'black' }}>{message.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div ref={bottomRef}></div> {/* This is the element we'll scroll to */}
      </div>
    </div>
  );
};

export default MessagesSection;
