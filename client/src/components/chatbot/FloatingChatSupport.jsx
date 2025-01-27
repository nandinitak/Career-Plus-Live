"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, HelpCircle, Send, Loader2, Mic } from "lucide-react";
import * as Separator from "@radix-ui/react-separator";
import { ChatSupportV2 } from "./ChatSupprtV2";
import { Button } from "@/components/ui/button";
import { useRhino } from "@picovoice/rhino-react";
import rhinoModel from "@/modules/jobin/lib/rhinoModel";
import rhinoContext from "@/modules/jobin/lib/rhinoContext";
const ACCESS_KEY = import.meta.env.VITE_PICOVOICE_ACCESS_KEY;
// Avatar Component with moving gradient
const Avatar = () => (
  <motion.div
    className="w-12 h-12 rounded-sm flex items-center justify-center text-white font-bold text-lg overflow-hidden"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-black"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    <span className="relative z-10">JA</span>
  </motion.div>
);

// export default function VoiceWidget() {
//   return (
//     <div className="voice-widget">
//       <h2>VoiceWidget</h2>

//       <button
//         className="start-button"
//         onClick={() => rhnInit()}
//         disabled={isLoaded || accessKey.length === 0}
//       >
//         Init Model
//       </button>

//       <h3>Model Loaded: {JSON.stringify(isLoaded)}</h3>
//       <h3>Listening: {JSON.stringify(isListening)}</h3>
//       <h3>Error: {JSON.stringify(error !== null)}</h3>
//       {error && accessKey && <p className="error-message">{error.message}</p>}

//       <br />
//       <button
//         onClick={() => rhnProcess()}
//         disabled={error !== null || !isLoaded || isListening}
//       >
//         Process
//       </button>
//       <button
//         onClick={() => rhnRelease()}
//         disabled={error !== null || !isLoaded || isListening}
//       >
//         Release
//       </button>

//       <h3>Inference:</h3>
//       {inference && <pre></pre>}
//       <hr />
//       <h3>Context Info:</h3>
//       <pre>{contextInfo}</pre>
//     </div>
//   );
// }

// Solid Color Pill Component
const SolidPill = ({ children, color = "bg-gray-200" }) => (
  <span
    className={`px-2 py-1 rounded-sm ${color} text-gray-800 text-sm font-medium`}
  >
    {children}
  </span>
);

// Help Card Component
const HelpCard = () => (
  <motion.div
    className="absolute bottom-full right-0 mb-2 p-4 bg-white rounded-sm shadow-lg w-64"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <h3 className="text-lg font-semibold mb-2">Kaushal AI Help</h3>
    <ul className="text-sm space-y-1">
      <li>• Click the chat icon to open/close</li>
      <li>• Type your message and hit send</li>
      <li>• Hover over elements for more info</li>
    </ul>
  </motion.div>
);

// Message Component
const Message = ({ content, isUser }) => (
  <motion.div
    className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div
      className={`max-w-[80%] p-3 rounded-sm ${
        isUser ? "bg-gray-200" : "bg-white border border-gray-200"
      }`}
    >
      {content}
    </div>
  </motion.div>
);

// Input Component
const Input = ({ isLoading }) => (
  <div className="flex items-center bg-white border-t border-gray-200 p-4">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-grow mr-2 p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    <motion.button
      className="p-2 bg-gray-800 text-white rounded-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
    </motion.button>
  </div>
);

// Connected Status Component
const ConnectedStatus = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    <span className="text-xs text-black rounded-sm">Connected</span>
  </div>
);

// Main Component
export const FloatingChatSupport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessKey, setAccessKey] = useState(ACCESS_KEY);

  const {
    inference,
    contextInfo,
    isLoaded,
    isListening,
    error,
    init,
    process,
    release,
  } = useRhino();

  const rhnInit = async () => {
    console.log("init done");
    await init(accessKey, rhinoContext, rhinoModel);
  };

  const rhnProcess = async () => {
    await rhnInit();
    console.log("processing done");
    await process();
  };

  const rhnRelease = async () => {
    await release();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) () => rhnInit();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500); // Simulate network delay
  };
  console.log("hello");
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-gray-100 rounded-sm shadow-md w-80 h-[480px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* <Avatar /> */}
                <div className="flex flex-row">
                  <h2 className="text-lg font-semibold mr-4">Kaushal AI</h2>
                </div>
              </div>
              <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <X />
              </motion.button>
            </div>
            <Separator.Root className="h-[1px] bg-gray-300" />
            <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
              <ConnectedStatus />
              <SolidPill color="bg-green-200">Online</SolidPill>
            </div>
            <div className="h-[calc(100%-170px)] overflow-y-auto p-4 space-y-4">
              <div>
                <Button>
                  <Mic
                    onClick={() => rhnProcess()}
                    disabled={error !== null || !isLoaded || isListening}
                    className={`${
                      error !== null || !isLoaded || isListening
                        ? "text-red-500 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  <span className="ml-2">Start Speaking</span>
                </Button>
              </div>
              <ChatSupportV2 />
              {JSON.stringify(inference, null, 2)}
              {JSON.stringify(isListening)}
              {JSON.stringify(isLoaded)}
              {}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
