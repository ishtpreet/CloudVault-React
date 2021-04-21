import React, {useEffect, useState, useRef} from 'react'
import {Container, Row, Card, Button, Col, Alert, CardColumns, Modal} from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';
import { FaFolderOpen } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import {useFormik} from 'formik';
import { isEmail } from 'validator'

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
    const [deleteIsLoading, setDeleteisLoading] = useState(false) 
    const [showFolderModal, setShowFolderModal] = useState(false)
    const [shareSpinner, setShareSpinner] = useState(false)
    const [shareFileName, setShareFileName] = useState('')

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

const deleteFile = (e) =>{
    e.preventDefault()
    setDeleteisLoading(true)
    // document.getElementById(e.target.id).appendChild()
    // console.log(e.target.id)
    document.getElementById(e.target.id).innerHTML = "Deleting..."
    FileUpload.deleteFile(e.target.id)
    .then((res)=>{
        document.getElementById(e.target.id).innerHTML = "Delete"
        setDeleteisLoading(false)
        console.log(res.data.message)
        setRefreshList(Math.random())
    })
    .catch((err)=>{
        setDeleteisLoading(false)
        console.log(err)
    })
   
}

const validate = values =>{
    const errors = {}
    if(!values.email){
        errors.email = 'Required'
    }
    else if(!isEmail(values.email))
    {
        errors.email = "Email entered is Invalid"
    }
    return errors;
}

const formik = useFormik({
  initialValues: {
    email: '',
  },
  validate,
  onSubmit: values => {
      setShareSpinner(true)
    //   console.log(shareFileName,values.email)
      FileUpload.shareFile(shareFileName,values.email)
      .then((res)=>{
          setShareFileName('')
          values.email = '';
        setShowFolderModal(false)
        setShareSpinner(false)
        //   console.log(res.data)
      })
      .catch((err)=>{
        setShareFileName('')
        values.email = '';
        setShareSpinner(false)
          console.log(err);
      })
  }
});
const handleClose = () => setShowFolderModal(false);
const handleShow = () => setShowFolderModal(true);

const onClickShare = (e) =>{
    setShareFileName(e.target.id)
    handleShow();
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
            <CardColumns>
        {!isEmptyFolder && files && files.map((e)=>(
            
            <Card bg="dark" text="light" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={e.publicUrl} style={{ margin: '2%',width: '96%', height: '160px'}}/>
            <Card.Body>
              <Card.Title>{e.friendlyName}</Card.Title>
              <Card.Text>
                  FileSize : {Math.floor(e.size/1024)}&nbsp;Kb
                  <br />
                Created At: {e.CreatedAt}
              </Card.Text>
              <Button variant="primary" size="sm" onClick={(event) => {
                  event.preventDefault();
                  window.open(`${e.publicUrl}`);
                }}>Download</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="danger" id={e._id} onClick={deleteFile}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="info" id={e.name} onClick={onClickShare}>Share</Button>
            </Card.Body>
          </Card>
        ))}
        </CardColumns>
        </Row>


        <Modal show={showFolderModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Recepient Email-ID</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
        <div className="group__input">
        <input type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Recepient Email ID "/>
                                {formik.touched.email && formik.errors.email ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.email}</div> : null}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
          {shareSpinner && (
              <span className="spinner-border spinner-border-sm"></span>
              )}
            Share
          </Button>
        </Modal.Footer>
              </form>
      </Modal>
        </Container>
        </div>
    )
}
