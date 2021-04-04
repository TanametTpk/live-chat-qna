import { Button } from 'antd'
import React from 'react'
import { ButtonPanel } from '../interfaces/ControlPanel'

interface Props {
    buttons: ButtonPanel[]
}

const ControlPanel: React.FC<Props> = ({buttons}) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {
                buttons.map((button: ButtonPanel, index: number) => (
                    <Button
                        key={index}
                        style={{height:"100%"}}
                        onClick={button.action}
                    >
                        {button.text}
                    </Button>
                ))
            }
        </div>
    )
}

export default ControlPanel
