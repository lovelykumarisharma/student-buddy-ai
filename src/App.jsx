
import { useState } from 'react'
import './App.css'
import { API_URL } from './constants';
import Answer from './components/Answers';


function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);


  const payload = {
    "contents": [{ "parts": [{ "text": question }] }]
  };


  const askQuestion = async () => {
    // console.log(question);
    let response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json();
     let dataString = response.candidates[0].content.parts[0].text;
     dataString = dataString.split("* ")
     dataString = dataString.map((item)=>item.trim(item))
    // console.log(response);
    // console.log(response.candidates[0].content.parts[0].text);
    // console.log(response)
    setResult([...result,{type:'q', text:question},{type:'a', text:dataString}]);
    // console.log(dataString);

  }
  console.log(result);

  return (
    <div className='grid grid-cols-5 text-center'>
      <div className='col-span-1 bg-zinc-800 h-screen'>

      </div>

      <div className='col-span-4'>
        <div className='container h-130 p-10 '>
          <div className='text-zinc-400'>
             <ul>
            {
              result.map((item,index)=>(
                item.type== 'q'?  <li key={index+Math.random()} className='text-left '> <Answer ans = {item.text} totalResult={1} index={index} /></li>:
                item.text.map((ansItem, ansIndex)=>(
                  <li key={index+Math.random()} className='text-left '> <Answer ans = {ansItem} totalResult={item.length} index={ansIndex} /></li>
                
                ))
              ))
            }
            </ul>
         { /*  <ul>
            {result}
            {
              result && result.map((item, index)=>(
                <li key={index+Math.random()} className='text-left '> <Answer ans = {item} totalResult={result.length} index={index} /></li>
                
              ))
            }
            </ul> */}
           
          </div>


        </div>

        <div className='bg-zinc-800 w-1/2 p-1 h-16 pr-5 text-white m-auto rounded-3xl border-zinc-700 border flex'>
          <input type="text" value={question} onChange={(Event) => setQuestion(Event.target.value)} className='w-full h-full p-4 outline-none' placeholder='Ask me anything' />
          <button onClick={askQuestion}>ASK</button>
        </div>

      </div>

    </div>
  )
}

export default App
