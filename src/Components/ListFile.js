import React, {useState, useEffect} from 'react'
import { Container,Card,Button,Spinner,Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Header from './Header';
import FileUpload from '../Services/fileUpload';

export default function ListFile() {
    let history = useHistory()
    const [data, setData] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(()=>{
        FileUpload.listFiles()
        .then((response)=>{
            setDataLoaded(true)
            if(response.data.message == "Empty!")
                history.push("/dashboard")
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
                <Row>
                    
                {!dataLoaded && <Spinner animation="grow"/>}
                {data && data.map(dat=>( 
                    <Card text="light" bg="dark" style={{ width: '18rem', marginRight: '20px' }}>
            <Card.Img variant="top" src={dat.publicUrl} />
            <Card.Body>
              <Card.Title>{dat.friendlyName}</Card.Title>
              <Card.Text>
                Created At: {dat.CreatedAt}
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
          </Card> 
                ))}
                </Row>
            </Container>
        </div>
    )
}
