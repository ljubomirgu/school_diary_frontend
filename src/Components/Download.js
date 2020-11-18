import React, { Component } from 'react';
import './Table.css'

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggs: '',
            isCloseClick: false
        }
    }

    handleClose = () => this.setState({ isCloseClick: true })
    /*
        render() {
            return (
                <div className="download" style={{ marginTop: "5%" }}>
                    <form onSubmit={this.props.handleDownloadClose} >
                       
                        <div>
                            {this.props.loggs}
                            <input type='submit' className="saveStyl" value='Close' />
                        </div>
                    </form>
                </div>
            )
        }
    */
    render() {
        return (
            <div className="download" style={{ marginTop: "5%" }}>
                <div>
                    {this.props.loggs}
                </div>
                <div>
                    <button className="closeButton" onClick={this.props.handleDownloadLogClose}>Close</button>
                </div>
            </div>
        )
    }
}

export default Download;