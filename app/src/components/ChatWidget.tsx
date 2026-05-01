import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/Reducers/authReducer';
import { selectIsChatOpen, setIsChatOpen } from '@/store/Reducers/uiReducer';
import type { ChatMessage } from '@/types';

const SUPPORT_REPLIES = [
  "Thanks for reaching out! How can I help you today?",
  "Great question! Let me look into that for you.",
  "I'd be happy to assist with your order.",
  "Our team is here to make your shopping experience amazing!",
  "That's something I can definitely help with. Can you give me a bit more detail?",
  "I'll escalate this to our specialist team and get back to you within 24 hours.",
  "Is there anything else I can help you with today?",
];

let msgId = 0;

function makeMessage(content: string, sender: 'user' | 'support'): ChatMessage {
  return { id: String(++msgId), content, sender, timestamp: new Date() };
}

export default function ChatWidget() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isChatOpen = useAppSelector(selectIsChatOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage("Hi! I'm here to help. What can I assist you with today?", 'support'),
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, makeMessage(text, 'user')]);
    setIsTyping(true);
    setTimeout(() => {
      const reply = SUPPORT_REPLIES[Math.floor(Math.random() * SUPPORT_REPLIES.length)];
      setMessages(prev => [...prev, makeMessage(reply, 'support')]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <>
      {/* Floating Button */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => dispatch(setIsChatOpen(true))}
          title="Open support chat"
          className="fixed bottom-6 right-6 w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h5l4 4 4-4h5a2 2 0 002-2V5a2 2 0 00-2-2z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-violet-600 px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-violet-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">ShopVerse Support</p>
              <p className="text-xs text-violet-200">Online · Typically replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(setIsChatOpen(false))}
              title="Close chat"
              className="p-1 rounded-lg hover:bg-violet-500 text-violet-200 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-violet-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.content}
                </div>
                <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
            {['Track order', 'Return policy', 'Payment help'].map(q => (
              <button
                key={q}
                type="button"
                onClick={() => setInput(q)}
                className="shrink-0 text-xs px-2.5 py-1.5 bg-violet-50 text-violet-700 rounded-full border border-violet-200 hover:bg-violet-100 transition whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="px-4 py-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Message support${user ? `, ${user.name.split(' ')[0]}` : ''}...`}
              className="flex-1 px-3 py-2 text-sm bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              title="Send message"
              className="w-9 h-9 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
