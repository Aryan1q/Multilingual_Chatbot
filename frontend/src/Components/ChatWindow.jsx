import { useEffect, useRef, useState } from "react";
import { postChat } from "../lib/api";
import ProductPicker from "./ProductPicker";

function speak(text) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.pitch = 1;
  utter.rate = 1;
  utter.volume = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(utter);
}

function Bubble({ from, text }) {
  const isUser = from === "user";

  return (
    <div
      className={`flex w-full mb-2 ${
        isUser ? "justify-end" : "justify-start"
      } animate-[fadeIn_0.3s_ease]`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-xl transition-all
        ${
          isUser
            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-yellow-300/40"
            : "bg-black/50 backdrop-blur-xl border border-yellow-500/40 text-gray-200 shadow-lg"
        }`}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({ products = [] }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Welcome to **Zariyah Customer Support** — how can I assist you today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [lang, setLang] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pendingQuery, setPendingQuery] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pickerOpen]);

  async function sendMessage(textToSend = null) {
    const text = (textToSend ?? input).trim();
    if (!text) return;

    if (!textToSend) setInput("");

    setMessages((m) => [...m, { from: "user", text }]);
    setLoading(true);

    try {
      const resp = await postChat(text);
      const reply = resp.reply ?? "No reply from server.";

      // Add bot message
      setMessages((m) => [...m, { from: "bot", text: reply }]);

      // ⭐ SPEAK BOT MESSAGE
      speak(reply);

      const lc = reply.toLowerCase();
      const asksForProduct =
        lc.includes("specify the name of the product") ||
        lc.includes("please specify the name of the product") ||
        (lc.includes("which product") && lc.includes("specify"));

      if (asksForProduct && products.length > 0) {
        setPendingQuery(text);
        setPickerOpen(true);
      } else {
        setPendingQuery(null);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg = "⚠️ There was an error contacting the server.";

      setMessages((m) => [...m, { from: "bot", text: errMsg }]);

      // Speak error message
      speak(errMsg);
    } finally {
      setLoading(false);
    }
  }

  async function onSelectProduct(product) {
    setPickerOpen(false);
    if (pendingQuery) {
      const augmented = `${pendingQuery} about ${product.name}`;
      await sendMessage(augmented);
      setPendingQuery(null);
    }
  }

  return (
    <div className="bg-black/70 backdrop-blur-2xl border border-yellow-500/40 rounded-3xl shadow-[0_0_35px_rgba(255,215,0,0.25)] p-5 h-[70vh] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-yellow-700/40">
        <h2 className="text-xl font-bold text-yellow-300 relative tracking-wide">
          Zariyah Customer Support
          <div className="absolute -bottom-1 left-0 w-2/5 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-700 rounded-full shadow-yellow-500"></div>
        </h2>

        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-300 font-medium">Lang</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border border-yellow-600/50 rounded-lg p-1 bg-black/60 text-yellow-200 shadow-sm"
          >
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 p-4 
        bg-gradient-to-b from-black/40 to-black/20 
        rounded-2xl shadow-inner border border-yellow-600/20"
      >
        {messages.map((m, i) => (
          <Bubble key={i} from={m.from} text={m.text} />
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex gap-3 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-yellow-600/50 rounded-full px-4 py-2 
          shadow-lg bg-black/60 text-yellow-100 backdrop-blur
          focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
          placeholder="Type your message…"
        />

        <button
          onClick={() => sendMessage()}
          className="px-6 py-2 rounded-full text-black font-semibold shadow-xl transition-all
          bg-gradient-to-r from-yellow-400 to-yellow-600
          hover:from-yellow-500 hover:to-yellow-700
          active:scale-95
          shadow-yellow-400/60"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      <ProductPicker
        visible={pickerOpen}
        products={products}
        onSelect={onSelectProduct}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
