import Head from 'next/head'
import Question from '../components/Question'
import IChoice from '../interfaces/Choice'
import socketIOClient  from 'socket.io-client'
import { useEffect, useState } from 'react'
import IQuestion from '../interfaces/Question'
import addColor2Choice from '../libs/addColor2Choice'

const socket = socketIOClient("http://localhost:5000")
export default function Home() {
  const [question, setQuestion] = useState<string>("-")
  const [choices, setChoices] = useState<IChoice[]>([])
  const [isHiding, setHiding] = useState<boolean>(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    })

    socket.on("vote", (data: IChoice) => {
      setChoices(choices.map((choice) => {
        if (choice.title === data.title) return data
        return choice
      }))
    })

    socket.on("question:new", (data: IQuestion) => {
      setupQuestion(data)
    })

    return (() => {
      console.log("disconnect");
      socket.disconnect()
    })
  }, [])

  const setupQuestion = (question: IQuestion) => {
    setQuestion(question.title)
    setChoices(question.choices)
    setHiding(question.isHide)
  }
  
  return (
    <div>
      <Head>
        <title>Live - Q & A</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute m-5">
        <Question
          hide={isHiding}
          hideOpacity={0}
          title={question}
          choices={addColor2Choice(choices)}
        />
      </div>
    </div>
  )
}
