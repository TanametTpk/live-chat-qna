import IChoice from "./Choice";

export default interface IQuestion {
    title: string
    choices: IChoice[]
    isHide: boolean
}