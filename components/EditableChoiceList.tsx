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
                    <div className="hover:scale-105 transition duration-300 transform">
                        <Choice key={index} {...choice} />
                    </div>
                )
            }
        </div>
    )
}

export default ChoiceList
