import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src="theindex.svg" className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <button onClick={this.props.unselectAuthor}>AUTHORS</button>
          </h4>
        </section>
      </div>
    );
  }
}

export default Sidebar;
