import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Question from '../components/Question'
import IChoice from '../interfaces/Choice'
import IQuestion from '../interfaces/Question'
import socketIOClient  from 'socket.io-client'
import QuestionForm from '../components/Forms/QuestionForm'
import ControlPanel from '../components/ControlPanel'
import AdminSection from '../components/AdminSection'

const socket = socketIOClient("http://localhost:3000")
const Admin = () => {
    const [question, setQuestion] = useState<string>("")
    const [choices, setChoices] = useState<IChoice[]>([])
    const [isHiding, setHiding] = useState<boolean>(false)

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        })

        socket.on("question:new", (data: IQuestion) => {
            setQuestion(data.title)
            setChoices(data.choices)
            setHiding(data.isHide)
        })

        return (() => {
            console.log("disconnect");
            
            socket.disconnect()
        })
    }, [])

    const updateNewQuestion = (title: string, choices: IChoice[]) => {
        let newQuestion: IQuestion = {
            title,
            choices,
            isHide: isHiding
        }
        console.log(newQuestion, "here");
        
        socket.emit("question:update", newQuestion)
    }

    const hideQuestionToggle = () => {
        socket.emit("question:hideToggle", (question: IQuestion) => {
            setHiding(question.isHide)
        })
    }

    const clearVote = () => {
        socket.emit("question:clearVote")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 to-yellow-500">
            <Head>
                <title>Create new Question</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="grid grid-cols-3">
                <div className="relative">
                    <div className="absolute m-5">
                        <Question
                            hide={isHiding}
                            hideOpacity={25}
                            title={question}
                            choices={choices}
                        />
                    </div>
                </div>

                <AdminSection
                    title="Update Question"
                >
                    <QuestionForm 
                        submit={updateNewQuestion}
                    />
                </AdminSection>

                <AdminSection
                    title="Control Panel"
                >
                    <ControlPanel
                        buttons={[
                            {
                                text: isHiding ? "Show" : "Hide",
                                action: hideQuestionToggle
                            },
                            {
                                text: "Clear Vote",
                                action: clearVote
                            }
                        ]}
                    />
                </AdminSection>
            </div>
        </div>
    )
}

export default Admin
