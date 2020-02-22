import React from 'react'
import { FormData } from './data'
import './Form.scss'

export default class Form extends React.Component {
  state = {
    step: 0 //this means intro
  }

  //   left = 37
  // up = 38
  // right = 39
  //   down = 40

  constructor(props) {
    super(props)

    this.lastStep = FormData.steps.length
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyBoardPress)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.step !== this.state.step) {
      if (this.state.step === 1) {
        const stepElement = this[`step_container_1`]

        if (stepElement) {
          stepElement.classList.add('fadeIn')
          return
        }
      }

      if (this.state.step > this.lastStep) {
        this.outroElement.classList.add('fadeIn')
        return
      }

      const stepElement = this[`step_container_${this.state.step}`]

      if (stepElement) {
        stepElement.classList.add('fadeSlideIn')
      }
    }
  }

  handleKeyBoardPress = (event) => {
    const { keyCode } = event
    const { step } = this.state

    console.log('keyCode', keyCode)

    // enter
    if (keyCode === 13) {
      if (step === 0) {
        return this.handleGetStartedClick()
      }

      if (step > this.lastStep) {
        return
      }

      return this.handleNextStep()
    }
  }

  handleGetStartedClick = () => {
    if (this.introElement) {
      this.introElement.classList.add('fadeOut')
    }

    setTimeout(() => {
      this.setState({
        step: 1
      })
    }, 300)
  }

  handleNextStep = () => {
    let { step } = this.state
    const newStep = step + 1

    const stepElement = this[`step_container_${step}`]

    if (stepElement) {
      stepElement.classList.add('fadeSlideOut')
    }

    setTimeout(() => {
      this.setState({
        step: newStep
      })
    }, 300)
  }

  renderIntro = () => {
    const { intro } = FormData

    return (
      <div
        className='intro_container'
        ref={(element) => {
          this.introElement = element
        }}>
        <img src='https://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Homer-Simpson-03-Beer-icon.png' />
        <div className='header'>{intro.header}</div>
        <div className='subheader'>{intro.subheader}</div>
        <div className='button_container'>
          <button onClick={this.handleGetStartedClick}>Get Started!</button>
          <span>
            press <b>ENTER</b>
          </span>
        </div>
      </div>
    )
  }

  renderOutro = () => {
    const { outro } = FormData

    return (
      <div
        className='outro_container'
        ref={(element) => {
          this.outroElement = element
        }}>
        <div className='header_container'>
          <img
            src='https://www.freepngimg.com/thumb/artwork/84883-homer-emoticon-bart-area-marge-simpson.png'
            width='50%'
          />
          <div className='header'>{outro.header}</div>
        </div>
        <div className='subheader'>{outro.subheader}</div>
      </div>
    )
  }

  renderStep = () => {
    const { step } = this.state
    const stepInfo = FormData.steps.find((item) => item.id === step)
    console.log('stepInfo', stepInfo)
    const { id, question, typeAnswer, options, labels } = stepInfo

    return (
      <div
        className='question_container'
        key={`question_${id}`}
        ref={(element) => {
          this[`step_container_${id}`] = element
        }}>
        <div className='title'>
          <div className='id'>{id}</div>
          <div className='question'>{question()}</div>
        </div>
        <div className='answer'></div>
      </div>
    )
  }

  renderContent = () => {
    const { step } = this.state

    if (step === 0) {
      return this.renderIntro()
    }

    if (step > this.lastStep) {
      return this.renderOutro()
    }

    return this.renderStep()
  }

  render() {
    return <div className='form_container'>{this.renderContent()}</div>
  }
}
