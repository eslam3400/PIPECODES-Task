import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home';
import AddQuestion from './screens/add-questions/AddQuestion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions' element={<AddQuestion />} />
        <Route path="*" element={<h1>There's nothing here!</h1>} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);