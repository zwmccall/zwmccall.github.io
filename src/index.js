import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import words from './words'
import answers from './answers'

const numOfFields = 5;
const numOfRows = 6;
const answer = answers[getRandomInt(2080)];
console.log(answer);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const handleChange = e => {
  const { maxLength, value, name } = e.target;
  const [fieldName, fieldIndex] = name.split("-");
  const [rowName, rowIndex] = e.target.parentElement.getAttribute("name").split("-");

  // Check if they hit the max character length
  if (value.length >= maxLength) {
    // Check if it's not the last input field
    if (parseInt(fieldIndex, 10) < (numOfFields * rowIndex) - 1) {
      // Get the next input field
      const nextSibling = document.querySelector(
        `input[name=item-${parseInt(fieldIndex, 10) + 1}]`
      );

      // If found, focus the next field
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    } else {
        if(e.key === 'Enter'){
          var input = '';
          for(var i = 0; i < numOfFields; i++){
            const nextSibling = document.querySelector(
                `input[name=item-${parseInt(fieldIndex-4, 10) + i}]`
            );
            input += nextSibling.value;
          }
          if(words[input.toLowerCase()]){
            for(var i = 0; i < numOfFields; i++){
              const nextSibling = document.querySelector(
                  `input[name=item-${parseInt(fieldIndex-4, 10) + i}]`
              );
              if(answer.includes(input.at(i))){
                nextSibling.classList.add("yellow-square");
              }
              if(input.at(i) == answer.at(i)){
                nextSibling.classList.remove("yellow-square");
                nextSibling.classList.add("green-square");
              }
            }
            if(input == answer){
              alert("Congrats you won!")
            }
            else if (parseInt(rowIndex, 10) < numOfRows) {
              const nextRow = document.querySelector(
                `input[name=item-${parseInt(fieldIndex, 10) + 1}]`
              );
              if (nextRow !== null) {
                for(var i = 1; i < 6; i++){
                  const nextSibling = document.querySelector(
                      `input[name=item-${parseInt(fieldIndex, 10) + i}]`
                  );
                  nextSibling.classList.remove("inactive-square");
                  nextSibling.removeAttribute("disabled");
                }
                nextRow.focus();
              }
            } else {
              alert("Sorry you did not win, the correct answer was: " + answer);
              window.location.reload(false);
            }
          }
        }
    }
  } else {
    if(e.key === 'Backspace'){
        if (parseInt(fieldIndex, 10) > ((rowIndex-1)*5)) {
          // Get the next input field
          const prevSibling = document.querySelector(
            `input[name=item-${parseInt(fieldIndex, 10) - 1}]`
          );
    
          // If found, focus the next field
          if (prevSibling !== null) {
            prevSibling.focus();
          }
        }
    }
  }
}

class Square extends React.Component {
    render() {
      return (
        <input maxLength="1" onKeyDown={handleChange} name={`item-${ this.props.value }`} className={`square ${this.props.value > 4 ? "inactive-square" : ""}`} disabled={this.props.value > 4}>
          {/* TODO */}
        </input>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i}/>;
    }
  
    render() {
      const status = 'Welcome to Wordle Clone';
      
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row" name="row-1">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </div>
          <div className="board-row" name="row-2">
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row" name="row-3">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
          </div>
          <div className="board-row" name="row-4">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div className="board-row" name="row-5">
            {this.renderSquare(20)}
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
          </div>
          <div className="board-row" name="row-6">
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
            {this.renderSquare(28)}
            {this.renderSquare(29)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  