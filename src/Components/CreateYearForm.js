import React, { Component } from 'react';
import './Table.css'


class CreateYearForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: ''   

        }
    }


    render() {
        return (
            <form onSubmit={this.props.handleCreateSubmit} className="formaEdita">

                <label htmlFor='year'><strong>Year : </strong></label>
                <input
                    type="text"
                    name="year"
                    placeholder="year"
                    value={this.props.year}
                    onChange={this.props.onChange}
                />
                <br />      
                <input type='submit' value='Save' />

            </form>
        )
    }
}

export default CreateYearForm;