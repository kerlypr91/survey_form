import React from 'react'
import { FormData } from './data'
import './Form.scss'

export default class Form extends React.Component {
  //   left = 37
  // up = 38
  // right = 39
  //   down = 40

  typesOfAnswered = {
    valid: 'valid',
    invalid: 'invalid',
    unanswered: 'unanswered'
  }

  constructor(props) {
    super(props)

    this.lastStep = FormData.steps.length
    const fieldKeys = FormData.steps.map((item) => item.fieldId)
    const stateModel = fieldKeys.reduce(
      (a, b) => (
        (a = { ...a, [b]: '', [`${b}Valid`]: this.typesOfAnswered.unanswered }),
        a
      ),
      {}
    )

    this.state = {
      step: 0, //this means intro
      ...stateModel
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyBoardPress)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.step !== this.state.step) {
      // if (this.state.step === 1) {
      //   const stepElement = this[`step_container_1`]

      //   if (stepElement) {
      //     stepElement.classList.add('fadeIn')
      //     return
      //   }
      // }

      if (this.state.step > this.lastStep) {
        this.outroElement.classList.add('fadeIn')

        console.log('responses', this.state)
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

    // when step 1 is already activated, then enable arrow keycode detect

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
    const stepInfo = FormData.steps.find((item) => item.id === step)
    const { id, question, typeAnswer, options, labels, fieldId } = stepInfo
    const { [fieldId]: value } = this.state

    if (
      (typeAnswer === 'multipleChoice' && value.length === 0) ||
      (typeAnswer !== 'multipleChoice' && !value)
    ) {
      this.setState({
        [`${fieldId}Valid`]: this.typesOfAnswered.invalid
      })

      return
    }

    const newStep = step + 1
    const stepElement = this[`step_container_${step}`]

    if (stepElement) {
      stepElement.classList.add('fadeSlideOut')
    }

    setTimeout(() => {
      this.setState({
        step: newStep,
        [`${fieldId}Valid`]: this.typesOfAnswered.valid
      })
    }, 300)
  }

  handleTextInputChange = (stateKey) => (event) => {
    this.setState({
      [stateKey]: event.target.value,
      [`${stateKey}Valid`]: event.target.value
        ? this.typesOfAnswered.valid
        : this.typesOfAnswered.unanswered
    })
  }

  handleScaleChange = (stateKey, value) => () => {
    this[`scale_option_${stateKey}_${value}`].classList.add('blink')

    setTimeout(() => {
      this.setState(
        {
          [stateKey]: value,
          [`${stateKey}Valid`]: this.typesOfAnswered.valid
        },
        () => {
          this.handleNextStep()
        }
      )
    }, 300)
  }

  handleChoiceListChange = (stateKey, value, typeChoice) => () => {
    let { [stateKey]: newValue } = this.state
    let validValue

    if (typeChoice === 'oneChoice') {
      newValue = value
      validValue = this.typesOfAnswered.valid
    } else {
      if (!newValue) {
        newValue = []
      }

      if (newValue.includes(value)) {
        newValue = newValue.filter((item) => item !== value)
      } else {
        newValue.push(value)
      }

      validValue =
        newValue.length > 0
          ? this.typesOfAnswered.valid
          : this.typesOfAnswered.unanswered
    }

    this[`choice_option_${stateKey}_${value}`].classList.add('blink')

    setTimeout(() => {
      this.setState(
        {
          [stateKey]: newValue,
          [`${stateKey}Valid`]: validValue
        },
        () => {
          if (typeChoice === 'multipleChoice') {
            return
          }

          this.handleNextStep()
        }
      )
    }, 300)
  }

  handleChoiceListMouseOver = (fieldId, bulletValue) => () => {
    this[
      `choice_bullet_${fieldId}_${bulletValue}`
    ].innerHTML = `key ${bulletValue}`
    this[`choice_bullet_${fieldId}_${bulletValue}`].classList.add('hover')
  }

  handleChoiceListMouseLeave = (fieldId, bulletValue) => () => {
    this[`choice_bullet_${fieldId}_${bulletValue}`].innerHTML = bulletValue
    this[`choice_bullet_${fieldId}_${bulletValue}`].classList.remove('hover')
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

  renderAnswer = (stepInfo) => {
    const { id, question, typeAnswer, options, labels, fieldId } = stepInfo
    const { [fieldId]: value } = this.state

    if (['text', 'number'].includes(typeAnswer)) {
      return (
        <input
          type={typeAnswer}
          placeholder='Type your answer here'
          autoFocus
          value={value}
          onChange={this.handleTextInputChange(fieldId)}
        />
      )
    }

    if (typeAnswer === 'scale') {
      return (
        <div className='scale'>
          <div className='options'>
            {options.map((item) => {
              const activeClass = value === item ? 'selected ' : ''

              return (
                <div
                  className={`option ${activeClass}`}
                  ref={(element) => {
                    this[`scale_option_${fieldId}_${item}`] = element
                  }}
                  key={`scale_option_${fieldId}_${item}`}
                  onClick={this.handleScaleChange(fieldId, item)}>
                  {item}
                </div>
              )
            })}
          </div>
          <div className='labels'>
            {labels.map((item) => (
              <div className='label' key={`scale_label_${fieldId}_${item}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (['multipleChoice', 'oneChoice'].includes(typeAnswer)) {
      const bulletArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

      return (
        <div className='choice-list'>
          {typeAnswer === 'multipleChoice' ? (
            <div className='legend'>Choose as many as you like</div>
          ) : null}
          {options.map((item, index) => {
            const activeClass =
              typeAnswer === 'multipleChoice'
                ? value.includes(item)
                  ? 'selected'
                  : ''
                : value === item
                ? 'selected'
                : ''

            const isSelected = activeClass === 'selected'

            return (
              <div
                className={`choice ${activeClass}`}
                ref={(element) => {
                  this[`choice_option_${fieldId}_${item}`] = element
                }}
                key={`choice_option_${fieldId}_${item}`}
                onMouseOver={this.handleChoiceListMouseOver(
                  fieldId,
                  bulletArray[index]
                )}
                onMouseLeave={this.handleChoiceListMouseLeave(
                  fieldId,
                  bulletArray[index]
                )}
                onClick={this.handleChoiceListChange(
                  fieldId,
                  item,
                  typeAnswer
                )}>
                <div className='bullet_container'>
                  <div
                    className='bullet'
                    ref={(element) => {
                      this[
                        `choice_bullet_${fieldId}_${bulletArray[index]}`
                      ] = element
                    }}>
                    {bulletArray[index]}
                  </div>
                </div>

                <div className='text'>{item}</div>
                {isSelected ? <div className='check'></div> : null}
              </div>
            )
          })}
        </div>
      )
    }

    return null
  }

  renderRequiredContainer = (stepInfo) => {
    const { displaySubmit, required, fieldId, typeAnswer } = stepInfo
    const { [`${fieldId}Valid`]: validValue } = this.state

    if (!required) {
      return null
    }

    let hiddenClass = ''

    if (validValue !== this.typesOfAnswered.invalid) {
      return null
      // hiddenClass = 'hidden'
    }

    return (
      <div className={`required_container ${hiddenClass}`}>
        Please fill this in
      </div>
    )
  }

  renderSubmitButton = (stepInfo) => {
    const { displaySubmit, required, fieldId, typeAnswer } = stepInfo
    const { [fieldId]: value } = this.state

    if (!displaySubmit) {
      return null
    }

    let hiddenClass = ''

    if (
      (required && !value && typeAnswer !== 'multipleChoice') ||
      (required && value.length === 0 && typeAnswer === 'multipleChoice')
    ) {
      hiddenClass = 'hidden'
    }

    return (
      <div className={`submit_container ${hiddenClass}`}>
        <button onClick={this.handleNextStep}>
          OK <div className='check'></div>
        </button>
        <span>
          press <b>ENTER</b>
        </span>
      </div>
    )
  }

  renderStep = () => {
    const { step } = this.state
    const stepInfo = FormData.steps.find((item) => item.id === step)
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
          <div className='question'>{question(this.state)}</div>
        </div>
        <div className='answer'>{this.renderAnswer(stepInfo)}</div>
        {this.renderRequiredContainer(stepInfo)}
        {this.renderSubmitButton(stepInfo)}
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
