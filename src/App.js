import React, { Component } from "react";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Axios from "axios";

class App extends Component {
  state = {
    authors: [],
    currentAuthor: null,
    filteredAuthors: [],
    load: true
  };

  selectAuthor = author => this.setState({ currentAuthor: author });

  unselectAuthor = () =>
    this.setState({ currentAuthor: null, filteredAuthors: this.state.authors });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  fitchAuthorsAPI = async () => {
    try {
      const res = await Axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      this.setState({ authors: res.data, filteredAuthors: res.data });
    } catch (error) {
      console.error();
    }
    this.setState({ load: false });
  };

  componentDidMount() {
    this.fitchAuthorsAPI();
  }

  render() {
    if (this.state.load) {
      return (
        <div className="container-fluid">
          <div className="row my-4 justify-content-md-center">
            <div className="col-2">
              <h1>Loading ..</h1>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="app" className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Sidebar unselectAuthor={this.unselectAuthor} />
            </div>
            <div className="content col-10">{this.getContentView()}</div>
          </div>
        </div>
      );
    }
  }
}

export default App;
