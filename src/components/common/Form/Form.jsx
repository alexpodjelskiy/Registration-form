import React from "react";

import { genderOptions } from "../../constans";

import { CheckboxGroup } from "../Checkbox";
import { ModalPortal } from "../Modal";
import { ErrorBoundary } from "../ErrorBoundary";

import { FormCtx } from "./formCtx";

import styles from "./form.module.css";

export class Form extends React.Component {
  state = {
    login: "",
    password: "",
    gender: "Male",
    isSpamAllowed: true,
    isChecked: true,
    isModalVisible: false,
    isFormValid: false,
  };

  loginChangeHandler = ({ target }) => {
    this.setState({
      login: target.value,
    });
  };

  passwordCangeHandler = ({ target }) => {
    this.setState({
      password: target.value,
    });
  };

  toggleSpamStatus = ({ target }) => {
    if (target.type === "checkbox") {
      this.setState({
        isSpamAllowed: !this.state.isSpamAllowed,
      });
    }
  };

  changeGenderHandler = ({ target }) => {
    if (this.state.gender === "Male") {
      this.setState((prevState) => ({
        gender: "Female",
        isChecked: !prevState.isChecked,
      }));
    } else {
      this.setState((prevState) => ({
        gender: "Male",
        isChecked: !prevState.isChecked,
      }));
    }
  };

  modalOpenHandler = () => {
    const { login, password } = this.state;
    if (login.length > 4 && password.length > 4) {
      this.setState({
        isModalVisible: true,
      });
    } else {
      this.setState({
        isFormValid: true,
      });
    }
  };

  modalCloseHandler = () => {
    this.setState({
      isModalVisible: false,
      isFormValid: false,
    });
  };

  render() {
    const {
      login,
      password,
      isSpamAllowed,
      isModalVisible,
      isChecked,
      isFormValid,
    } = this.state;

    return (
      <FormCtx.Provider value={this.state}>
        <ErrorBoundary>
          <div className={styles.main}>
            <div className={styles.circle}>
              <div className={styles.container}>
                <form
                  className={styles.form}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <h2 className={styles.title}>Регистрация аккаунта</h2>
                  <div className={styles.div}>
                    <input
                      value={login.trim()}
                      onChange={this.loginChangeHandler}
                      type="text"
                      placeholder="Введитe логин"
                    />
                    {login.length < 5 && isFormValid && (
                      <span className={styles.notice}>
                        Минимальная длина поля должна составлять не менее 5
                        символов
                      </span>
                    )}
                  </div>
                  <div className={styles.div}>
                    <input
                      value={password.trim()}
                      onChange={this.passwordCangeHandler}
                      type="password"
                      placeholder="Введитe пароль"
                    />
                    {password.length < 5 && isFormValid && (
                      <span className={styles.notice}>
                        Минимальная длина поля должна составлять не менее 5
                        символов
                      </span>
                    )}
                  </div>
                  <CheckboxGroup
                    options={genderOptions}
                    value={isChecked}
                    checked={isChecked}
                    onChange={this.changeGenderHandler}
                  />
                  <div>
                    <input
                      type="checkbox"
                      checked={isSpamAllowed}
                      onChange={this.toggleSpamStatus}
                      name="checkbox"
                    />
                    <label htmlFor="checkbox">
                      Я согласен на бесконечный спам
                    </label>
                  </div>
                  <button
                    onClick={this.modalOpenHandler}
                    className={styles.button}
                  >
                    Зарегистрироваться
                  </button>
                  {isModalVisible && (
                    <ModalPortal onClose={this.modalCloseHandler} />
                  )}
                </form>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </FormCtx.Provider>
    );
  }
}
