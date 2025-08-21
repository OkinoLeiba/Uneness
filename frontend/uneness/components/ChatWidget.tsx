import React from 'react';
import '../styles/chat-widget.css';

interface State {
    open?: boolean;
    messages?: string[];
    input?: string;
}


export default class ChatWidget extends React.Component<State> {
    
    state: State = {
        open: false,
        messages: [],
        input: '',
    }

  toggleChat = () => {
    // @ts-expect-error width type ReadOnly object and has state and needs immutability
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  sendMessage = () => {
    
    if (this.state.input?.trim()) {
      // @ts-expect-error operator will destruct array
      const newMessages = [...this.state.messages, { text: this.state.input, sender: 'user' }];
      this.setState({ messages: newMessages, input: '' });

      setTimeout(() => {
        this.setState(prevState => ({
          // @ts-expect-error operator will destruct array
          messages: [...prevState.messages, { text: 'Thanks for your message!', sender: 'bot' }]
        }));
      }, 1000);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {

    return (
      <div className={`chat-container ${this.state.open ? 'open' : ''}`}>
        <button name={'chat-btn'} type={'button'} className={'chat-toggle'} onClick={this.toggleChat}>💬</button>
        {this.state.open && (
          <div className={'chat-box'}>
            <div className={'chat-header'}>Live Chat</div>
            <div className={'chat-messages'}>
              {this.state.messages?.map((msg, i) => (
                // @ts-expect-error messages is type ReadOnly object and has state and needs immutability
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.text} 
                </div>
              ))}
            </div>
            <div className={'chat-input'}>
              <input
                type={'text'}
                value={this.state.input}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder={'Type a message...'}
              />
              <button name={'chat-submit-btn'} type={'button'} onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}


