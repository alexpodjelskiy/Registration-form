import React from "react";
import ReactDOM from "react-dom";

import { FormCtx } from '../Form/formCtx'

import styles from "./modal.module.css";


export class ModalWindow extends React.Component {
  static contextType = FormCtx;
  
  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.dialog}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>Вы успешно зарегистрировались!</h2>
              <button
                className={styles.close}
                onClick={() => this.props.onClose()}
              ></button>
            </div>
            <div className={styles.body}>
              <h3>Ваши данные:</h3>
              <p>Логин: {this.context.login}</p>
              <p>Пароль: {this.context.password}</p>
              <p>Пол: {this.context.gender === "Male" ? "Мужской" : "Женский"}</p>
              <p>
                {this.context.isSpamAllowed
                  ? "Вы подписались на рассылку спама"
                  : "Вы отказались от рассылки спама"}
              </p>
              <button className={styles.button} onClick={() => this.props.onClose()}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ModalPortal extends React.Component {

  componentDidMount() {
    const body = document.querySelector("body");
    body.addEventListener("keydown", this.escapeKeyHandler);
  }

  componentWillUnmount() {
    const body = document.querySelector("body");
    body.removeEventListener("keydown", this.escapeKeyHandler);
  }

  escapeKeyHandler = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const body = document.querySelector("body");
    return ReactDOM.createPortal(<ModalWindow onClose={this.props.onClose} />, body);
  }
}
