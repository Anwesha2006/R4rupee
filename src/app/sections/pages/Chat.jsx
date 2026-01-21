'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle } from 'lucide-react'

const SAMPLE_RESPONSES = [
    "That's a great question about your finances!",
    'Based on your spending patterns, I recommend...',
    'Your savings have increased by 15% this month!',
    'Let me help you understand your cash flow better.',
    "I've analyzed your transactions and found some insights.",
]

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: '1',
            text:
                "Hello! I'm your financial assistant. Ask me anything about your finances, spending patterns, or savings goals.",
            sender: 'assistant',
            timestamp: new Date(),
        },
    ])

    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        // Simulate assistant response
        setTimeout(() => {
            const randomResponse =
                SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)]

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'assistant',
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="h-screen flex flex-col max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-border bg-card p-4 rounded-t-lg lg:rounded-lg sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent">
                        <MessageCircle className="text-accent-foreground" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Financial Assistant
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Know more about your money            </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${message.sender === 'user'
                                    ? 'bg-accent text-accent-foreground rounded-br-none'
                                    : 'bg-card border border-border text-foreground rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm md:text-base">{message.text}</p>
                            <p
                                className={`text-xs mt-2 ${message.sender === 'user'
                                        ? 'text-accent-foreground opacity-70'
                                        : 'text-muted-foreground'
                                    }`}
                            >
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-card border border-border px-4 py-3 rounded-lg rounded-bl-none">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                    style={{ animationDelay: '0.2s' }}
                                />
                                <div
                                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                    style={{ animationDelay: '0.4s' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card p-4 rounded-b-lg lg:rounded-lg sticky bottom-0">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about your finances..."
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="px-4 py-2 rounded-lg bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                    >
                        <Send size={20} />
                        <span className="hidden md:inline">Send</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
