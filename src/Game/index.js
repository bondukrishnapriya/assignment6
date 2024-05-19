import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import Buttons from '../Buttons'

import GameResultView from '../GameResultView'

import 'reactjs-popup/dist/index.css'

import {
  MainContainer,
  ScoreContainer,
  ItemsContainer,
  Heading,
  ScoreCardContainer,
  ParagraphScore,
  ScoreSpan,
  ItemsImagesContainer,
  PopUpContainer,
  PopUpButton,
  RulesImageContainer,
  RulesImage,
  CloseLineButton,
  CloseLineContainer,
} from './styledComponents'

class Game extends Component {
  state = {
    showResult: false,
    myChoice: {},
    opponentChoice: {},
    score: 0,
    resultMessage: '',
  }

  onClickPlayAgain = () => this.setState({showResult: false})

  onGetResult = () => {
    const {myChoice, opponentChoice, resultMessage} = this.state

    return (
      <GameResultView
        myChoice={myChoice}
        opponentChoice={opponentChoice}
        resultMessage={resultMessage}
        PlayAgain={this.onClickPlayAgain}
      />
    )
  }

  onGetButtonId = (id, imageUrl) => {
    const {choicesList} = this.state
    const number = Math.floor(Math.random() * choicesList.length)
    if (choicesList[number].id === 'ROCK' && id === 'SCISSORS') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'SCISSORS' && id === 'ROCK') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score + 1,
        resultMessage: 'YOU WON',
      }))
    } else if (choicesList[number].id === 'ROCK' && id === 'PAPER') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],

        opponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'SCISSORS' && id === 'PAPER') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'PAPER' && id === 'SCISSORS') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score + 1,
        resultMessage: 'YOU WON',
      }))
    } else if (choicesList[number].id === 'PAPER' && id === 'ROCK') {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else {
      this.setState(prevState => ({
        showResult: true,
        myChoice: [id, imageUrl],
        opponentChoice: choicesList[number],
        score: prevState.score,
        resultMessage: 'IT IS DRAW',
      }))
    }
  }

  onGetImages = () => {
    const {choicesList} = this.props
    return (
      <ItemsImagesContainer>
        {choicesList.map(eachChoice => (
          <Buttons
            key={eachChoice.id}
            buttonDetails={eachChoice}
            onGetId={this.onGetButtonId}
          />
        ))}
      </ItemsImagesContainer>
    )
  }

  render() {
    const {showResult, score} = this.state
    return (
      <MainContainer>
        <ScoreContainer>
          <ItemsContainer>
            <Heading>
              ROCK <br /> PAPER <br /> SCISSORS <br />
            </Heading>
          </ItemsContainer>
          <ScoreCardContainer>
            <ParagraphScore>Score</ParagraphScore>
            <ScoreSpan>{score}</ScoreSpan>
          </ScoreCardContainer>
        </ScoreContainer>
        {showResult ? this.onGetResult() : this.onGetImages()}
        <PopUpContainer>
          <Popup modal trigger={<PopUpButton type="button">Rules</PopUpButton>}>
            {close => (
              <RulesImageContainer>
                <CloseLineContainer>
                  <CloseLineButton type="button" onClick={() => close()}>
                    <RiCloseLine />
                  </CloseLineButton>
                </CloseLineContainer>
                <RulesImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                  alt="rules"
                />
              </RulesImageContainer>
            )}
          </Popup>
        </PopUpContainer>
      </MainContainer>
    )
  }
}
export default Game
