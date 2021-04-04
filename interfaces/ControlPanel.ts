import { MouseEventHandler } from "react";

export interface ButtonPanel {
    text: string
    action: MouseEventHandler<HTMLElement>
}