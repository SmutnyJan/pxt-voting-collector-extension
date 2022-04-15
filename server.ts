//% weight=100 color=#3bccc0 icon="\uf233" block="Server"
namespace server {
    let aCount = 0
    let bCount = 0
    let cCount = 0
    let dCount = 0
    let serialNumbers: number[] = []
    let answers: string[] = []


    /**
    * Zobrazí dosavadní výsledky hlasování
    */
    //% block="Zobraz výsledky"

    export function showResults(): void {
        aCount = 0
        bCount = 0
        cCount = 0
        dCount = 0

        for (let item of answers) {
            countOccurrences(item)
        }
        basic.showString("A " + aCount)
        basic.showString("B " + bCount)
        basic.showString("C " + cCount)
        basic.showString("D " + dCount)
    }

    /**
    * Spustí nové hlasování a smaže uložená data
    */
    //% block="Spusť nové hlasování"

    export function newVoting(): void {
        answers = []
        serialNumbers = []
        aCount = 0
        bCount = 0
        cCount = 0
        dCount = 0
    }

    /**
    * Zaznamená nový hlas
    * @vote Hlas k zaznamenání
    * @serialNumber Sériové číslo odesílatele
    */
    //% block="Zaznamenej hlas %vote se seriovým číslem %serialNumber"

    export function addVote(vote: string, serialNumber: number): void {
        if (serialNumber == 0) {
            return
        }

        vote = toUpperCase(vote)
        let contains = false
        for (let number of serialNumbers) {
            if (number == serialNumber) {
                contains = true
            }
        }
        if (contains == false) {
            answers.push(vote)
            serialNumbers.push(serialNumber)
        }
    }

    /**
    * Vrátí pole odpovědí
    */
    //% block="Získej odpovědi"

    export function currentAnswers(): string[] {
        return answers
    }


    function countOccurrences(text: string) {
        switch (text.toLowerCase()) {
            case "a":
                aCount++
                break
            case "b":
                bCount++
                break
            case "c":
                cCount++
                break
            case "d":
                dCount++
                break
        }
    }

    function toUpperCase(text: string): string {
        switch (text) {
            case "a":
                return "A"
                break
            case "b":
                return "B"
                break
            case "c":
                return "C"
                break
            case "d":
                return "D"
                break
            default:
                return text
        }
    }
}