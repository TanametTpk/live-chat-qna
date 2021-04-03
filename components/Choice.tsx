import React from 'react'
import IChoice from '../interfaces/Choice'

const Choice: React.FC<IChoice> = ({title, percent, voteCount, color}) => {
    return (
        <div
            className="bg-white p-4 grid grid-cols-1 gap-2 rounded-md shadow-md border-2"
            style={{borderColor: color}}
        >
            <h4 className="font-semibold text-lg flex justify-between">
                <div>
                    {title}
                </div>
                <div>
                    {percent.toFixed(1)}%
                </div>
            </h4>
            <div className="bg-gray-200 min-w-full h-1.5 rounded-full">
                <div
                    className="h-full bg-gray-800 rounded-full transform duration-300"
                    style={{
                        width:`${percent}%`,
                        backgroundColor: color
                    }}
                />
            </div>
            <p className="text-sm font-semibold text-gray-400">
                {voteCount} Votes
            </p>
        </div>
    )
}

export default Choice
