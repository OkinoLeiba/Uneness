import React, { Component } from 'react';
import '../styles/chat-widget.css';

interface State {
    open: boolean;
    messages: string[];
    input: string;
}


export default class ChatWidget extends Component<State> {
    
    state: State = {
        open: false,
        messages: [],
        input: '',
    }

  toggleChat = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  sendMessage = () => {
    
    if (this.state.input.trim()) {
      const newMessages = [...this.state.messages, { text: this.state.input, sender: 'user' }];
      this.setState({ messages: newMessages, input: '' });

      setTimeout(() => {
        this.setState(prevState => ({
          messages: [...prevState.messages, { text: 'Thanks for your message!', sender: 'bot' }]
        }));
      }, 1000);
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {

    return (
      <div className={`chat-container ${this.state.open ? 'open' : ''}`}>
        <button className="chat-toggle" onClick={this.toggleChat}>💬</button>
        {this.state.open && (
          <div className="chat-box">
            <div className="chat-header">Live Chat</div>
            <div className="chat-messages">
              {this.state.messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={this.state.input}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Type a message..."
              />
              <button onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}


