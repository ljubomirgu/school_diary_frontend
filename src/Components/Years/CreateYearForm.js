import React, { Component } from 'react';
import '../Table.css'

class CreateYearForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: ''
        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
                <form onSubmit={this.props.handleCreateSubmit} >
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
                        <a href='javascript:void(0)' onClick={this.props.handleCancelCreate} >Cancel</a>
{/*                         <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelCreate} />
 */}                    </div>
                </form>
            </div>
        )
    }
}

export default CreateYearForm;