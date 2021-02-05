import React, {useState, useEffect} from 'react'

import Header from './Header';
import { Container,Card,Button,Spinner } from 'react-bootstrap';


import FileUpload from '../Services/fileUpload';

export default function ListFile() {
    const [data, setData] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(()=>{
        FileUpload.listFiles()
        .then((response)=>{
            setDataLoaded(true)
            setData(response.data.message)
            
        })
        .catch((err)=>{
            alert(err)
        })
    },[])
    return (
        <div>
            <Header />
            <Container style={{marginTop:'20px'}}>
                {!dataLoaded && <Spinner animation="grow"/>}
                {data && data.map(dat=>( 
            <Card className="text-center" bg="dark" text="light" style={{marginBottom:'20px'}}>
            <Card.Body>
                <Card.Title>{dat.friendlyName}</Card.Title>
                <Card.Text>
                    <p><strong>FileType: </strong>{dat.fileType}
                    <strong>   FileSize: </strong>{dat.size/1024}kb</p>
                </Card.Text>
                <Button 
                variant="primary"  
                onClick={(e) => {
                    e.preventDefault();
                    window.open(`${dat.publicUrl}`);
                    }}
                    >
                Open</Button>
            </Card.Body>
            <Card.Footer className="text-muted"><strong>Created At:</strong>{dat.CreatedAt}</Card.Footer>
            </Card>
                ))}
            </Container>
        </div>
    )
}
