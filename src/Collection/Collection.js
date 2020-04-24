import React, {Component} from 'react';
import axios from 'axios';
import SubmitUpdate from './SubmitUpdate';
import auth0Client from '../Auth/Auth';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: null
    };

    this.submitUpdate = this.submitUpdate.bind(this);
  }

  async componentDidMount() {
    await this.refreshCollection();
  }

  async refreshCollection() {
    console.log('this.props: ', this.props);
    /*const { match: { params } } = this.props;
    const collection = (await axios.get(`http://localhost:8081/${params.collectionId}`)).data;
    this.setState({
      collection
    });*/
  }

  async submitUpdate(update){
    await axios.post(`http://localhost:8081/update/${this.state.collection.id}`, {
      update,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshCollection();
  }

  render() {
    const {collection} = this.state;

    if (collection === null) return <p>Loading... </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{collection.firstname}</h1>
            <p className="lead">{collection.surname}</p>
            <hr className="my-4" />
            <SubmitUpdate collectionId={collection.id} submitUpdate={this.submitUpdate} />
            <p>Notes</p>
            {
              collection.notes.map((note, idx) => (
                <p className="lead" key={idx}>{note}</p>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Collection;
