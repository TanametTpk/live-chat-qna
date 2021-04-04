import React from 'react'

interface Props {
    title: string
}

const AdminSection: React.FC<Props> = ({title, children}) => {
    return (
        <div className="p-4 flex flex-col space-y-4">
            <h2
                className="text-white text-3xl"
            >
                {title}
            </h2>
            {children}
        </div>
    )
}

export default AdminSection
