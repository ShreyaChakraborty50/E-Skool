import './classinformation.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function ClassInformation() {
    const {id} = useParams();
    console.log(id);
    const [className, setClassName] = useState('');
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://localhost:5000/api/classes/${id}`
        }).then(res => {
            console.log(res.data);
            console.log(res.data.className);
            setClassName(res.data.className);
        })
    }, [])
    return (<div className="info-container">
        <h2 className="className-text-header">{className}</h2>
        <h3 className="classId-text-header">Class Code: {id}</h3>
    </div>);
}

export default ClassInformation;