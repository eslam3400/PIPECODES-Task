import React from 'react'
import { Box } from '@chakra-ui/react'
import './QuestionCard.css'

function QuestionCard({ name, email, observations, date }) {
  return (
    <Box className='question-card' borderRadius={10} bg='tomato' w='70%' p={5} color='white'>
      <p>Name: <span className='question-data'>{name}</span></p>
      <p>Email: <span className='question-data'>{email}</span></p>
      <p>Observations: <span className='question-data'>{observations}</span></p>
      <p>Date: <span className='question-data'>{date}</span></p>
    </Box>
  )
}

export default QuestionCard