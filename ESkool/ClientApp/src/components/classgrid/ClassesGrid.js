import {GridList, GridListTile} from "@material-ui/core";
import ClassCard from "../addclasscard/ClassCard";
import AddClassCard from "../addclasscard/AddClassCard";
import axios from "axios";
import {useEffect, useState} from "react";
import {Class} from "@material-ui/icons";
import useAsyncState from "../../utils/useAsyncState";
const getClassDetails = (classcode) => {
    axios({
        method: 'get',
        url: `https://localhost:5000/api/classes/${classcode}`
    }).then(res => {
        if (res) return res.data;    
    }).catch(error => console.log(error))
    
}
function ClassesGrid() {
    const [isLoading, setIsLoading] = useState(true);
    const email = localStorage.getItem('userSessionEmail');
    const [allClasses, setAllClasses] = useState([]);
    const [classesCode, setClassesCode] = useAsyncState([]);
    const [accountType, setAccountType] = useState('');
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://localhost:5000/api/login/${email}`
        }).then(res => {
            console.log(res.data)
            setAccountType(res.data.accountType);
            setClassesCode(res.data.classes)
                .then(classesCode => 
                    classesCode.map((classcode, index) => {
                    axios({
                        method: 'get',
                        url: `https://localhost:5000/api/classes/${classcode}`
                    }).then(singleClass => {
                        console.log(singleClass.data);
                        setAllClasses(prevState => [...prevState, singleClass.data]);
                    }).catch(error => console.log(error));
                }))
        })
    }, [])
    console.log("All classes", allClasses);
    return (
        allClasses &&
        <GridList cellHeight={160} cols={3}>
            <AddClassCard/>
            {allClasses.map((oneClass, index) => {
                return (
                    oneClass && <ClassCard key = {index} classtitle={oneClass.className} classcode={oneClass.classId} />
                )
            })}
            
        </GridList>
    )

}
export default ClassesGrid;