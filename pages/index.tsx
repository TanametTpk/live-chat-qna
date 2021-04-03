import Head from 'next/head'
import Question from '../components/Question'
import IChoice from '../interfaces/Choice'
import socketIOClient  from 'socket.io-client'
import { useEffect, useState } from 'react'
import IQuestion from '../interfaces/Question'

const _choices: IChoice[] = [
  {
    title: "Sketch",
    percent: 50,
    voteCount: 30,
    color: "rgba(52, 211, 153, 1)"
  },
  {
    title: "Figma",
    percent: 37,
    voteCount: 26,
    color: "rgba(96, 165, 250, 1)"
  },
  {
    title: "Photoshop",
    percent: 18,
    voteCount: 13,
    color: "rgba(248, 113, 113, 1)"
  },
  {
    title: "Canva",
    percent: 2,
    voteCount: 5
  },
  {
    title: "Paint",
    percent: 1,
    voteCount: 3
  },
  {
    title: "ไม่เคยทำ",
    percent: 0.5,
    voteCount: 1
  }
]
const socket = socketIOClient("http://localhost:3000")
export default function Home() {
  const [question, setQuestion] = useState<string>("-")
  const [choices, setChoices] = useState<IChoice[]>([])

  useEffect(() => {
    socket.on("connect", (data: IQuestion) => {
      // send current state here and set it.
      console.log("connected");
      setupQuestion(data)
    })

    socket.on("vote", (data: IChoice) => {
      console.log("receive", data);
      setChoices(choices.map((choice) => {
        if (choice.title === data.title) return data
        return choice
      }))
    })

    socket.on("question:new", (data: IQuestion) => {
      setupQuestion(data)
    })

    return (() => {
      socket.disconnect()
    })
  }, [])

  const setupQuestion = (question: IQuestion) => {
    setQuestion(question.title)
    setChoices(question.choices)
  }
  
  return (
    <div>
      <Head>
        <title>Live - Q & A</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute m-5">
        <Question
          title={question}
          choices={choices}
        />
      </div>
    </div>
  )
}
