import React, {Component} from "react";
import "./hangOut.css";
import { randomWord } from "./Words";
import img0 from "../src/img0.jpg";
import img1 from "../src/img1.jpg";
import img2 from "../src/img2.jpg";
import img3 from "../src/img3.jpg";
import img4 from "../src/img4.jpg";
import img5 from "../src/img5.jpg";
import img6 from "../src/img6.jpg";


class HandMan extends Component {
    static defaultProps = {
        maxWrong: 6,
         images:  [img0, img1, img2, img3, img4, img5, img6]
    };

    constructor(props){
        super(props)
        this.state = {nWrong: 0, guessed: new Set(), answer:randomWord()};
        this.handleGuess = this.handleGuess.bind(this)
        this.reset = this.reset.bind(this);
    }


    reset(){
        this.setState({
            nWrong:0,
        guessed:new Set(),
        answer:randomWord()
        });
    }

    guessedWord(){   
return this.state.answer
.split("")
.map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    } 

    handleGuess(evt){
        let ltr = evt.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr)? 0: 1)
        }))
    }

    generateButtons(){
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
    <button
    key={ltr}
    value={ltr} 
    onClick={this.handleGuess}
    disabled={this.state.guessed.has(ltr)}>
        {ltr}
    </button>
        ));
    }
    render(){
        const gameOver = this.state.nWrong >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
        let gameState = this.generateButtons();
        if(isWinner) gameState = "You win!";
        if(gameOver) gameState = "You Lose!";
        return(
            <div className="hangman">
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrong]} alt={altText} />
                <p>Guessed Wrong: {this.state.nWrong}</p>
                <p className="hangman-word">{!gameOver ? this.guessedWord() : this.state.answer}</p>
            <p className="hangman-btns">{gameState}</p>
                <button id="reset" onClick={this.reset}>Restart?</button>
            </div>
        );
    }
    
}

export default HandMan;