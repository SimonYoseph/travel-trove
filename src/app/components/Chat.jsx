"use client"
import { useChat } from 'ai/react'
import '../style/Chat.css'

export default function Chat() {

    const { input, handleInputChange, handleSubmit, messages} = useChat();
    console.log(input)
    return (
        <div className='chat'>
            {messages.map((message) => {
                return (
                    <div key={message.id}>
                        {
                            message.role === 'assistant'
                            ?
                            <h3> GPT-4 </h3>
                            :
                            <h3> You </h3>
                        }

                        {message.content.split('\n').map((line, i) => {
                            if (line === "") {
                                return (
                                    <p key={i}>&nbsp;</p>
                                )
                            } else {
                                return (
                                    <p key={i}>{line}</p>
                                )
                            }
                        })}
                    </div>
                )
            })}
            
            <form onSubmit={handleSubmit} className='chatbox'>
                <textarea 
                    placeholder="What kind of flight are you looking for?"
                    value={input}
                    onChange={handleInputChange}
                    />
                <button>Send</button>
            </form>
        </div>
    )
}