import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container,Row,Jumbotron,Button,Alert } from 'react-bootstrap';
import { MdFileUpload } from "react-icons/md";

import Header from './Header';
import AuthService from '../Services/authService';
import authHeader from '../Services/authHeader';
import FileUpload from '../Services/fileUpload';

export default function Dashboard() {
    const [user, setUser] = useState({})
    const [file,setFile] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    let history = useHistory();
    if(!localStorage.getItem('user')){
        history.push('/login')
    }
    useEffect(()=>{
        let AuthHeader = authHeader()
        AuthService.getCurrentUser(AuthHeader)
        .then(response=>{
            setUser(response.data.message)
            console.log(response.data.message);
        })
        .catch(()=>{
            history.push('/login')
        })

    },user)
    const onFileChange = (e)=>{
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }
    const onFileUpload = ()=>{
        setIsLoading(true)
        const data = new FormData()
        data.append('input_files',file)
        FileUpload.fileUpload(data)
        .then((response)=>{
            document.getElementById("fileUpload").value = "";
            setShow(true);
            setIsLoading(false)
            // alert(response.data.msg)
            setFile('')
        })
        .catch(()=>{
            document.getElementById("fileUpload").value = "";
            setIsLoading(false)
            alert('error')
        })
    }
    return (
        <>
        <Header />
        <Container fluid>
            {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>File Uploaded Successfully</Alert.Heading>
      </Alert>}
        
        <Jumbotron fluid>
        <Container>
            <h1>Welcome {user.name}</h1>
            <h6>{user.uuid}&nbsp;</h6>
            {/* <p>
                Start uploading file/folder
            </p> */}
        </Container>
        </Jumbotron>
        <Container>
            <h1>Upload File</h1>
            <input id="fileUpload" type="file" onChange={onFileChange}/>
          <Button disabled={!file || isLoading} onClick={onFileUpload}><MdFileUpload/>{isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}Upload File</Button>
        </Container>
        </Container>
        </>
    )
}
