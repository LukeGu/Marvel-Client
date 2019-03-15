import React, { Component } from "react";
import ComSearch from "../../component/ComSearch/ComSearch";
import ComSort from "../../component/ComSort/ComSort";
import ComTable from "../../component/ComTable/ComTable";
import Header from "../../component/Header/Header";

import Pagination from "../../component/Pagination/Pagination";
import Service from "../../utility/comService";

const _service = new Service();

class Home extends Component {
  state = {
    comicList: [],
    total: "",
    pageNum: 1,
    sortType: "",
    searchType: "",
    searchKeyword: "",
    condition: {}
  };
  componentDidMount() {
    this.loadComics();
  }
  loadComics() {
    let condition = { ...this.state.condition };
    if (this.state.pageNum > 1) {
      condition.offset = (this.state.pageNum - 1) * 20;
    } else if (this.state.pageNum === 1) {
      condition.offset = 0;
    }
    if (this.state.sortType) {
      condition.orderBy = this.state.sortType;
    }
    if (this.state.searchKeyword) {
      condition[this.state.searchType] = this.state.searchKeyword;
      if (this.state.searchType === "dateRange") {
        delete condition.title;
      } else {
        delete condition.dateRange;
      }
    }
    this.setState({ condition: condition });
    _service.getComicsList(condition).then(
      res => {
        this.setState({
          comicList: res.data.results,
          total: res.data.total
        });
      },
      err => {
        this.setState({ comicList: [] });
        alert(err);
      }
    );
  }

  onSearch(searchType, searchKeyword) {
    this.setState(
      {
        pageNum: 1,
        searchType: searchType,
        searchKeyword: searchKeyword
      },
      () => {
        this.loadComics();
      }
    );
  }

  onSort(sortType) {
    this.setState(
      {
        pageNum: 1,
        sortType: sortType
      },
      () => {
        this.loadComics();
      }
    );
  }

  onChangePageNumber(pageNum) {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this.loadComics();
      }
    );
  }

  onResetCondition() {
    this.setState(
      {
        pageNum: 1,
        sortType: "",
        searchType: "",
        searchKeyword: "",
        condition: {}
      },
      () => {
        this.loadComics();
      }
    );
  }

  render() {
    let listBody = this.state.comicList.map((item, index) => {
      let pic = item.thumbnail.path + "/standard_medium.jpg";
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.dates[0].date.slice(0, 10)}</td>
          <td>
            <img src={pic} alt="pic" />
          </td>
        </tr>
      );
    });

    return (
      <div className="container">
        <Header />

        <div className="row">
          <ComSearch
            onSearch={(searchType, searchKeyword) => {
              this.onSearch(searchType, searchKeyword);
            }}
          />

          <ComSort onSort={sortType => this.onSort(sortType)} />
          <button
            className="btn btn-warning"
            onClick={() => this.onResetCondition()}
          >
            Reset
          </button>
        </div>

        <div className="row">
          <ComTable tableHeads={["ID", "Title", "Year", "Image"]}>
            {listBody}
          </ComTable>
        </div>
        <Pagination
          current={this.state.pageNum}
          pageSize={20}
          total={+this.state.total}
          onChange={pageNum => this.onChangePageNumber(pageNum)}
        />
      </div>
    );
  }
}

export default Home;
