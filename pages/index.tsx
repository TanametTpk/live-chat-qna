import Head from 'next/head'
import Question from '../components/Question'
import IChoice from '../interfaces/Choice'
import socketIOClient  from 'socket.io-client'
import { useEffect, useState } from 'react'
import IQuestion from '../interfaces/Question'

const colors: string[] = [
  "rgba(52, 211, 153, 1)",
  "rgba(96, 165, 250, 1)",
  "rgba(248, 113, 113, 1)"
]

const socket = socketIOClient("http://localhost:3000")
export default function Home() {
  const [question, setQuestion] = useState<string>("-")
  const [choices, setChoices] = useState<IChoice[]>([])
  const [isHiding, setHiding] = useState<boolean>(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
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
    setHiding(question.isHide)
  }

  const addColor2Choice = () => {
    return choices.map((choice: IChoice, index: number) => {
      let MAX_COLOR: number = colors.length
      if (choice.percent > 0 && index < MAX_COLOR) {
        let color: string = colors[index % MAX_COLOR]
        choice["color"] = color
      }
      return choice
    })
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
          choices={addColor2Choice()}
        />
      </div>
    </div>
  )
}
