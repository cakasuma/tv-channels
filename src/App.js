import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'utils/routes'
import { Header } from 'components/header'

const App = () => {
    return (
        <Router>
            <Header />
            <Routes />
        </Router>
    )
}

export default App
