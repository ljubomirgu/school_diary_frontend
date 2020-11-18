import React, { Component } from 'react';
import YearForm from './YearForm';
import CreateYearForm from './CreateYearForm';
import '../Table.css';
//import YearView from './YearView'
import YearViewSubjects from './YearViewSubjects';
import YearViewDeparts from './YearViewDeparts'

class TableOfYears extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [],
            isLoading: false,
            isError: false,
            selectedYear: null,
            newYear: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true,
            isViewSubjectsClick: false,
            isViewDepartsClick: false,
            subjects: [],
            schoolClasses: [],
            viewYear: null,
            departments: [],
            allSubjects:[],



        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newYear: {
                ...this.state.newYear, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newYear)
        const response = await fetch('/diary/years', {
            method: 'POST',
            body: JSON.stringify(this.state.newYear),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newYear: null, showCreateButton: true, showTable:true })
        if (response.ok) {
            this.componentDidMount();//možda je samo dovoljno setovati u state showTabel:true
        }
        else {
            alert("Faild. The class is not created.")
        }

    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleEdit = (year) => this.setState({ selectedYear: year, showTable: false, showCreateButton: false })

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/years/' + this.state.selectedYear.yearId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedYear),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const years = [...this.state.years]
        const index = years.findIndex((year) => year.yearId === this.state.selectedYear.yearId)
        years.splice(index, 1, this.state.selectedYear)
        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
            this.setState({ selectedYear: null, showTable: true, showCreateButton: true })
        } else {
            this.setState({ years, selectedYear: null, showTable: true, showCreateButton: true })
        }

    }

    handleChange = (e) => {
        this.setState({
            selectedYear: {
                ...this.state.selectedYear,
                [e.target.name]: e.target.value
            }
        })
    }

    renderTableData() {
        return (
            <table className="tablebg">
                <thead>
                    <tr>
                        <th >#</th>
                        <th>   Year   </th>
                        <th style={{ display: "none" }}>Version</th>
                        {/*                         <th><button className="createButton" onClick={() => this.handleCreate()}>Create</button></th>
 */}                    <th>Subjects</th>
                        <th>Departments</th>
                        <th colSpan="2">Options</th>

                    </tr>
                </thead>

                <tbody>
                    {this.state.years.map((year) => {
                        return (
                            <tr key={year.yearId}>
                                <td className="counterCell"></td>
                                <td style={{ fontWeight: "bold", width: "60px" }}>  {year.year}  </td>
                                <td style={{ display: "none" }}>{year.version}</td>
                                {/* <td></td> */}
                                {/*                                 <td><button className="viewButton" onClick={() => this.takeSubjectsAndDepartsByYear(year)}>...</button></td>
 */}                            <td><button className="viewButton" onClick={() => this.takeSubjectsForYear(year)}>...</button></td>
                                <td><button className="viewButton" onClick={() => this.takeSchoolClassesForYear(year)}>...</button></td>
                                <td><button className="editButton" onClick={() => this.handleEdit(year)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(year)}>Delete</button></td>
                                

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/years',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        const response1 = await fetch('/diary/subjects',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok && response1.ok) {
            const years = await response.json();
            const allSubjects = await response1.json();
            this.setState({ years, allSubjects, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

/*         if (response.ok) {
            const years = await response.json();
            this.setState({ years, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        } */

    }

    handleDelete = async (year) => {
        const response = await fetch('/diary/years/' + year.yearId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status===500 || response.status===200) {
            alert("Year successfully deleted");
            this.componentDidMount();
            
        }
        else {
            alert("The year cannot be deleted because something references him!")
            this.componentDidMount();
            
        }
    }


    handleCancelEdit = () => {
        this.setState({ selectedYear: null, showTable: true, showCreateButton: true })
    }

    handleCancelCreate = () => {
        this.setState({ isCreateClick: false, showTable: true, showCreateButton: true })

    }

    //view:

    handleCloseBack = () => this.setState({ showTable: true, showCreateButton: true, isViewDepartsClick: false, isViewSubjectsClick: false })

    takeSubjectsForYear = async (year) => {
        const response = await fetch('/diary/subjects/by-year/' + year.yearId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const subjects = await response.json();
            this.setState({ viewYear: year, subjects, isLoading: false, isViewSubjectsClick: true, showTable: false, showCreateButton: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    takeSchoolClassesForYear = async (year) => {
        const response = await fetch('/diary/classes/by-year/' + year.yearId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const departments = await response.json();
            this.setState({ viewYear: year, departments, isLoading: false, isViewDepartsClick: true, showTable: false, showCreateButton: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    /*kad uradim preko jednog dugmeta zakuca ram   
    takeSubjectsAndDepartsByYear = async (year) => {
        this.takeSubjectsAndDepartsByYear(year);
        this.takeSubjectsForYear(year);
    }*/


  
    render() {
        const { years, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }


        return years.length > 0 ?
            (
                <div>
                    <h1 id='title'>Classes</h1>
                    {this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='years' style={{ marginTop: "2%" }}>
                            {this.state.showTable && this.renderTableData()}

                            {/* <div className="formaEdita">*/}
                            {this.state.selectedYear &&
                                <YearForm
                                    {...this.state.selectedYear}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                />
                            }

                            {this.state.isCreateClick &&
                                <CreateYearForm
                                    {...this.state.newYear}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}
                                />
                            }
                            {/*{this.state.isViewClick && 
                                <YearView                                
                                  subjects={this.state.subjects} 
                                  departments={this.state.departments}
                                  handleCloseBack={this.handleCloseBack}
                                  />
                                }  */}
                            {this.state.isViewSubjectsClick &&
                                <YearViewSubjects
                                    subjects={this.state.subjects}
                                    handleCloseBack={this.handleCloseBack}
                                    username={this.props.username}
                                    password={this.props.password}
                                    viewYear={this.state.viewYear}
                                    allSubjects={this.state.allSubjects}                                                                    
                                />
                            }
                            {this.state.isViewDepartsClick &&
                                <YearViewDeparts

                                    departments={this.state.departments}
                                    handleCloseBack={this.handleCloseBack}
                                />
                            }
                        </div>
                    </div>
                </div>
            )
            : null
    }
}

export default TableOfYears;