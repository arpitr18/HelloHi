import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 text-center p-6">
      {/* Message Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-600">Welcome to HelloHi</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-xs mx-auto font-medium">
          Start a conversation by selecting a chat or clicking on a contact.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
