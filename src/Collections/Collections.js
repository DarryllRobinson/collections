import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: null,
    };
  }

  async componentDidMount() {
    const collections = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      collections,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.collections === null && <p>Loading collection records...</p>}
          {
            this.state.collections && this.state.collections.map(collection => (
              <div key={collection.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/collection/${collection.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Notes: {collection.notes}</div>
                    <div className="card-body">
                      <h4 className="card-title">{collection.firstname}</h4>
                      <p className="card-text">{collection.surname}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Collections;
