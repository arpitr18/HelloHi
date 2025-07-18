import React from 'react'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Home Page</h1>
      <p className="text-center mt-4">This is the main page of the application.</p>
      <p className="text-center mt-2">You can navigate to other pages using the links in the navbar.</p>
      <p className="text-center mt-2">Enjoy your stay!</p>
    </div>
  )
}

export default HomePage