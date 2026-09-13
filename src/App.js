import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [numbers, setNumbers] = useState([])
  const [input, setInput] = useState("")
  const [round,setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("")
  const [correct,setCorrect] = useState("")
  const [showNumbers, setShowNumbers] = useState(true);
  const [answered, setAnswered] = useState(false)

  const generateNumbers = () => {
    const newNumbers = []

    for (let i = 0; i < 5; i++){
      newNumbers.push(Math.floor(Math.random() * 10))
    }

    setNumbers(newNumbers)
    setShowNumbers(true)
  }

  const checkAnswer = () => {

    if (input.trim() === "") {
    setCorrect("Please enter a number");
    return;
    }

    if (round === 3 && message) {
    setRound(1);
    setScore(0);
    setInput("");
    setCorrect("");
    setMessage("");
    setAnswered(false);
    return;
    }

    if (answered) return;

    setAnswered(true);

    const correctAnswer = numbers.join("")

    let newScore = score;

    if(input === correctAnswer){
      newScore = score + 1;
      setScore(newScore)
      setCorrect("Correct")
    } else {
      setCorrect("Incorrect")
    }

    if (round === 3){

      if(newScore  === 3 ){
      setMessage("Shocking")
    } else if (newScore  === 2){
      setMessage("Use this brain to figure out the world")
    } else if (newScore  === 1){
      setMessage("It was your choice")
    } else {
      setMessage("May be next time")
    }
    setNumbers([]);
    setInput("");
    } else {
      setRound(round + 1);
      setInput("");
      setAnswered(false);
    }
  }

  
  useEffect(() =>{
    generateNumbers()
    const timer = setTimeout(() => {
      setShowNumbers(false);
    }, 3000);

    return () => clearTimeout(timer)
  },[round])

  
  return (
  <>
  <div>
   <div className="flex h-40 flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl font-bold">
        Memory Card Game
      </h1>
      <p className="mt-3"> Round {round}/3</p>
      <div className='mt-4 border px-4 text-3xl shadow-md flex gap-5'>
          { showNumbers ? (
              numbers.map((num,index) => (
                <p key={index}>{num}</p>
              ))) : (
              <p>?????</p>
            )
          }
      </div>
    </div>
    <div className='flex items-center justify-center' >
      <input value={input} onChange={(e) => {
        setInput(e.target.value)
      }} type='text' inputMode='numeric' disabled={answered} placeholder='Enter the Number' className='p-4' maxLength={5} />
    </div>
    </div>
    <div className='flex items-center justify-center'>
    <button
  disabled={answered && !(round === 3 && message)}
  onClick={checkAnswer}
  className="bg-green-200 p-2 rounded disabled:bg-gray-300"
  >
  {round === 3 && message ? "Restart Game" : "Check Answer"}
</button>
    </div>
    <div className="flex flex-col items-center justify-center gap-2">
  <div className={correct === "Correct" ? "text-green-600" : "text-red-600"} >{correct}

  </div>
  <div className="text-xl font-bold">
    Score: {score}/3
  </div>
  {message && (
  <div className="text-xl font-bold">
    {message}
  </div>
  )}
</div>
    </>
  );
}

export default App;
