import React from 'react'

interface Props {
    className?: string
}

const Card: React.FC<Props> = ({ className = "", children }) => {
    return (
        <div className={"bg-white p-6 rounded-md shadow-md " + className}>
            {children}
        </div>
    )
}

export default Card
