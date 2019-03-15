import React, { Component } from "react";
import ComTable from "../../component/ComTable/CardTable";
import ComSearch from "../../component/ComSearch/ComSearch";
import ComSort from "../../component/ComSort/ComSort";
import Header from "../../component/Header/Header";

import Pagination from "../../component/Pagination/Pagination";
import Service from "../../utility/comService";

import "./home.css";

const _service = new Service();

class HomePage extends Component {
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
      let pic = item.thumbnail.path + "/standard_fantastic.jpg";
      return (
        <div className="col-md-3" key={index}>
          <div className="card mb-3 shadow-sm">
            <img src={pic} style={{ height: 225 }} alt="pic" />
            <div className="card-body">
              <p className="card-text cardTitle">{item.title}</p>
              <p className="card-text">{item.dates[0].date.slice(0, 10)}</p>
              <p className="card-text">{item.id}</p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header />
        <section className="jumbotron text-center">
          <div className="container">
            <ComSearch
              onSearch={(searchType, searchKeyword) => {
                this.onSearch(searchType, searchKeyword);
              }}
            />
            <div className="row">
              <div className="col-9">
                <ComSort onSort={sortType => this.onSort(sortType)} />
              </div>
              <div className="col-3">
                <button
                  className="btn btn-warning"
                  onClick={() => this.onResetCondition()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
        <ComTable>{listBody}</ComTable>
        <div className="container d-inline-flex p-2 justify-content-between">
          <Pagination
            current={this.state.pageNum}
            pageSize={20}
            total={+this.state.total}
            onChange={pageNum => this.onChangePageNumber(pageNum)}
          />
        </div>
        <div className="card-footer text-muted">@LUKE</div>
      </div>
    );
  }
}

export default HomePage;
