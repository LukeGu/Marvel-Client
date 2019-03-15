import React, { Component } from "react";

class ComSearch extends Component {
  state = {
    searchType: "title",
    searchKeyword: ""
  };
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }

  onSearch() {
    if (this.state.searchKeyword) {
      if ("dateRange" === this.state.searchType) {
        if (typeof +this.state.searchKeyword === "number") {
          let year = this.state.searchKeyword;
          year = `${year}-01-01,${year}-12-31`;
          this.props.onSearch(this.state.searchType, year);
        }
      } else {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
      }
    } else {
      alert("Keywords cannot be empty!");
    }
  }

  onSearchKeywordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-5 mb-3">
          <select
            className="form-control"
            name="searchType"
            onChange={e => this.onValueChange(e)}
          >
            <option value="title">Search by Title</option>

            <option value="dateRange">Search by Year</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Key Words"
            name="searchKeyword"
            onKeyUp={e => this.onSearchKeywordKeyUp(e)}
            onChange={e => this.onValueChange(e)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <button className="btn btn-primary" onClick={() => this.onSearch()}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default ComSearch;
