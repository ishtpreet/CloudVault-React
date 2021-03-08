import React, { useState, useEffect, useRef } from 'react';
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

    const hiddenFileInput = useRef(null);
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

            setIsLoading(true)
            const data = new FormData()
            data.append('input_files',file)
            FileUpload.fileUpload(data)
            .then((response)=>{
                // document.getElementById("fileUpload").value = "";
                setShow(true);
                setIsLoading(false)
                // alert(response.data);
                // alert(response.data.msg)
                setFile('')
            })
            .catch((err)=>{
                // document.getElementById("fileUpload").value = "";
                setIsLoading(false)
                alert(err)
            })
            
    }
    const onFileUpload = ()=>{
        hiddenFileInput.current.click()
       
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
            {/* <input id="fileUpload" type="file" onChange={onFileChange}/>
          <Button disabled={!file || isLoading} onClick={onFileUpload}><MdFileUpload/>{isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}Upload File</Button> */}
        <Button onClick={onFileUpload}><MdFileUpload/>{isLoading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}Upload File</Button>
        <input id="fileUpload" type="file" onChange={onFileChange} style={{display:"none"}} ref={hiddenFileInput}/>
        <br />{file ? <p> File Name: {file.name}</p>: null}
        </Container>
        </Container>
        </>
    )
}
