
class QuestionManager {
    constructor(title, choices, isHide) {
        this.title = title
        this.choices = {}
        this.isHide = isHide
        this.voter = {}

        choices.map((choice) => {
            this.choices = {
                ...this.choices,
                [choice.title]: choice
            }
        })
    }

    isAlreadyVote(name) {
        if (this.voter[name]) return true
        return false
    }

    setHide(isHide) {
        this.isHide = isHide
    }

    vote(title, voterName) {
        if (this.isAlreadyVote(voterName)) return

        if (this.choices[title]) {
            this.choices[title].voteCount += 1
            this.voter[voterName] = true
        }
    }

    clearVote() {
        this.voter = {}
        allTitles = Object.keys(this.choices)
        allTitles.map((title) => {
            this.choices[title].voteCount = 0
        })
    }

    createChoices() {
        let allTitles = Object.keys(this.choices)
        let totalVote = allTitles.reduce((total, title) => {
            return this.choices[title].voteCount + total
        }, 0)

        return this.choices.map((choice) => {
            return {
                ...choice,
                percent: choice.voteCount / totalVote * 100
            }
        })
    }

    getQuestion() {
        return {
            title: this.title,
            choices: this.createChoices(),
            isHide: this.isHide
        }
    }
}