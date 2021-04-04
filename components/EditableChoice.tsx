import { CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import IChoice from '../interfaces/Choice'
import Choice from './Choice'

interface Props {
    choice: IChoice
    onRemove: Function
}

const EditableChoice: React.FC<Props> = ({choice, onRemove}) => {
    return (
        <div
            className="relative hover:scale-105 transition duration-300 transform hover-trigger"
        >
            <div className="
                    absolute top-0 right-0
                    flex justify-center items-center
                    text-white
                    bg-red-500 border-white border-2 border-solid
                    p-2 rounded-full
                    translate-x-1/2 -translate-y-1/2 transform
                    hover-target cursor-pointer
                "
                onClick={() => onRemove()}
            >
                <CloseOutlined className="block" />
            </div>
            <Choice {...choice} />
        </div>
    )
}

export default EditableChoice
