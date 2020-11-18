import React, { Component } from 'react';
import ParentForm from './ParentForm';
import CreateParentForm from './CreateParentForm';
import '../Table.css'
import ParentView from './ParentView'


class TableOfParents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parents: [],
            isLoading: false,
            isError: false,
            selectedParent: null,
            newParent: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true,
            isViewClick: false,
            viewParent: null,
            students: [],
            allStudents:[]
        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newParent: {
                ...this.state.newParent, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newParent)
        const response = await fetch('/diary/parents', {
            method: 'POST',
            body: JSON.stringify(this.state.newParent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newParent: null, showCreateButton: true })
        if (response.ok) {
            this.componentDidMount();//možda je samo dovoljno setovati u state showTabel:true
        }
        else {
            alert("Faild. The parent is not created.")
        }

    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleEdit = (parent) => this.setState({ selectedParent: parent, showTable: false, showCreateButton: false })

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/parents/' + this.state.selectedParent.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedParent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const parents = [...this.state.parents] //     (property) selectedStudent: any
        const index = parents.findIndex((parent) => parent.userId === this.state.selectedParent.userId)
        parents.splice(index, 1, this.state.selectedParent)
        this.setState({ parents, selectedParent: null, showTable: true, showCreateButton: true })

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }

    }


    handleChange = (e) => {
        this.setState({
            selectedParent: {
                ...this.state.selectedParent,
                [e.target.name]: e.target.value
            }
        })
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/parents',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const response1 = await fetch('/diary/students',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok && response1.ok) {
            const parents = await response.json();
            const allStudents = await response1.json();
            this.setState({ parents, allStudents, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }

    handleDelete = async (parent) => {
        const response = await fetch('/diary/parents/' + parent.userId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status === 200) {
            this.componentDidMount();
            alert("Parent successfully deleted");
        }
        else {
            alert("The parent cannot be deleted because something references him.!")
        }
    }

    handleCancelEdit = () => {
        this.setState({ selectedParent: null, showTable: true, showCreateButton: true })
    }

    handleCancelCreate = () => {
        this.setState({ isCreateClick: false, showTable: true, showCreateButton: true })

    }

    // view
    handleCloseBack = () => this.setState({ showTable: true, showCreateButton: true, isViewClick: false })

    takeStudentsByParent = async (parent) => {
       // console.log("ovde")
       // console.log(parent)
        const response = await fetch('/diary/students/by-parent/' + parent.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const students = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            this.setState({ viewParent: parent, students, isLoading: false, isViewClick: true, showTable: false, showCreateButton: false })
        //    console.log(this.state.viewParent)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }




    renderTableData() {
        return (

            <table className="tablebg">
                <thead >
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>JMBG</th>
                        <th>Date of birth</th>
                        <th style={{ display: "none" }}>Version</th>
                        <th>E-mail</th>
                        <th>More info</th>
                        <th colSpan="2">Options</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.parents.map((parent) => {
                        return (
                            <tr key={parent.userId}>
                                <td className="counterCell"></td>
                                <td>{parent.firstName}</td>
                                <td>{parent.lastName}</td>
                                <td>{parent.jmbg}</td>
                                <td>{parent.dateOfBirth}</td>
                                <td style={{ display: "none" }}>{parent.version}</td>
                                <td>{parent.email}</td>
                                <td><button className="viewButton" onClick={() => this.takeStudentsByParent(parent)}>...</button></td>
                                <td><button className="editButton" onClick={() => this.handleEdit(parent)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(parent)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }


    handleDelete = (parentId) => {
        //fetch sa Delete metodom
        //pa posle uspešnog izvršavanja bismo ažurirali state
        const parents = this.state.parents.filter((parent) => parent.userId !== parentId)
        this.setState({ parents })
    }

    render() {
        const { parents, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }


        return parents.length > 0 ?
            (
                <div>
                    <h1 id='title'>Parents</h1>
                    {this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='parents' style={{ marginTop: "2%" }}>
                            {this.state.showTable && this.renderTableData()}

                            {/* <div className="formaEdita">*/}
                            {this.state.selectedParent &&
                                <ParentForm
                                    {...this.state.selectedParent}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                />
                            }
                            {this.state.isCreateClick &&
                                <CreateParentForm
                                    {...this.state.newParent}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}
                                />
                            }

                            {this.state.isViewClick &&
                                <ParentView
                                    firstName={this.state.viewParent.firstName}
                                    lastName={this.state.viewParent.lastName}
                                    jmbg={this.state.viewParent.jmbg}
                                    dateOfBirth={this.state.viewParent.dateOfBirth}
                                    email={this.state.viewParent.email}
                                    students={this.state.students} 

                                    handleCloseBack={this.handleCloseBack}
                                    username={this.props.username}
                                    password={this.props.password}
                                    viewParent={this.state.viewParent}
                                    allStudents={this.state.allStudents}
                                />
                            }
                            {/* </div>*/}

                        </div>
                    </div>
                </div>
            )
            : null
    }
}

export default TableOfParents;