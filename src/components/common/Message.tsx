import React from 'react';
import { MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  return (
    <div className={`mt-8 p-4 rounded-md ${
      message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    }`}>
      {message.text}
    </div>
  );
}