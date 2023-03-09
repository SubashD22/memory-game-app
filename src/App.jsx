import { Button } from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useState } from "react"
import Block from "./components/Block"

const App = () => {
  const colors = [
    {
      src: "#ffb480",
      matched: false,
      id: 1
    },
    {
      src: "#ff6961",
      matched: false,
      id: 2
    },
    {
      src: "#f8f38d",
      matched: false,
      id: 3
    },
    {
      src: "#42d6a4",
      matched: false,
      id: 4
    },
    {
      src: "#08cad1",
      matched: false,
      id: 5
    },
    {
      src: "#59adf6",
      matched: false,
      id: 6
    },
    {
      src: "#9d94ff",
      matched: false,
      id: 7
    },
    {
      src: "#c780e8",
      matched: false,
      id: 8
    },
    {
      src: "#ffb480",
      matched: false,
      id: 9
    },
    {
      src: "#f8f38d",
      matched: false,
      id: 10
    },
    {
      src: "#42d6a4",
      matched: false,
      id: 11
    },
    {
      src: "#08cad1",
      matched: false,
      id: 12
    },
    {
      src: "#ff6961",
      matched: false,
      id: 13
    },
    {
      src: "#59adf6",
      matched: false,
      id: 14
    },
    {
      src: "#9d94ff",
      matched: false,
      id: 15
    },
    {
      src: "#c780e8",
      matched: false,
      id: 16
    }]
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matched, setMatched] = useState(0)
  const shuffle = () => {
    const shuffledcard = colors.sort(() => Math.random() - 0.5);
    setCards(shuffledcard);
    setTurns(0);
    setMatched(0);
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(p => p + 1);
    setDisabled(false)
  }
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        console.log('matched')
        setCards(prev => {
          return prev.map(c => {
            if (c.src === choiceOne.src) {
              return { ...c, matched: true }
            } else return c
          })
        })
        setMatched((p) => p + 1)
        resetTurn()
      } else {
        console.log('not match')
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])
  useLayoutEffect(() => { shuffle() }, []);
  return (
    < main>
      <Button onClick={shuffle}>New Game</Button>
      <h2> No of Turns : {turns}</h2>
      <h2>Matched: {matched}/8</h2>
      {matched === 8 ? <h1>YOU WON</h1> : <></>}
      <div className="blocks">
        {cards?.map((color, i) => <Block
          key={i}
          color={color}
          handleChoice={handleChoice}
          open={color.id === choiceOne?.id || color.id === choiceTwo?.id || color.matched}
          disabled={disabled}
        />)}
      </div>
    </main >
  )
}

export default App