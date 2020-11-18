import React, { Component } from 'react';
import '../Table.css'

class YearForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: ''
        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>

                <form onSubmit={this.props.handleEditSubmit} >

                    <label htmlFor='year'><strong>Year: </strong></label>
                    <input
                        type="text"
                        name="year"
                        placeholder="year"
                        value={this.props.year}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <div>
                        <input type='submit' className="saveStyl" value='Save' />
                        <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelEdit} />
                    </div>
                </form>
            </div>
        )
    }
}

export default YearForm;