import React, {useEffect, useState} from 'react'
import {Container, Row, Card, Button} from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';
import { FaFolderOpen } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import Header from './Header';
import FileUpload from '../Services/fileUpload';

// export default function FolderItems({files, folderName}) {
export default function FolderItems({match}) {

    const [token, setToken] = useState();
    const [files, setFiles] = useState();
    const [folderName, setFolderName] = useState() 
    const [isEmptyFolder, setIsEmptyFolder] = useState(true)

    let history = useHistory();
    // const RedirectToDashboard = () =>{
    //     history.push("/dashboard");
    // }

useEffect(()=>{
    setToken(match.params.folderId);
    if(!match.params.folderId)
    history.push("/dashboard");
    FileUpload.listFiles(match.params.folderId)
    .then((res)=>{
        if(res.data.message == "Empty!")
            // history.push("/dashboard")
            setIsEmptyFolder(false)
        setFiles(res.data.message)
        // console.log(res.data.message);
    })
    .catch((err)=>{
        console.log(err)
            history.push("/dashboard")
    })
    // FileUpload.listFiles()


},[])
    return (
        <div>
             <Header /> 
        <Container fluid style={{marginTop:'1%'}}>
        <Row>
            <Link to="/dashboard"><MdArrowBack size={36}/>Back</Link>
        </Row>
        <Row style={{marginLeft:'1%', marginTop: '1%', marginBottom: '1%'}} >
        <FaFolderOpen size={24}/>&nbsp; {token}
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
