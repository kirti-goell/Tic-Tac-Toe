import React, { useState } from 'react'
import './board.css'

export default function Board() {
    let [mark1,setMark1] = useState(0);
    let [mark2,setMark2] = useState(0);
    let [name1,setName1] = useState("First Player(Zero)");
    let [name2,setName2] = useState("Second Player(Cross)");
    let [turn,setTurn] = useState(name1);
    let [player1,setplayer1] = useState(true);
    let [arr,setarr] = useState(['0','0','0','0','0','0','0','0','0'])
    function checkWinner(board) {
        const winningCombinations = [
            [0, 1, 2], // Row 1
            [3, 4, 5], // Row 2
            [6, 7, 8], // Row 3
            [0, 3, 6], // Column 1
            [1, 4, 7], // Column 2
            [2, 5, 8], // Column 3
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== '0' && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (!board.includes('0')) {
            return 'Draw';
        }
        return 'ok';
    }
    const resetGame = () => {
        setarr(['0', '0', '0', '0', '0', '0', '0', '0', '0'])
        setplayer1(true);
        setTurn(name1);
        for(let i = 0 ; i < 9 ; i++){
            document.getElementById(i).src = "https://raw.githubusercontent.com/Mridul-lucifer/TIC-TAC-TOE/refs/heads/main/src/pics/bg.jpg";
            document.getElementById(i).style.border = "solid 1px white"
        }
        document.getElementById("Swipe").disabled = false;
        document.getElementById("Swipe").style.opacity = 1;
    };
    const swipe = function(){
        if(player1){
            setplayer1(false);
            setTurn(name2);
        }else{
            setplayer1(true);
            setTurn(name1);
        }
    }
    const reload = function(){
        window.location.reload();
    }
    // let player1 = true;
    var handleClick = function(id){
        var int_id = id-'0';
        document.getElementById("Swipe").disabled = true;
        document.getElementById("Swipe").style.opacity = 0.5;
        const a = document.getElementById(id);
        if(player1 === true && arr[int_id]==='0'){
            setplayer1(false);
            setTurn(name2);
            arr[int_id] = 'O';
            a.src = "https://raw.githubusercontent.com/Mridul-lucifer/TIC-TAC-TOE/refs/heads/main/src/pics/O_symbol.png";
            a.alt = "O"
        }else if(arr[int_id]==='0'){
            setplayer1(true);
            setTurn(name1);
            arr[int_id] = 'X';
            a.src = "https://raw.githubusercontent.com/Mridul-lucifer/TIC-TAC-TOE/refs/heads/main/src/X_Symbol.png";
            a.alt = "X"
        }
        console.log(arr)
        var value = checkWinner(arr)
        console.log(value)
        if(value==='Draw'){
            setTimeout(() => {
                alert('Draw');
                resetGame();
            }, 700)
        }else if(value ==='O'){
            setTimeout(() => {
                alert(name1+' wins')
                setMark1(mark1+1);
                resetGame();
            }, 500)
        }else if(value ==='X'){
            setTimeout(() => {
                alert(name2+' wins')
                setMark2(mark2+1);
                resetGame();
            }, 500)
        }
    }

  return (
    <div>
      <div className='board'>
        <h1>TIC TAC TOE</h1>
        <div className='form'>
            <form >
                <input onChange={(event)=>{
                    setName1(event.target.value);
                    setTurn(event.target.value);
                }}placeholder ="First Player"></input>
                <span>{mark1}</span>
                <input onChange={(event)=>{
                    setName2(event.target.value);
                }} placeholder='Second Player'></input>
                <span>{mark2}</span>
            </form>

        </div>
        <h2>TURN : {turn}</h2>
        <table border='1' className='board-table'>
            <tr>
                <td onClick={()=>{handleClick('0')}} className="outerCont">
                    <img id='0' alt=""></img>
                </td>
                <td onClick={()=>{handleClick('1')}} className="outerCont">
                    <img id ="1"  alt="" />
                </td>
                <td onClick={()=>{handleClick('2')}} className="outerCont">
                    <img id ="2" alt="" />
                </td>
            </tr>
            <tr>
                <td onClick={()=>{handleClick('3')}} className="outerCont">
                    <img id ="3" alt="" />
                </td>
                <td onClick={()=>{handleClick('4')}} className="outerCont">
                    <img id ="4" alt="" />
                </td>
                <td onClick={()=>{handleClick('5')}} className="outerCont">
                    <img id ="5" alt="" />
                </td>
            </tr>
            <tr>
                <td onClick={()=>{handleClick('6')}} className="outerCont">
                    <img id ="6" alt="" />
                </td>
                <td onClick={()=>{handleClick('7')}} className="outerCont">
                    <img id ="7" alt="" />
                </td>
                <td onClick={()=>{handleClick('8')}} className="outerCont">
                    <img id ="8" alt="" />
                </td>
            </tr>
            
            
        </table>
        <div className="table1" >
        <tr>
                <td>
                <button id="Swipe" onClick={swipe}>SWIPE</button>
                </td>
                <td>
                <button onClick={resetGame}>RESET</button>
                </td>
                <td>
                <button onClick={reload}>REFRESH</button>
                </td>
            </tr>
        </div>
      </div>
    </div>
  )
}
