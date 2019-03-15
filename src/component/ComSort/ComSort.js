import React, { Component } from "react";

class ComSort extends Component {
  state = {
    sortType: ""
  };
  onValueChange(e) {
    let value = e.target.value.trim();
    this.setState(
      {
        sortType: value
      },
      () => {
        this.onSort();
      }
    );
  }

  onSort() {
    this.props.onSort(this.state.sortType);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <select
            className="form-control"
            onChange={e => this.onValueChange(e)}
          >
            <option value="title">sort by title (A - Z)</option>
            <option value="-title">sort by title (Z - A)</option>
            <option value="onsaleDate">sort by onsale date +</option>
            <option value="-onsaleDate">sort by onsale date -</option>
          </select>
        </div>
      </div>
    );
  }
}

export default ComSort;
