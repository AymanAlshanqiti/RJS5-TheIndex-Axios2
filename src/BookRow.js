import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    const author = this.props.authors.map(author => {
      return `${author.name}, `;
    });

    return (
      <tr>
        <td>{book.title}</td>
        <td>{author}</td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
