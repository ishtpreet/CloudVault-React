import React, {useState, useEffect, useRef} from 'react'
import { Container, Button } from 'react-bootstrap';
import { MdFolder} from "react-icons/md";
import { useHistory } from 'react-router';
import FolderService from '../Services/folderService';

export default function ListFolders({folders}) {
    // console.log(folders)
    let history = useHistory()
    const onFolderClick = (e) =>{
        e.preventDefault();
        console.log(e.target.id);
        history.push("/folder/"+e.target.id);

    }
    return (
        <div>
            {folders && folders.map((e)=>(
             <Button  style={{marginRight: '12px'}} id={e.name} onClick={onFolderClick}> <MdFolder />   {e.friendlyName}   </Button>))}
           
            {/* {folders} */}
        </div>
    )
}
