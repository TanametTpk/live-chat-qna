import React from 'react'
import IChoice from '../interfaces/Choice'
import Choice from './Choice'

interface Props {
    choices: IChoice[]
}

const ChoiceList: React.FC<Props> = ({choices}) => {
    return (
        <div className="pt-2 grid grid-cols-1 gap-2">
            {
                choices.map((choice: IChoice, index: number) => 
                    <Choice key={index} {...choice} />
                )
            }
        </div>
    )
}

export default ChoiceList
