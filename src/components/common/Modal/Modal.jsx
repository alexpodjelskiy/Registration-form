import React from "react";
import ReactDOM from "react-dom"
import styles from "./modal.module.css";

export const ModalWindow = ({ onClose, login, password, gender, spam }) => {
  return(
    <div className={styles.modal}>
      <div className={styles.dialog}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Вы успешно зарегистрировались!
            </h2>
            <button
              className={styles.close}
              onClick={() => onClose()}>

            </button>
          </div>
          <div className={styles.body}>
            <h3>Ваши данные:</h3>
            <p>Логин: {login}</p>
            <p>Пароль: {password}</p>
            <p>Пол: {gender === 'Male' ? 'Мужской' : 'Женский'}</p>
            <p>
              {spam ? (
                'Вы подписались на рассылку спама'
                ) : 'Вы отказались от рассылки спама'
              }
            </p>
            <button
            className={styles.button}
            onClick={() => onClose()}>
              Закрыть
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.body = document.querySelector('body');
    this.el = document.createElement('div');
    this.onClose = this.props.onClose;
  }

  componentDidMount() {
    this.body.appendChild(this.el);
    this.body.addEventListener ('keydown', this.escapeKeyHandler)
  }

  componentWillUnmount () {
    this.body.removeEventListener ('keydown', this.escapeKeyHandler)
    this.body.removeChild(this.el);
  }

  escapeKeyHandler = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }

  render () {
    return (
      ReactDOM.createPortal(this.props.children, this.el)
    )
  }
}


