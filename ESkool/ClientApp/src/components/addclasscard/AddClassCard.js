import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import addicon from '../../images/add.png';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputField from "../inputfield/InputField";
import axios from "axios";
import {nanoid} from 'nanoid';
import SessionStoreContext from "../../store/SessionStoreContext";
import {Place} from "@material-ui/icons";
import useAsyncState from "../../utils/useAsyncState";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root2: {
        minWidth: 275,
        height: 180,
        marginRight: 20,
        marginBottom: 20,
        border: 2,
        borderStyle: "dotted",
        borderColor: "black",
        display: "flex",
        justifyContent: "center",
        paddingTop: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    addimg: {
        width: 70,
        height: 70
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    createbutton : {
        width: 150,
        height: 35,
        background: "#0099ff",
        borderRadius: 5,
        border: 0,
        color: "white"
    },
    inputfield : {
        width: 30,
        paddingLeft: 10,
        outline: 'none',
        border: 0,
        fontSize: 'inherit'
    }
}));

export default function AddClassCard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState('')
    const [classNameInvalid, setClassNameInvalid] = useState(null);
    const [classDescription, setClassDescription] = useState('');
    const {userSession, setUserSession} = useContext(SessionStoreContext);
    const [accountType, setAccountType] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [allClasses, setAllClasses] = useAsyncState([])
    const [classCode, setClassCode] = useState('');
    const email = localStorage.getItem('userSessionEmail');
    const history = useHistory();
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://localhost:5000/api/login/${email}`
        }).then(res => {
            console.log(res.data)
            setAccountType(res.data.accountType);
            setPassword(res.data.password);
            setId(res.data.id);
            setAllClasses(res.data.classes).then()
            console.log(accountType);
        })
    }, [])
    let buttonText = 'Create';
    let placeholderText = 'Class Name';
    if (accountType === 'Student') {
        buttonText = 'Join';
        placeholderText = 'Class Code';
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
        <Card className={classes.root2} onClick={handleOpen}>
            <CardContent>
                {accountType === 'Teacher' && <h4>Create New Class</h4>}
                {accountType === 'Student' && <h4>Join New Class</h4>}
                <img className={classes.addimg} src={addicon} alt="addbutton" />
            </CardContent>
            
        </Card>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <div className={classes.paper}>
                {accountType === 'Teacher' && <h3>Create New Class</h3>}
                {accountType === 'Student' && <h3>Join New Class</h3>}
                <InputField
                    width={100}
                    type='text'
                    placeholder={placeholderText}
                    value={className}
                    onChange={(e) => {
                        setClassCode(e.target.value);
                        setClassName(e.target.value);
                        if (e.target.value === '') {
                            setClassNameInvalid('Class Name should not be empty.');
                        } else {
                            setClassNameInvalid('');
                        }
                    }}
                    isValid={classNameInvalid === ''}/>
                {accountType === 'Teacher' &&
                    <button className={classes.createbutton} disabled={classNameInvalid!==''} onClick={async () => {
                        let code = nanoid(6);
                        const res = await axios({
                            method: 'post',
                            url: 'https://localhost:5000/api/classes',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                ClassId: code,
                                ClassName: className,
                                ClassDescription: classDescription,
                                TeacherEmail: localStorage.getItem('userSessionEmail')
                            }
                        })
                        console.log(res.data);
                        let data1 = allClasses.concat(code);
                        setAllClasses(data1)
                            .then(allClasses =>
                                //console.log(allClasses);
                                axios({
                                    method: 'put',
                                    url: `https://localhost:5000/api/login/${email}`,
                                    data: {
                                        Id: id,
                                        AccountType: accountType,
                                        Email: email,
                                        Password: password,
                                        Classes: allClasses
                                    }
                                }).then(res => {
                                    console.log(res.data);
                                    setClassName('')
                                    setClassCode('')
                                })
                            );
                        history.push(`/classes/${code}`);
                        setOpen(false);
                        setClassName('');
                        setOpen(false);
                    }}>{buttonText}</button>}
                {
                    accountType === 'Student' &&
                    <button className={classes.createbutton} disabled={classNameInvalid!==''} onClick={ async () => {
                        let data1 = allClasses.concat(classCode);
                        setAllClasses(data1)
                            .then(allClasses =>
                                //console.log(allClasses);
                                axios({
                                    method: 'put',
                                    url: `https://localhost:5000/api/login/${email}`,
                                    data: {
                                        Id: id,
                                        AccountType: accountType,
                                        Email: email,
                                        Password: password,
                                        Classes: allClasses
                                    }
                                }).then(res => {
                                    console.log(res.data);
                                    setClassName('')
                                    setClassCode('')
                                })
                            );
                            history.push(`/classes/${classCode}`);
                            setOpen(false);
                    }}>{buttonText}</button>
                }
            </div>
        </Fade>
    </Modal>
        </div>
    );
}

