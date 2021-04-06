import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Jumbotron, Button, Alert, Modal } from 'react-bootstrap';
import { MdFileUpload, MdFolder, MdCreateNewFolder } from "react-icons/md";
import {useFormik} from 'formik';

import Header from './Header';
import AuthService from '../Services/authService';
import authHeader from '../Services/authHeader';
import FileUpload from '../Services/fileUpload';
import FolderService from '../Services/folderService';
import ListFolders from './ListFolders';

export default function Dashboard() {
    const [user, setUser] = useState({})
    const [file,setFile] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [folderSpinner, setFolderSpinner] = useState(false)
    const [show, setShow] = useState(false)
    const [showFolderModal, setShowFolderModal] = useState(false)
    const [folders, setFolders] = useState()

    let history = useHistory();
    if(!localStorage.getItem('user')){
        history.push('/login')
    }
    // Folder Modal Form
    const validate = values =>{
        const errors = {}
        if(!values.folderName){
            errors.folderName = 'Required'
        }
        // else if(values.folderName.length <= 5 ){
        //     errors.folderName = 'folderName must be at least 6 characters.'
        // }
        return errors;
    }
  
    const formik = useFormik({
      initialValues: {
        folderName: '',
      },
      validate,
      onSubmit: values => {
          setFolderSpinner(true)
          FolderService.createFolder(values.folderName)
          .then((res)=>{
              getFolders();
              values.folderName = '';
            setShowFolderModal(false)
             setFolderSpinner(false)
            //   console.log(res.data)
          })
          .catch((err)=>{
          setFolderSpinner(false)
              console.log(err);
          })
      }
    });
    const handleClose = () => setShowFolderModal(false);
    const handleShow = () => setShowFolderModal(true);
    const hiddenFileInput = useRef(null);
    const getFolders = () =>{
        FolderService.listFolders()
        .then((res)=>{
            setFolders(res.data.message)
            // console.log(res.data.message)
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    useEffect(()=>{
        let AuthHeader = authHeader()
        AuthService.getCurrentUser(AuthHeader)
        .then(response=>{
            getFolders();
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
        // hiddenFileInput.current.click()
        setIsLoading(true)
        const data = new FormData()
        data.append('input_files',file)
        FileUpload.fileUpload(data)
        .then((response)=>{
            document.getElementById("fileUpload").value = "";
            setShow(true);
            setIsLoading(false)
            // alert(response.data);
            // alert(response.data.msg)
            setFile('')
        })
        .catch((err)=>{
            document.getElementById("fileUpload").value = "";
            setIsLoading(false)
            alert(err)
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
        {/* <Button onClick={onFileUpload}><MdFileUpload/>{isLoading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}Upload File</Button>
        <input id="fileUpload" type="file" onChange={onFileChange} style={{display:"none"}} ref={hiddenFileInput}/>
        <br />{file ? <p> File Name: {file.name}</p>: null} */}
        </Container>
           <Button onClick={handleShow}><MdCreateNewFolder />Create Folder</Button>
        {/* Folder Modal */}
        <Modal show={showFolderModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Name of the Folder</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
        <div className="group__input">
        <input type="text" id="folderName" name="folderName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.folderName} placeholder="Folder Name"/>
                                {formik.touched.folderName && formik.errors.folderName ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.folderName}</div> : null}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
          {folderSpinner && (
              <span className="spinner-border spinner-border-sm"></span>
              )}
            Create Folder
          </Button>
        </Modal.Footer>
              </form>
      </Modal>
      <div style={{marginTop:'1%'}} />
        {/* Folder Modal Ends */}
        <ListFolders folders={folders} /> 
        </Container>
        </>
    )
}
