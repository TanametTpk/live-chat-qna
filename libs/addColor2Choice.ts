import IChoice from "../interfaces/Choice"

const colors: string[] = [
    "rgba(52, 211, 153, 1)",
    "rgba(96, 165, 250, 1)",
    "rgba(248, 113, 113, 1)"
]

const addColor2Choice = (choices: IChoice[]) => {
    return choices.map((choice: IChoice, index: number) => {
      let MAX_COLOR: number = colors.length
      if (choice.percent > 0 && index < MAX_COLOR) {
        let color: string = colors[index % MAX_COLOR]
        choice["color"] = color
      }
      return choice
    })
}

export default addColor2Choice