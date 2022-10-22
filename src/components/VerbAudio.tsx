import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'

interface Props {
  verbV1: string
}

export const VerbAudio: React.FC<Props> = ({ verbV1 }) => {
  const [newAudio] = useState(new Audio())

  const playAudio = useCallback((audio: string) => {
    newAudio.pause()
    newAudio.currentTime = 0
    newAudio.src = 'http://english.tatarkin.ru/' + audio + '.aac'
    newAudio.play()
  }, [])

  return (
    <Button
      onClick={() => playAudio(verbV1)}>
      Play audio
    </Button>
  )
}