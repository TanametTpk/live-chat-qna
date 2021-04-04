import React from 'react'
import IChoice from '../interfaces/Choice'
import EditableChoice from './EditableChoice'

interface Props {
    choices: IChoice[]
    removeHandler: (target: number) => void
}

const ChoiceList: React.FC<Props> = ({choices, removeHandler}) => {
    return (
        <div className="pt-2 grid grid-cols-1 gap-2">
            {
                choices.map((choice: IChoice, index: number) => 
                    <EditableChoice
                        key={index}
                        choice={choice}
                        onRemove={() => removeHandler(index)}
                    />
                )
            }
        </div>
    )
}

export default ChoiceList
