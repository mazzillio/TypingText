import React, { useEffect, useState } from "react";
import lista_palavras from './resources/words.json'
const max_typed=30
const getPalavra=()=>{
    const index=Math.floor(Math.random()*lista_palavras.length)
    const palavra =lista_palavras[index]
    return palavra.toLowerCase();
}
const valido=(k,w)=>{
    if(!w) return false
    const re=w.split('').includes(k)
    return re
}
const Word=(props)=>{
    if(!props.word)return null
    const juntaChaves=props.validKeys.join('');
    const matched=props.word.slice(0,juntaChaves.length)
    const remainder=props.word.slice(juntaChaves.length)
    return(
        <>
            <span className="matched">{matched}</span>
           <span className="remainder">{remainder}</span>
        </>
    )
}
const App=()=>{
    const [typedKeys,setTypedKeys]=useState([])
    const [validKeys,setValidKeys]=useState([])
    const [competedWords,setCompletedWors]=useState([])
    const [word,setWord]=useState('')
    const handleKeyDown=(e)=>{
        e.preventDefault();
        const {key}=e
        setTypedKeys((prev)=>{
            return [...prev,key].slice(-1*max_typed)
        })
        if(valido(key,word)){
            setValidKeys((prev)=>{
                const tamValido=prev.length<=word.length
                const proximoCarac=tamValido && word[prev.length]===key
                return proximoCarac?[...prev,key]:prev
            })
        }
    }
    useEffect(()=>{
        setWord(getPalavra())
    },[])
    useEffect(()=>{
        const palavra=validKeys.join('').toLowerCase()
        if(word && palavra === word)
        {
            let novaPalavra=null;
            do{
                novaPalavra=getPalavra()
            }while(competedWords.includes(novaPalavra))

            setWord(novaPalavra)
            setValidKeys([])
            setCompletedWors((prev)=>[...prev,word])
        }
    },[word,validKeys,competedWords])
    return (
    
    <div className="container" tabIndex ="0" onKeyDown={handleKeyDown}>
       <div className="valid-keys">
        <Word  word={word} validKeys={validKeys}/>
       </div>
       <div className="typed-keys">{typedKeys?typedKeys.join(' '):null}</div> 
       <div className="completed-words-keys">
           <ol>
               {
                   competedWords.map((word)=>{
                       return(<li key={word}>{word}</li>)
                   })
               }
               
           </ol>
       </div>
    </div>
    )
}
export default App;