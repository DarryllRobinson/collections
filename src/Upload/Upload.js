import React, {Component} from 'react';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,

      }

  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }

  onClickHandler = () => {
   const data = new FormData();
   data.append('file', this.state.selectedFile);
   axios.post("http://localhost:8081/upload", data, {
      // receive two    parameter endpoint url ,form data
  })
  .then(res => { // then print response status
    this.setState({
      loaded: 1
    })
 })
}

  render() {
    return (
      <div className="container">
        <label>Upload your file</label>
        <input type="file" name="file" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>
          Upload
        </button>
        {this.state.loaded === 1 && <p>Uploaded successfully</p>}
      </div>
    )
  }
}

export default Upload;
