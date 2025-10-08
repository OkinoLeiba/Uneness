import React, {useState} from 'react';
import '../styles/chat-widget.css';


/**
 * @typedef {Object} State
 * @description Internal UI state for a toggle-able messaging component.
 *
 * Visibility State
 * @property {boolean} [open] - Indicates whether the component (e.g., modal or panel) is currently open.
 *
 * Messages State
 * @property {string[]} [messages] - Array of message strings to display in the component.
 *
 * Input State
 * @property {string} [input] - Current text value entered by the user.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface State {
    input?: string;
}

const ChatWidget: React.FC<State> = (state): React.ReactNode | null => {
    const [open, setOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<object[]>([{text: '', user: ''}]);
    
    const toggleChat = () => {
        setOpen(!open)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        state.input = e.target.value;
    }

    const sendMessage = (): void => {
        if (state.input?.trim()) setMessages([...messages, { text: state.input, sender: "user" }]);

        setTimeout(() => {
            setMessages([...messages, {text: 'Thank you for your message!', sender: 'bot'}])
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') sendMessage();
    }

    return (
        <div className={`chat-container ${open ? 'open' : ''}`}>
          <button name={'chat-btn'} type={'button'} className={'chat-toggle'} onClick={toggleChat}>💬</button>
          {open && (
            <div className={'chat-box'}>
              <div className={'chat-header'}>Live Chat</div>
              <div className={'chat-messages'}>
                {messages?.map((msg, i) => (
                  // @ts-expect-error messages is type ReadOnly object and has state and needs immutability
                  <div key={i} className={`chat-message ${msg.sender}`}>
                    {msg.text} 
                  </div>
                ))}
              </div>
              <div className={'chat-input'}>
                <input
                  type={'text'}
                  value={state.input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={'Type a message...'}
                />
                <button name={'chat-submit-btn'} type={'button'} onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
    );
}

export default ChatWidget;