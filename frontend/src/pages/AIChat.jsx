import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FiSend,
  FiZap,
  FiRefreshCw,
  FiPhoneCall,
  FiAlertTriangle,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const quickPrompts = [
  "Hi 👋",
  "I'm feeling anxious and need grounding 🌿",
  "I'm overwhelmed by work/study stress 📚",
  "I can't sleep, give me a relaxation tip 😴",
  "Give me a daily positive affirmation ✨",
];

const initialAIMessages = [
  {
    id: "ai_1",
    sender: "MindfulAI Companion",
    role: "ai",
    avatar: "🤖",
    text: "Hello! I am your MindfulAI Companion 🌿. I'm here 24/7 as a safe, compassionate, non-judgmental space. How can I help you today?",
    time: "Just now",
    isCrisis: false,
  },
];

const crisisKeywords = [
  "die",
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "harm myself",
  "self harm",
  "ending it all",
  "don't want to live",
  "dont want to live",
  "suicidal",
];

export default function AIChat() {
  const [messages, setMessages] = useState(initialAIMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMsg) => {
    const textTrimmed = userMsg.trim();
    const textLower = textTrimmed.toLowerCase();

    // 🚨 CRISIS DETECTION 🚨
    const containsCrisis = crisisKeywords.some((word) => textLower.includes(word));
    if (containsCrisis) {
      setShowCrisisModal(true);
      return {
        isCrisis: true,
        text: `🚨 URGENT CRISIS SUPPORT NEEDED 🚨\n\nI hear how deeply you are hurting right now, but please know that YOUR LIFE MATTERS and you do not have to carry this heavy pain alone.\n\nImmediate Free & Confidential 24/7 Crisis Support:\n• Suicide & Crisis Lifeline: Call or Text 988\n• Crisis Text Line: Text HOME to 741741\n• India KIRAN Helpline: Call 9152987821\n• UK NHS Services: Call 111\n• Emergency Services: Call 911 / 112\n\nPlease reach out to one of these services or a trusted loved one immediately. We care about your safety.`,
      };
    }

    // GREETING PATTERNS
    if (/^(hi|hello|hey|hey there|good morning|good evening|greetings)\b/i.test(textLower)) {
      return {
        isCrisis: false,
        text: "Hi there! 👋 It's wonderful to connect with you today. How are you feeling right now, or what is on your mind?",
      };
    }

    if (textLower.includes("how are you")) {
      return {
        isCrisis: false,
        text: "I'm doing well, thank you for asking! 😊 I'm right here ready to support you. How has your day been going?",
      };
    }

    // SPECIFIC MENTAL HEALTH HELP
    if (textLower.includes("anxious") || textLower.includes("panic") || textLower.includes("grounding") || textLower.includes("scared")) {
      return {
        isCrisis: false,
        text: "I hear you, and it is completely okay to feel anxious right now. Take a deep breath with me: Inhale through your nose for 4 seconds... hold for 4... exhale for 6. Let's try the 5-4-3-2-1 grounding method together: Can you name 3 objects you see right now?",
      };
    }

    if (textLower.includes("sleep") || textLower.includes("tired") || textLower.includes("insomnia") || textLower.includes("night")) {
      return {
        isCrisis: false,
        text: "Sleep troubles can be so frustrating. Try unclenching your jaw, letting your shoulders drop, and placing your phone face down. Would you like me to guide you through a 4-7-8 breathing relaxation sequence for bedtime?",
      };
    }

    if (textLower.includes("work") || textLower.includes("study") || textLower.includes("burnout") || textLower.includes("exam") || textLower.includes("stress")) {
      return {
        isCrisis: false,
        text: "Academic and workplace burnout is very real. You've been carrying a lot of weight lately. Remember: your worth is not defined by your productivity. What is one small task you can set aside for tomorrow so you can rest tonight?",
      };
    }

    if (textLower.includes("lonely") || textLower.includes("alone") || textLower.includes("sad")) {
      return {
        isCrisis: false,
        text: "Feeling lonely can feel so heavy, but please know that you are not alone in this community. I am here with you, and there are verified peer listeners online ready to talk in our Peer Support Hub. Would you like me to point you toward an online peer circle?",
      };
    }

    if (textLower.includes("affirmation") || textLower.includes("positive") || textLower.includes("quote")) {
      return {
        isCrisis: false,
        text: "Here is your positive affirmation for today: 'I am allowed to take things one moment at a time. I am worthy of rest, peace, and self-compassion.' Breathe that in ✨.",
      };
    }

    // DEFAULT EMPATHETIC RESPONSE
    return {
      isCrisis: false,
      text: `Thank you for reaching out and sharing: "${textTrimmed}". It takes courage to express your thoughts. I am listening—how can I best assist or support you right now?`,
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = {
      id: "u_" + Date.now(),
      sender: "You",
      role: "user",
      avatar: "👤",
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Natural response delay
    setTimeout(() => {
      const responseObj = generateAIResponse(query);
      const aiReply = {
        id: "ai_" + Date.now(),
        sender: responseObj.isCrisis ? "🚨 Emergency AI Safety Alert" : "MindfulAI Companion",
        role: "ai",
        avatar: responseObj.isCrisis ? "🚨" : "🤖",
        text: responseObj.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCrisis: responseObj.isCrisis,
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);

      if (responseObj.isCrisis) {
        toast.error("🚨 Crisis detected! Emergency Help details displayed.", { duration: 6000 });
      }
    }, 800);
  };

  const handleResetChat = () => {
    setMessages(initialAIMessages);
    setShowCrisisModal(false);
    toast.success("AI Conversation reset!");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
          {/* AI Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                🤖
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                  MindfulAI Mental Health Companion
                  <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                    <FiZap size={11} className="text-amber-500" /> 24/7 Real AI & Safety Detection
                  </span>
                </h2>
                <p className="text-xs text-slate-500">Intelligent conversational AI with instant crisis recognition & safety alerts</p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Reset Conversation"
            >
              <FiRefreshCw size={18} />
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs ${
                    msg.role === "user"
                      ? "bg-slate-900"
                      : msg.isCrisis
                      ? "bg-rose-600 animate-pulse"
                      : "bg-gradient-to-tr from-teal-500 to-emerald-500"
                  }`}
                >
                  {msg.avatar}
                </div>

                <div className={`space-y-1 max-w-2xl ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className={msg.isCrisis ? "text-rose-600 font-bold" : ""}>{msg.sender}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{msg.time}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed font-normal shadow-xs whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-teal-600 text-white rounded-tr-none"
                        : msg.isCrisis
                        ? "bg-rose-950 text-rose-100 border-2 border-rose-600 rounded-tl-none font-medium"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                    }`}
                  >
                    {msg.text}

                    {msg.isCrisis && (
                      <div className="mt-4 pt-3 border-t border-rose-800 flex items-center justify-between">
                        <a
                          href="tel:988"
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                        >
                          <FiPhoneCall size={14} /> Call 988 Crisis Lifeline Now
                        </a>
                        <button
                          onClick={() => setShowCrisisModal(true)}
                          className="text-xs text-rose-300 underline font-semibold"
                        >
                          View All Emergency Numbers
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  🤖
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 text-xs text-slate-400 flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 font-medium text-slate-500">MindfulAI is thinking & analyzing...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-6 py-2.5 bg-slate-100/60 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Try Sending:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-slate-700 text-xs font-semibold whitespace-nowrap transition shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message (e.g. 'Hi' or talk about how you feel)..."
              className="flex-1 py-3 px-4 bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <FiSend size={15} /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Emergency Crisis Pop-up Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border-2 border-rose-600 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition"
            >
              <FiX size={22} />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-900/50 animate-bounce">
                <FiAlertTriangle size={36} />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Immediate Crisis Support Available</h3>
              <p className="text-xs text-rose-300 font-medium">
                We care deeply about your safety. Free, confidential support is available 24/7 right now.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:988"
                className="w-full p-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-between shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <FiPhoneCall size={20} />
                  <span>Call or Text 988 Lifeline</span>
                </div>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Free 24/7</span>
              </a>

              <a
                href="sms:741741?body=HOME"
                className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-sm flex items-center justify-between border border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <FiHeart size={20} className="text-rose-400" />
                  <span>Crisis Text Line (Text HOME to 741741)</span>
                </div>
                <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">SMS</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">International Hotlines:</p>
              <p>• India: KIRAN Helpline - 9152987821</p>
              <p>• UK: NHS Urgent Mental Health - 111</p>
              <p>• Emergency Services: 911 / 112</p>
            </div>

            <button
              onClick={() => setShowCrisisModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
            >
              I Understand & I Am Safe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
