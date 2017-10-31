import React from "react";
import { BrowseButton } from "react-toolbox/lib/button";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    this.props.callback(e.target.files[0]);
  }

  render() {
    return (
      <div>
        <BrowseButton
          icon="file_upload"
          label="Upload Image"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Upload;
