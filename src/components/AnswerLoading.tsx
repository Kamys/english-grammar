import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { onInitAnswers, onSortVerb } from '../stores/answerStatistic'
import { Button, Spinner } from 'react-bootstrap'

interface Props extends PropsWithChildren {
}

export const AnswerLoading: React.FC<Props> = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError>(null)

  const loadAnswers = useCallback(() => {
    setLoading(true)
    setError(null)
    axios.get('http://localhost:3000/answers').then(response => {
        setLoading(false)
        onInitAnswers(response.data)
        onSortVerb()
      },
    )
      .catch(setError)
  }, [])

  useEffect(() => {
    loadAnswers()
  }, [])

  if (error) {
    console.log(error)
    return (
      <>
        <div>Failed load answers: {error.message}</div>
        <Button onClick={loadAnswers}>Try again</Button>
      </>
    )
  }

  if (isLoading) {
    return <Spinner animation='grow' />
  }

  return <>{children}</>
}