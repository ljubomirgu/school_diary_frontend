import React, { Component } from 'react';
import SchoolClassForm from './SchoolClassForm';
import CreateSchoolClassForm from './CreateSchoolClassForm';
import '../Table.css'
import SchoolClassView from './SchoolClassView';

class TableOfClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolClasses: [],
            isLoading: false,
            isError: false,
            selectedSchoolClass: null,
            newSchoolClass: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true,
            viewSchoolClass: null,
            isViewClick: false,
            students: []

        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newSchoolClass: {
                ...this.state.newSchoolClass, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newSchoolClass)
        const response = await fetch('/diary/classes', {
            method: 'POST',
            body: JSON.stringify(this.state.newSchoolClass),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newSchoolClass: null, showCreateButton: true })
        if (response.ok) {
            this.componentDidMount();//možda je samo dovoljno setovati u state showTabel:true
        }
        else {
            alert("Faild. The department is not created.")
        }

    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleEdit = (year) => this.setState({ selectedSchoolClass: year, showTable: false, showCreateButton: false })

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/classes/' + this.state.selectedSchoolClass.classId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedSchoolClass),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const schoolClasses = [...this.state.schoolClasses]
        const index = schoolClasses.findIndex((schoolClass) => schoolClass.classId === this.state.selectedSchoolClass.classId)
        schoolClasses.splice(index, 1, this.state.selectedSchoolClass)
        this.setState({ schoolClasses, selectedSchoolClass: null, showTable: true, showCreateButton: true })

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }

    }

    handleChange = (e) => {
        this.setState({
            selectedSchoolClass: {
                ...this.state.selectedSchoolClass,
                [e.target.name]: e.target.value
            }
        })
    }

    renderTableData() {
        return (

            <table className="tablebg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Year</th>
                        <th>Number of department</th>
                        <th>School year</th>
                        <th>More info</th>
                        <th colSpan="2">Options</th>

                    </tr>
                </thead>

                <tbody>
                    {this.state.schoolClasses.map((schoolClass) => {
                        return (
                            <tr key={schoolClass.classId}>
                                <td className="counterCell"></td>
                                <td>{schoolClass.year.year}</td>
                                <td>{schoolClass.numberOfDepartment}</td>
                                <td>{schoolClass.schoolYear}</td>
                                <td><button className="viewButton" onClick={() => this.takeStudentsForDepartment(schoolClass)}>...</button></td>
                                <td><button className="editButton" onClick={() => this.handleEdit(schoolClass)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(schoolClass)}>Delete</button></td>
                                

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/classes',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const schoolClasses = await response.json();
            this.setState({ schoolClasses, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }
    /*
        handleDelete = (classId) => {
            //fetch sa Delete metodom
            //pa posle uspešnog izvršavanja bismo ažurirali state
            const years = this.state.schoolClasses.filter((schoolClass) => schoolClass.classId !== classId)
            this.setState({ years })
        }
    */

    handleDelete = async (schoolClass) => {
        const response = await fetch('/diary/teachers/' + schoolClass.classId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status === 200) {
            this.componentDidMount();
            alert("Class successfully deleted");
        }
        else {
            alert("The class cannot be deleted because something references him!")
        }
    }

    handleCancelEdit = () => {
        this.setState({ selectedSchoolClass: null, showTable: true, showCreateButton: true })
        // this.componentDidMount();
    }

    handleCancelCreate = () => {
        this.setState({ isCreateClick: false, showTable: true, showCreateButton: true })

    }

    // view:
    handleCloseBack = () => this.setState({ showTable: true, showCreateButton: true, isViewClick: false })

    takeStudentsForDepartment = async (schoolClass) => {
        console.log("ovde")
        console.log(schoolClass)
        const response = await fetch('/diary/students/by-schoolClass//' + schoolClass.classId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const students = await response.json(); 
            this.setState({ viewSchoolClass: schoolClass, students, isLoading: false, isViewClick: true, showTable: false, showCreateButton: false })
            console.log(this.state.viewSchoolClass)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }


    //render:
    render() {
        const { schoolClasses, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }


        return schoolClasses.length > 0 ?
            (
                <div>
                    <h1 id='title'>Departments</h1>
                    {this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='schoolClasses' style={{ marginTop: "2%" }}>

                            {this.state.showTable && this.renderTableData()}

                            {this.state.selectedSchoolClass &&
                                <SchoolClassForm
                                    {...this.state.selectedSchoolClass}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                />
                            }

                            {this.state.isCreateClick &&
                                <CreateSchoolClassForm
                                    {...this.state.newSchoolClass}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}
                                />
                            }
                            {this.state.isViewClick && 
                                <SchoolClassView
                                  year={this.state.viewSchoolClass.year.year}
                                  numberOfDepartment={this.state.viewSchoolClass.numberOfDepartment}
                                  students={this.state.students}
                                  handleCloseBack={this.handleCloseBack}
                                  />
                                } 
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            )
            : null
    }
}

export default TableOfClasses;