import React, { Component } from 'react';
import '../Table.css'

class YearView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseClick: false,
  
            subjectName:'',

            isLoading: false,
            isError: false

        }
    }



    render() {
        return (         
            <div>                  
                <div>
                    <table style={{borderCollapse: "collapse", backgroundColor: "white"}}>
                        <thead>
                            <tr>
                                <th>Departments</th>   
                                <th>School year</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.departments.map((department) => {
                                return(
                                <tr key={department.departmentId}>
                                    <td>{department.numberOfDepartment}</td>
                                    <td>{department.schoolYear}</td>
                                </tr>
                                )
                            })}                             
                            
                        </tbody>
                    </table>

                </div>  
                <div style={{marginTop:"8px"}}><button className="closeButton" onClick={this.props.handleCloseBack}>Close</button></div>
            </div>

        )
    }
}

export default YearView;

