import React from 'react'
import IChoice from '../interfaces/Choice'
import Card from './Card'
import ChoiceList from './ChoiceList'

interface Props {
    title: string
    choices: IChoice[]
    hide?: boolean
    hideOpacity?: number
}

const Question: React.FC<Props> = ({title, choices, hide, hideOpacity = 0}) => {
    return (
        <div className={`transition duration-300 opacity-${hide ? hideOpacity : 100}`}>
          <Card>
            <div className="max-w-sm grid grid-cols-1 divide-y gap-2">
              <h2 className="font-bold text-2xl divide-y">
                {title}
              </h2>
              <ChoiceList choices={choices} />
            </div>
          </Card>
        </div>
    )
}

export default Question
