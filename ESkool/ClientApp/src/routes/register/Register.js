import './Register.css';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import InputField from '../../components/inputfield/InputField';
/*importing images*/
import teacher_login_img from '../../images/teacher_login_img.jpg';
import student_login_img from '../../images/student_login_img.jpg';
import email_icon from '../../images/email_login_icon.png';
import password_icon from '../../images/password_login_icon.png';
import confirm_password_icon from '../../images/confirm_password.png';
import axios from "axios";

function emailValidation(email) {
  const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailValidationRegex.test(String(email).toLowerCase());
}

function passwordValidation(password) {
  return password.length > 5;
}

function nameValidation(name) {
  return name.length > 3;
}

function passwordMatchedValidation(password, confirm_password) {
  return password === confirm_password;
}

function institutionValidation(institution) {
  return institution.length > 3;
}

function Register() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState('');
  const [isPasswordValid, setPasswordValid] = useState('');
  const [isPasswordMatched, setPasswordMatched] = useState('');
  const [isNameValid, setNameValid] = useState('');
  const [isInstitutionValid, setInstitutionValid] = useState('');
  function submitButton() {
      console.log(email, password);
      const encodedPassword = new Buffer(password).toString('base64');
      let body = {
          AccountType: user,
          Name: name,
          Email: email,
          Institution: institution,
          Password: encodedPassword,
      }
      axios({
          method: 'post',
          url: 'https://localhost:5000/api/register',
          headers: {
              'Content-Type': 'application/json'
          },
          data: body
      })
      
          .then((response) => {
              console.log(response);
              axios({
                  method: 'post',
                  url: 'https://localhost:5000/api/login',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: {
                      AccountType: user,
                      Email: email,
                      Password: password,
                      Classes: []
                  }
              })
                  .then(res => {
                      console.log(res);
                      console.log('hello world!!');
                  })
              console.log("Redirecting to login...");
              history.push('/login');
              
          })
          .catch(error => {
              alert("Email is already registered!! Try Login");
              console.log(error);
          })
      
      
  }
  return (
    <div className='container-register'>
      <div className='header'>
        <div className='header-text'>
          <h2>Choose Account</h2>
        </div>
        <div className='choose-account-icon'>
          <div
            className={
              user === 'Teacher'
                ? 'teacher-icon-container-selected'
                : 'teacher-icon-container'
            }
            onClick={() => {
              console.log('Teacher');
              setUser('Teacher');
            }}
          >
            <img src={teacher_login_img} className='teacher-icon' />
          </div>
          <div
            className={
              user === 'Student'
                ? 'student-icon-container-selected'
                : 'student-icon-container'
            }
            onClick={() => {
              console.log('Student');
              setUser('Student');
            }}
          >
            <img src={student_login_img} className='student-icon' />
          </div>
        </div>
        <div className='hello-text'>
          {user !== '' && <h4>Hello, {user}!</h4>}
          <p className="form-fill-out-text">Please fill out the form below to get started</p>
        </div>
        <div className='login-form'>
          <div className='name-section'>
            <InputField
              icon={email_icon}
              placeholder='Enter your Full Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameValidation(e.target.value)) {
                  setNameValid(true);
                } else {
                  setNameValid(false);
                }
                console.log(isNameValid);
              }}
              isValid={isNameValid}
            />
            {isNameValid === false && (
              <span className='name-error-message'>
                *Full Name cannot be empty
              </span>
            )}
          </div>
          <div className='email-section'>
            <InputField
              icon={email_icon}
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailValidation(e.target.value)) {
                  setEmailValid(true);
                } else {
                  setEmailValid(false);
                }
                console.log(isEmailValid);
              }}
              isValid={isEmailValid}
            />
            {isEmailValid === false && (
              <span className='email-error-message'>*Provide Valid Email</span>
            )}
          </div>
          <div className='institution-section'>
            <InputField
              icon={email_icon}
              placeholder='Name of your Institution'
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
                if (institutionValidation(e.target.value)) {
                  setInstitutionValid(true);
                } else {
                  setInstitutionValid(false);
                }
                console.log(isInstitutionValid);
              }}
              isValid={isInstitutionValid}
            />
            {isInstitutionValid === false && (
              <span className='institution-error-message'>
                *Institution can not be empty
              </span>
            )}
          </div>
          <div className='password-section'>
            <InputField
              type="password"
              icon={password_icon}
              placeholder='Enter your Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordValidation(e.target.value)) {
                  setPasswordValid(true);
                } else {
                  setPasswordValid(false);
                }
                if (passwordMatchedValidation(e.target.value, confirm_password)) {
                    setPasswordMatched(true);
                } else {
                    setPasswordMatched(false);
                }
              }}
              isValid={isPasswordValid}
            />
            {isPasswordValid === false && (
              <span className='password-error-message'>
                *Password should contain at least 6 characters
              </span>
            )}
          </div>
          <div className='confirm-password-section'>
            <InputField 
              type="password"
              icon={confirm_password_icon}
              placeholder='Confirm Password'
              value={confirm_password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordMatchedValidation(password, e.target.value)) {
                  setPasswordMatched(true);
                } else {
                  setPasswordMatched(false);
                }
              }}
              isValid={isPasswordMatched}
            />
            {isPasswordMatched === false && (
              <span className='confirm-password-error-message'>
                *Passwords don't match
              </span>
            )}
          </div>
          <div className='register-login'>
            <button
              disabled={user === '' || isEmailValid === false || isPasswordMatched === false || isPasswordValid === false || isInstitutionValid === false}
              className={
                user !== '' && isEmailValid === true && isPasswordValid === true && isPasswordMatched === true && isInstitutionValid === true
                  ? 'signup-button'
                  : 'signup-button-disabled'
              }
              onClick={submitButton}
            >
              SignUp
            </button>
          </div>
          <p>
            Already have an account? <a href='/login'>Login Now!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
