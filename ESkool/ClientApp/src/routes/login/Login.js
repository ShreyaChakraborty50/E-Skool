import './Login.css';
import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import InputField from '../../components/inputfield/InputField';
/*importing images*/
import teacher_login_img from '../../images/teacher_login_img.jpg';
import student_login_img from '../../images/student_login_img.jpg';
import email_icon from '../../images/email_login_icon.png';
import password_icon from '../../images/password_login_icon.png';
import axios from "axios";
import SessionStoreContext from "../../store/SessionStoreContext";
import Home from "../home/Home";
import Classes from "../classes/Classes";

function emailValidation(email) {
  const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailValidationRegex.test(String(email).toLowerCase());
}

function passwordValidation(password) {
  if (password.length > 5) return true;
  else return false;
}

function Login() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [user, setUser] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState('');
  const [isPasswordValid, setPasswordValid] = useState('');
  
  const {userSession, setUserSession} = useContext(SessionStoreContext);
  useEffect(() => {
      setUserSession(localStorage.getItem('userSession'))
  })
  function submitButton() {
    let body = {
      AccountType: user,
      Email: email,
      Password: password
    }
    axios({
      method: 'post',
      url: 'https://localhost:5000/api/login/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body
    })
        .then(response => {
            axios({
                method: 'get',
                url: `https://localhost:5000/api/register/${email}`
            }).then(res=>{
                const name = res.data;
                localStorage.setItem('userSession', name);
                localStorage.setItem('userSessionEmail', email)
                console.log(response);
                setUserSession(localStorage.getItem('userSession'));
                console.log('Logged in successfully');
                history.push('/classes');
                console.log(res.data)
            });
          
        })
        .catch(error => {
          console.log(error);
          console.log('hello');
          alert('Wrong Email or Password!');
        })
    
  }
  if (localStorage.getItem('userSession') !== '') {
    history.push('/classes')
      return <Classes />
  }
  else {
    return (
        <div className='container-login'>
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
                <img src={teacher_login_img} className='teacher-icon'/>
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
                <img src={student_login_img} className='student-icon'/>
              </div>
            </div>
            <div className='hello-text'>
              {user !== '' && <h4>Hello, {user}!</h4>}
              <p>Please fill out the form below to get started</p>
            </div>
            <div className='login-form'>
              <div className='email-section'>
                <InputField
                    type='text'
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
              <div className='password-section'>
                <InputField
                    type='password'
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
                    }}
                    isValid={isPasswordValid}
                />
                {isPasswordValid === false && (
                    <span className='password-error-message'>
                *Password should contain at least 6 characters
              </span>
                )}
              </div>
              <div className='forget-password'>
                <a href='#'>Forget your password?</a>
              </div>
              <div className='register-login'>

                <button
                    disabled={user === '' || isEmailValid===false || isPasswordValid === false}
                    className={
                      user !== '' && isEmailValid === true && isPasswordValid === true
                          ? 'login-button'
                          : 'login-button-disabled'
                    }
                    onClick={submitButton}
                >
                  Login
                </button>
                <p>
                  No Account? <a href='/register'>Sign Up Now!</a>
                </p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Login;
