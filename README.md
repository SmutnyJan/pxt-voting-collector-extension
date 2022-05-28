# Hlasování

## Namespace
```
server
```
## Popis
Rozšíření poskytuje rozhraní pro sběr hlasů a simulace hlasování.
 
## Metody
#### Zobraz výsledky
```
function showResults(): void
```
- Zobrazí dosavadní výsledky hlasování
- Bez parametrů
- Bez návratové hodnoty

#### Spusť nové hlasování
```
function newVoting(): void
```
- Spustí nové hlasování a smaže uložená data
- Bez parametrů
- Bez návratové hodnoty

#### Zaznamenej hlas %vote se seriovým číslem %serialNumber
```
function addVote(vote: string, serialNumber: number): void
```
- Zaznamená nový hlas
- Parametry:
    - hlas (text)
    - seriové číslo (číslo)
- Bez návratové hodnoty
 
#### Získej odpovědi
```
function currentAnswers(): string[]
```
- Vrátí pole se zaznamenanými odpověďmi (například pokud dostaneme pole ["A", "A", "B", "D"], znamená to, že máme celkem 4 hlasy: 2 × A, 1 × B, 0 × C, 1 × D)
- Návratová hodnota: odpovědi (pole textů)



## Příklady

### Hlasovač

#### Bloky

![Příklad hlasovače](https://github.com/microbit-cz/pxt-voting-collector-extension/blob/master/images/voterexample.png)

#### Kód

```
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
    basic.showString("A")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("C")
    basic.showString("C")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
    basic.showString("B")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("D")
    basic.showString("D")
})
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
basic.forever(function () {
	
})
```

Demo  [https://github.com/microbit-cz/pxt-voting-voter-demo](https://github.com/microbit-cz/pxt-voting-voter-demo)

### Hlasování se zobrazením výsledků za pomocí metody z rozšíření

#### Bloky
![Jednoduchý příklad](https://github.com/microbit-cz/pxt-voting-collector-extension/blob/master/images/easyexample.png)

#### Kód
```
input.onButtonPressed(Button.A, function () {
    server.showResults()
})
radio.onReceivedString(function (receivedString) {
    server.addVote(receivedString, radio.receivedPacket(RadioPacketProperty.SerialNumber))
})
input.onButtonPressed(Button.B, function () {
    server.newVoting()
})
radio.setGroup(1)
```

Demo  [https://github.com/microbit-cz/pxt-voting-collector-demo-easy](https://github.com/microbit-cz/pxt-voting-collector-demo-easy)

### Hlasování se zobrazením výsledků za pomocí pole z rozšíření

#### Bloky
![Těžší příklad](https://github.com/microbit-cz/pxt-voting-collector-extension/blob/master/images/hardexample.png)


#### Kód
```
input.onButtonPressed(Button.A, function () {
    odpovedi = server.currentAnswers()
    pocetD = 0
    pocetC = 0
    pocetB = 0
    pocetA = 0
    for (let hodnota of odpovedi) {
        if (hodnota == "A") {
            pocetA += 1
        } else if (hodnota == "B") {
            pocetB += 1
        } else if (hodnota == "C") {
            pocetC += 1
        } else if (hodnota == "D") {
            pocetD += 1
        }
    }
    basic.showString("A" + pocetA)
    basic.showString("B" + pocetB)
    basic.showString("C" + pocetC)
    basic.showString("D" + pocetD)
})
radio.onReceivedString(function (receivedString) {
    server.addVote(receivedString, radio.receivedPacket(RadioPacketProperty.SerialNumber))
})
input.onButtonPressed(Button.B, function () {
    server.newVoting()
})
let pocetA = 0
let pocetB = 0
let pocetC = 0
let pocetD = 0
let odpovedi: string[] = []
radio.setGroup(1)
```
Demo  [https://github.com/microbit-cz/pxt-voting-collector-demo-hard](https://github.com/microbit-cz/pxt-voting-collector-demo-hard)

#### Metadata (slouží k vyhledávání, vykreslování)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
