import React from 'react'
import { Input, Button, FormErrorMessage, FormLabel, FormControl, Box, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

function AddQuestion() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [observations, setObservations] = React.useState("")
  const [date, setDate] = React.useState("")
  const [isNameError, setNameError] = React.useState(true)
  const [isEmailError, setEmailError] = React.useState(true)
  const [isDateError, setDateError] = React.useState(true)
  const [isValidDate, setValidDate] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const navigate = useNavigate()

  const addQuestion = () => {
    if (name) setNameError(false)
    else setNameError(true)
    if (email) setEmailError(false)
    else setEmailError(true)
    if (date) setDateError(false)
    else setDateError(true)

    if (isDateError || isEmailError || isDateError) return setShowError(true)
    if (!validateDate()) return setValidDate(false)
    else setValidDate(true)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ name, email, observations, date });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3001/api/v1/questions", requestOptions)
      .then(async response => {
        const data = await response.json()
        if (response.ok) navigate("/")
        else alert(data.msg)
      })
      .catch(e => alert("there is something went wrong!"));
  }

  const validateDate = () => {
    const tomorrow = new Date()
    const _date = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return _date > tomorrow
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" >
      <Heading my={8}>Add Question Form</Heading>
      <FormControl isInvalid={isNameError && showError} isRequired width="50%" mt="5">
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input id='name' type='text' onChange={e => setName(e.target.value)} />
        {(isNameError && showError) ? (<FormErrorMessage>Name is required.</FormErrorMessage>) : null}
      </FormControl>
      <FormControl isInvalid={isEmailError && showError} isRequired width="50%" mt="5">
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' onChange={e => setEmail(e.target.value)} />
        {(isEmailError && showError) ? (<FormErrorMessage>Email is required.</FormErrorMessage>) : null}
      </FormControl>
      <FormControl width="50%" mt="5">
        <FormLabel htmlFor='observations'>Observations</FormLabel>
        <Input id='observations' type="text" onChange={e => setObservations(e.target.value)} />
      </FormControl>
      <FormControl isInvalid={(isDateError && showError) || (!isValidDate && showError)} isRequired width="50%" mt="5">
        <FormLabel htmlFor='date'>Date</FormLabel>
        <Input id='date' type='date' onChange={e => setDate(e.target.value)} />
        {(isDateError && showError) ? (<FormErrorMessage>Date is required.</FormErrorMessage>) : null}
        {(!isValidDate) ? (<FormErrorMessage>Date must be grater than tomorrow.</FormErrorMessage>) : null}
      </FormControl>
      <Button onClick={addQuestion} mt={5} colorScheme="green">Submit</Button>
    </Box >
  )
}

export default AddQuestion