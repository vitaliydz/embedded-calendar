import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
// import 'react-calendar/dist/Calendar.css';

const reactContainer = document.createElement('div')
reactContainer.id = "react-container"

document.getElementById('customFieldValue')?.appendChild(reactContainer)

ReactDOM.createRoot(reactContainer).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
