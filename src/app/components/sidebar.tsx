import React from 'react';

interface Chat {
  id: number;
  name: string;
}

interface SidebarProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onDeleteChat: (id: number) => void;
  onAddChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, onDeleteChat, onAddChat }) => {
  return (
    <div className="flex flex-col w-64 bg-gray-100 border-r border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <button
        className="mb-2 p-2 bg-green-500 text-white rounded"
        onClick={onAddChat}
      >
        New Chat
      </button>
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat.id} className="flex justify-between items-center mb-2 p-2 rounded hover:bg-gray-200 cursor-pointer">
            <span onClick={() => onSelectChat(chat)}>{chat.name}</span>
            <button
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelectChat
                onDeleteChat(chat.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
