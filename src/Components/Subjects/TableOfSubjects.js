import React, { Component } from 'react';
import SubjectForm from './SubjectForm';
import CreateSubjectForm from './CreateSubjectForm';
import '../Table.css'
import SubjectView from './SubjectView'

class TableOfSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            isLoading: false,
            isError: false,
            selectedSubject: null,
            newSubject: null,
            isCreateClick: false,
            viewSubject: null,
            showTable: true,
            showCreateButton: true,
            isViewlick: false,


        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newSubject: {
                ...this.state.newSubject, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newSubject)
        const response = await fetch('/diary/subjects', {
            method: 'POST',
            body: JSON.stringify(this.state.newSubject),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newSubject: null, showCreateButton: true, showTable: true })
        if(response.ok){            
            this.componentDidMount();//možda je samo dovoljno setovati u state showTabel:true
        }            
        else{
            alert("Faild. The student is not created.")
        }

    }
    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })


    handleEdit = (subject) => this.setState({ selectedSubject: subject, showTable: false, showCreateButton: false })
    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/subjects/' + this.state.selectedSubject.subjectId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedSubject),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const subjects = [...this.state.subjects]
        const index = subjects.findIndex((subject) => subject.subjectId === this.state.selectedSubject.subjectId)
        subjects.splice(index, 1, this.state.selectedSubject)
        this.setState({ subjects, selectedSubject: null, showTable: true, showCreateButton: true })

        if(!response.ok){        
            alert("Faild. The edit is not succeeded.")
        }

    }

    handleChange = (e) => {
        this.setState({
            selectedSubject: {
                ...this.state.selectedSubject,
                [e.target.name]: e.target.value
            }
        })
    }

    renderTableData() {
        return (
            <table className="tablebg">
{/*                 <caption><button className="createButton" onClick={() => this.handleCreate()}>Create new subject</button></caption>
 */}                <thead>
{/*                     <tr colSpan="7"><button className="createButton" onClick={() => this.handleCreate()}>Create new subject</button></tr>
 */}                    <tr>
                        <th>#</th>
                        <th>Subject name</th>
                        <th>Weekly fund</th>
                        <th style={{display:"none"}}>Version</th>
{/*                         <th><button className="createButton" onClick={() => this.handleCreate()}>Create</button></th>
 */}                     <th>More info</th>   
                        <th colSpan="2">Options</th>

                    </tr>
                </thead>

                <tbody>
                    {this.state.subjects.map((subject) => {
                        return (
                            <tr key={subject.subjectId}>
                                <td className="counterCell"></td>
                                <td>{subject.subjectName}</td>
                                <td>{subject.weeklyFund}</td>
                                <td style={{display:"none"}}>{subject.version}</td>
                                <td><button className="viewButton" onClick={() => this.takeTeacherForSubject(subject)}>...</button></td>
                                <td><button className="editButton" onClick={() => this.handleEdit(subject)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(subject)}>Delete</button></td>
                               

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/subjects',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const subjects = await response.json();
            this.setState({ subjects, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }
 
    handleDelete = async (subject) => {
        const response = await fetch('/diary/subjects/' + subject.subjectId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status === 200) {
            this.componentDidMount();
            alert("Subject successfully deleted");
            
        }
        else {
            alert("The subject cannot be deleted because something references him!")
        }
    }

    handleCancelEdit = () =>{
        this.setState({selectedSubject: null, showTable: true, showCreateButton: true })
    }
    
    handleCancelCreate = () =>{
        this.setState({isCreateClick: false, showTable: true, showCreateButton: true})    
    }

///////////////////////////////////////////   V I E W     ///////////////////////////////////////////////

/*
    handleView = (subject) => {
        console.log("handleView start");
        console.log(subject)
        this.setState({viewSubject : subject, showTable: false, showCreateButton: false, isViewlick: true });
        console.log(this.state.subject);
       this.takeTeacherForSubject()///////////////
    }
*/
    
/*
    handleViewSubmit = async (e) => {
        e.preventDefault()
        this.setState({ isLoading: true });
        const response = await fetch('/diary/subjects/' + this.state.viewSubject.subjectId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const viewSubject = await response.json();
            this.setState({ viewSubject, isLoading: false})
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }
*/
    handleCloseBack= () => this.setState({showTable: true, showCreateButton: true, isViewlick:false })

    takeTeacherForSubject = async (subject) => {
        console.log("ovde")
        console.log(subject)
        const response = await fetch('/diary/teachers/subject/' + subject.subjectId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const teachers = await response.json();
            this.setState({viewSubject:subject, teachers, isLoading: false, isViewlick: true, showTable:false,  showCreateButton: false  })
            console.log(this.state.viewSubject)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }
/*
    
    renderViewData(){
        return (
            <div>
                <br/><br/><br/>
            <table>
                <thead>
                    <tr>
                        <th >#</th>
                        <th>Subject name</th>
                        <th>Weekly fund</th>
                        <th >Version</th>
                    </tr>
                </thead>
                <tbody>
            
                        <tr key={this.subject.subjectId}>
                            <td >{this.subject.subjectId}</td>
                            <td>{this.state.viewSubject.subjectName}</td>
                            <td>{this.state.viewSubject.weeklyFund}</td>
                            <td>{this.state.viewSubject.version}</td>
                        </tr>
                        <tr><button className="closeButton" onClick={() => this.handleCloseBack()}>Close</button></tr>
                    
                
                </tbody>

            </table>
            </div>

        )
    }
    */

//RENDER:

    render() {
        const { subjects, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }


        return subjects.length > 0 ?
            (
                <div>
                    <h1 id='title'>Subjects</h1>
{/*                     <div className="backDiv"><button className="backButton" onClick={() => this.props.handleBack()}>Home</button></div>
 */}                    { this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='subjects' style={{ marginTop: "2%" }}>
                            {this.state.showTable && this.renderTableData()}


                            {this.state.selectedSubject &&
                                <SubjectForm
                                    {...this.state.selectedSubject}
                                    onChange={this.handleChange} 
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit = {this.handleCancelEdit}
                                />
                            }

                            {this.state.isCreateClick &&
                                <CreateSubjectForm
                                    {...this.state.newSubject}
                                    onChange={this.handleCreateChange} 
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate = {this.handleCancelCreate}
                                />
                            }

                      {/*}       {this.state.viewSubject && this.renderViewData()}*/}
                            {this.state.isViewlick && 
                                <SubjectView
/*                                subjectId={this.subject.subjectId}
                                  subjectName={this.subject.subjectName}
                                  weeklyFund={this.subject.weeklyFund}*/
                                  subjectName={this.state.viewSubject.subjectName}
                                  weeklyFund={this.state.viewSubject.weeklyFund}
                                  teachers={this.state.teachers}
                                  handleCloseBack={this.handleCloseBack}
                                  />
                                }   
                            
                            {/*dodato ovo dole*
                            {this.state.viewSubject &&
                                <SubjectView
                                    {...this.state.viewSubject}
                                   //
                                   // componentDidMount = {this.componentDidMount()}
                                    //handleCloseBack ={this.handleCloseBack()}
                                />
                            }*/}

                        </div>

                    </div>
                </div>
            )
            : null
    }
}

export default TableOfSubjects;