import React, { Component } from "react";

class ComTable extends Component {
  render() {
    let listBody = this.props.children;
    let listInfo = <h2>Loading...</h2>;
    let tableBody = listBody.length > 0 ? listBody : listInfo;
    return (
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">{tableBody}</div>
        </div>
      </div>
    );
  }
}

export default ComTable;
