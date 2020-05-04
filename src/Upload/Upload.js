import React, {Component} from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        loaded: 0,
        targetTable: ''
      }

  }

  onChangeHandler = event => {
    let files = event.target.files;
    let fileName = event.target.name;
    if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkMimeType(event)) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        targetTable: fileName
      });
    }
  }

  checkMimeType = (event) => {
    let files = event.target.files;
    //console.log('file type: ', files);
    let err = [];
    const types = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/gif'
    ];
      for(let x = 0; x < files.length; x++) {
          /*if (types.every(type => files[x].type !== type)) {
          err[x] = files[x].type+' is not a supported format\n';
         // assign message to array
       }*/
      };
      for(var z = 0; z<err.length; z++) { // loop create toast massage
          event.target.value = null
          toast.error(err[z])
      }
     return true;
  }
  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 15000;
    let err = "";
    for(var x = 0; x<files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type+'is too large, please pick a smaller file\n';
      }
    };
    if (err !== '') {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  }

  onClickHandler = () => {
   const data = new FormData()
   if (this.state.selectedFile) {
     for(let x = 0; x<this.state.selectedFile.length; x++) {
       data.append('file', this.state.selectedFile[x])
     }

     axios.post(`http://localhost:8081/upload/${this.state.targetTable}`, data, {
       onUploadProgress: ProgressEvent => {
         this.setState({
           loaded: (ProgressEvent.loaded / ProgressEvent.total*100)
         })
       },
     })
     .then(res => {
       toast.success('Upload successful')
     })
     .catch(err => {
       toast.error('Upload failed')
     });
   } else {
     toast.error('Please select a file to be uploaded');
   }
 }

 maxSelectFile = (event) => {
   let files = event.target.files;
   if (files.length > 3) {
     const msg = 'Only 3 files can be uploaded at a time';
     event.target.value = null; // discard selected file
     console.log(msg);
     return false;
   }
   return true;
 }

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <ToastContainer />
        </div>
        <label>Upload your case file</label>
        <input type="file" name="cases" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-primary" onClick={this.onClickHandler}>
          Upload
        </button>
        <div className="form-group">
          <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        </div>

        <label>Upload your ticket file</label>
        <input type="file" name="ticketssql" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-primary" onClick={this.onClickHandler}>
          Upload
        </button>
        <div className="form-group">
          <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        </div>
      </div>
    )
  }
}

export default Upload;
