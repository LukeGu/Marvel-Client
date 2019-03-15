import React, { Component } from "react";
import Pic from "./header.jpg";
class Header extends Component {
  render() {
    return (
      <header>
        <div className="collapse bg-dark show" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Marvel Comics</h4>
                <div>
                  <img src={Pic} alt="pic" />
                </div>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Contact</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://github.com/LukeGu" className="text-white">
                      Star on GitHub
                    </a>
                    <hr />
                    <p className="text-white">mythnan@gmail.com</p>
                    <p className="text-white">0416877826</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
