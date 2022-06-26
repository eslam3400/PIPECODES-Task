import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import QuestionCard from '../../components/question-card/QuestionCard'
import './Home.css'
import { Heading, Link, Box, Button } from '@chakra-ui/react'

function Home() {
  const [questions, setQuestions] = React.useState([])
  const [pages, setPages] = React.useState(0)

  React.useEffect(() => getQuestions(), [])

  const getQuestions = () => {
    fetch("http://localhost:3001/api/v1/questions")
      .then(response => {
        if (response.ok) return response.json()
        throw response
      })
      .then(result => {
        setQuestions(result.questions)
        setPages(result.pages)
      })
      .catch(e => alert("there is something went wrong!"));
  }

  const getQuestionsByPage = (page) => {
    fetch(`http://localhost:3001/api/v1/questions?page=${page}`)
      .then(response => {
        if (response.ok) return response.json()
        throw response
      })
      .then(result => {
        setQuestions(result.questions)
        setPages(result.pages)
      })
      .catch(e => alert("there is something went wrong!"));
  }

  const paginationButtons = () => {
    const buttons = []
    for (let i = 1; i <= pages; i++) buttons.push(i)
    return buttons
  }

  return (
    <main>
      <section id="home-header">
        <Heading as="h2" size="4xl" paddingY="8" marginRight={10} textAlign="center">Questions</Heading>
        <Link as={RouterLink} to='/questions' backgroundColor="blue" color="white" p={3} borderRadius={5}>Add Question</Link>
      </section>
      <section id='questions-container'>
        <Box display='flex'>{paginationButtons().map(e => <Button key={e} onClick={() => getQuestionsByPage(e)}>{e}</Button>)}</Box>
        {questions.map(e => <QuestionCard key={e._id} name={e.name} email={e.email} observations={e.observations} date={new Date(e.date).toDateString()} />)}
      </section>
    </main >
  )
}

export default Home