import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import positive from './img/positive.svg'
import negative from './img/negative.svg'
import neutral from './img/neutral.svg'
import useDebounce from './useDebounce'

type Sentiment = 1 | 0 | -1;

function Emoji({ sentiment }: { sentiment: Sentiment }) {
  if (sentiment === 1) {
    return <img src={positive} className="emoji" />
  }
  if (sentiment === 0) {
    return <img src={neutral} className="emoji" />
  }
  return <img src={negative} className="emoji" />

}

function App() {
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment>(0);

  const debounceComment = useDebounce(comment, 500)

  useEffect(() => {
    async function fetchSentiment(comment: string) {
      const result = await axios
        .post("http://localhost:4000/api/sentiment", {
          data: comment,
        })
        .then((res) => res.data);
      setSentiment(result.sentiment);
    }
    if (debounceComment) {
      fetchSentiment(debounceComment);
    }
  }, [debounceComment]);

  return (
    <div className="App">
      <h1>hello</h1>
      <textarea placeholder='what do you think?'
        value={comment} onChange={(e) => setComment(e.target.value)} />
      <Emoji sentiment={sentiment} />
    </div>
  )
}

export default App
