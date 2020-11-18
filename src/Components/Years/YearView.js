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
                               <th>Subjects of class</th>                                                          
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.subjects.map((subject) => {
                                return(
                                <tr key={subject.subjectId}>
                                    <td>{subject.subjectName}</td>
                                </tr>
                                )
                            })}                             
                            
                        </tbody>
                    </table>
                    <table style={{borderCollapse: "collapse", backgroundColor: "white"}}>
                        <thead>
                            <tr>
                                <th>Departments of class</th>                           
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.departments.map((department) => {
                                return(
                                <tr key={department.departmentId}>
                                    <td>{department.numberOfDepartment}</td>
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

