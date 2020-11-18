import React, { Component } from 'react';
import AdminForm from './AdminForm';
import CreateAdminForm from './CreateAdminForm';
import '../Table.css'

import Download from '../Download'

class TableOfAdmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            isLoading: false,
            isError: false,
            selectedAdmin: null,
            newAdmin: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true
           // isDownloadClick: false,
            //loggs: ''
        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newAdmin: {
                ...this.state.newAdmin, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newAdmin)
        const response = await fetch('/diary/administrators', {
            method: 'POST',
            body: JSON.stringify(this.state.newAdmin),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newAdmin: null, showCreateButton: true })
        this.componentDidMount();
        if(!response.ok){
            alert("The administrator is not created.")
        }

    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleEdit = (admin) => this.setState({ selectedAdmin: admin, showTable: false, showCreateButton: false })

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/administrators/' + this.state.selectedAdmin.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedAdmin),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const admins = [...this.state.admins] //     (property) selectedStudent: any
        const index = admins.findIndex((admin) => admin.userId === this.state.selectedAdmin.userId)
        admins.splice(index, 1, this.state.selectedAdmin)
        this.setState({ admins, selectedAdmin: null, showTable: true, showCreateButton: true })
        if(!response.ok){
            alert("Faild.The edit is not succeeded")
        }

    }

    handleChange = (e) => {
        this.setState({
            selectedAdmin: {
                ...this.state.selectedAdmin,
                [e.target.name]: e.target.value
            }
        })
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/administrators',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const admins = await response.json();
            this.setState({ admins, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }

    handleDelete = async (admin) => {
        const response = await fetch('diary/administrators/delete/' + admin.userId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status === 200) {
            this.componentDidMount();
            alert("Administrator successfully deleted");
        }
        else {
            alert("The administrator cannot be deleted!")
        }
    }

    //cancelEditForm:
    handleCancelEdit = () => {
        this.setState({ selectedAdmin: null, showTable: true, showCreateButton: true })
        //this.props.history.push({pathname: '/administrators'})
        // this.componentDidMount();
    }

    handleCancelCreate = () => {
        this.setState({ isCreateClick: false, showTable: true, showCreateButton: true })

    }

/*
//download:
    handleDownloadLog = () => this.setState({ isDownloadClick: true })
    hanldeDownloadClose = () => this.setState({isDownloadClick: false})
    handleDownload= async (e) => {
        e.preventDefault()
        console.log("downloaddddddddddddd")
        this.setState({ isLoading: true });
        const response = await fetch('/diary/administrators/downloadLogFile',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const loggs = await response.json();
            this.setState({ loggs, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }
*/




    renderTableData() {
        return (

            <table className="tablebg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>JMBG</th>
                        <th>Date of birth</th>
                        <th style={{display:"none"}}>Version</th>
                        <th>Phone number</th>
                        <th style={{display:"none"}}>More info</th>
                        <th colSpan="2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.admins.map((admin) => {
                        return (
                            <tr key={admin.userId}>
                                <td className="counterCell"></td>
                                <td>{admin.firstName}</td>
                                <td>{admin.lastName}</td>
                                <td>{admin.jmbg}</td>
                                <td>{admin.dateOfBirth}</td>
                                <td style={{display:"none"}}>{admin.version}</td>
                                <td>{admin.phoneNumber}</td>
                                <td style={{display:"none"}}><button className="viewButton" onClick={() => this.handleView(admin)}>...</button></td>
                                <td><button className="editButton" onClick={() => this.handleEdit(admin)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(admin)}>Delete</button></td>
                                

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }

    render() {
        const { admins, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }


        return admins.length > 0 ?
            (
                <div>
                    <h1 id='title'>Administrators</h1>
                    {this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='admins' style={{ marginTop: "2%" }} >

                            {/*                             <tbody>
 */}                       {this.state.showTable && this.renderTableData()}
                            {/*                             </tbody>    
 */}                       {/* <div className="formaEdita">*/}

                            {this.state.selectedAdmin &&
                                <AdminForm
                                    {...this.state.selectedAdmin}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                />
                            }

                            {this.state.isCreateClick &&
                                <CreateAdminForm
                                    {...this.state.newAdmin}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}

                                />
                            }
{/* 
                            {this.state.isDownloadClick &&
                                <Download
                                    {...this.state.loggs}
                                    hanldeDownloadClose={this.hanldeDownloadClose}
                                    handleDownloadLog={this.handleDownloadLog}

                                />} */}
                            {/* </div>*/}
                        </div>
                    </div>
                </div>
            )
            : null
    }
}

export default TableOfAdmins;