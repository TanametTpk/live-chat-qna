import React from 'react'
import IChoice from '../interfaces/Choice'
import Card from './Card'
import ChoiceList from './ChoiceList'

interface Props {
    title: string
    choices: IChoice[]
}

const Question: React.FC<Props> = ({title, choices}) => {
    return (
        <Card>
          <div className="max-w-sm grid grid-cols-1 divide-y gap-2">
            <h2 className="font-bold text-2xl divide-y">
              {title}
            </h2>
            <ChoiceList choices={choices} />
          </div>
        </Card>
    )
}

export default Question
