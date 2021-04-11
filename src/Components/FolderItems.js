import React, {useEffect, useState, useRef} from 'react'
import {Container, Row, Card, Button, Col, Alert, Toast} from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';
import { FaFolderOpen } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import Header from './Header';
import FileUpload from '../Services/fileUpload';
import FolderService from '../Services/folderService';

// export default function FolderItems({files, folderName}) {
export default function FolderItems({match}) {

    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState();
    const [files, setFiles] = useState();
    const [file, setFile] = useState()
    const [folderName, setFolderName] = useState('') 
    const [isEmptyFolder, setIsEmptyFolder] = useState(false)
    const [refreshList, setRefreshList] = useState(Math.random())
    const [show, setShow] = useState(false)

    let history = useHistory();
    
    const hiddenFileInput = useRef(null); 
    
useEffect(()=>{
    setToken(match.params.folderId);
    if(!match.params.folderId)
    history.push("/dashboard");
    FileUpload.listFiles(match.params.folderId)
    .then((res)=>{
        if(res.data.message == "Empty!")
            // history.push("/dashboard")
            setIsEmptyFolder(true)
        setFiles(res.data.message)
        // console.log(res.data.message);
    })
    .catch((err)=>{
        console.log(err)
            history.push("/dashboard")
    })
    // FileUpload.listFiles()


},[refreshList])

useEffect(()=>{
    FolderService.folderName(match.params.folderId)
    .then((res)=>{
    //    console.log(res.data.message)
            setFolderName(res.data.message)
    })
    .catch((err)=>{
        console.log(err)
    })

},[])


const onFileChange = (e)=>{
    setFile(e.target.files[0])
    console.log(e.target.files[0])
    setIsLoading(true)
    const data = new FormData()
    data.append('input_files',e.target.files[0])
    FileUpload.fileUpload(data,token)
    .then((response)=>{
        document.getElementById("fileUpload").value = "";
        setIsLoading(false)
        console.log(response);
        // alert(response.data);
        // alert(response.data.msg)
        setFile('')
        setRefreshList(Math.random())
        setShow(true)
    })
    .catch((err)=>{
        document.getElementById("fileUpload").value = "";
        setIsLoading(false)
        alert(err)
    })
        
}

const onFileUpload = ()=>{
    hiddenFileInput.current.click()
   
}


    return (
        <div>
             <Header /> 
        <Container fluid style={{marginTop:'1%'}}>
         {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>File Uploaded Successfully</Alert.Heading>
         </Alert>}
        <Row>
            <Link to="/dashboard"><MdArrowBack size={36}/>Back</Link>
        </Row>
        <Row>
            <input type="file" id="fileUpload" onChange={onFileChange} style={{display: 'none'}} ref={hiddenFileInput} />
            <Col md={{ span: 2, offset: 10 }}><Button onClick={onFileUpload}><MdFileUpload />{isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}Upload File</Button></Col>
        </Row>
        <Row style={{marginLeft:'1%', marginTop: '1%', marginBottom: '1%'}} >
        <FaFolderOpen size={24}/>&nbsp; {folderName}
        </Row>
        <Row style={{marginLeft:'1%'}}>
        {!isEmptyFolder && files && files.map((e)=>(
                
            <Card bg="dark" text="light" style={{ width: '18rem', marginRight: '20px' }}>
            <Card.Img variant="top" src={e.publicUrl} />
            <Card.Body>
              <Card.Title>{e.friendlyName}</Card.Title>
              <Card.Text>
                  FileSize : {Math.floor(e.size/1024)}&nbsp;Kb
                  <br />
                Created At: {e.CreatedAt}
              </Card.Text>
              <Button variant="primary" onClick={(event) => {
                  event.preventDefault();
                  window.open(`${e.publicUrl}`);
                }}>Download</Button>
            </Card.Body>
          </Card>
        ))}
        </Row>
        </Container>
        </div>
    )
}
