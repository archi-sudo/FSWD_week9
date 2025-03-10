import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './ToDoList.jsx';
import FeedbackForm from './FeedbackForm.jsx';
function App() {
  return (
    
  <div>
      <ToDoList />
      <FeedbackForm />
    </div>  
  )
}

export default App
