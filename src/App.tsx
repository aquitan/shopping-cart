import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap'
import { routes } from './routes/routes';
import { useRoutes } from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {
  const router = useRoutes(routes)

  return (
    <>
      <Navbar />
      <Container className='mb-4'>
        {router}
      </Container>
    </>
  )
  
}

export default App;
