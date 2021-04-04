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

    hideToggle() {
        this.setHide(!this.isHide)
    }

    getHide(){
        return this.isHide
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

        return allTitles.map((title) => {
            let choice = this.choices[title]
            let percent = 0
            if (totalVote > 0) percent = choice.voteCount / totalVote * 100
            return {
                ...choice,
                percent: 10
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

module.exports = QuestionManager