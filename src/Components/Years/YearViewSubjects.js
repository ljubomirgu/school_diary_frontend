import React, { Component } from 'react';
import '../Table.css'
import AddSubjectToYear from './AddSubjectToYear'

class YearViewSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseClick: false,
            subjectName: '',
            isLoading: false,
            isError: false,

            year:null,
            subjects:[],
            subjectId:'',
            showAddSubjectForm:false,
            showViewForm: true,
            removeSubject:null

        }
    }

    handleAddSubjectToYear = () => {
        this.setState({ showViewForm: false, showAddSubjectForm: true })
    }
    handleCancelAddSubjectsToYear = () => {
        this.setState({ showViewForm: true, showAddSubjectForm: false })
    }

    handleChangeSubject = (e) => {
        this.setState({
            subjectId: e.target.value
        })
    }

    handleEditAddSubjectToYear = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/years/' + this.props.viewYear.yearId + '/add-subject/' + this.state.subjectId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({showAddSubjectForm: false})
        this.componentDidMount();      


    }

    //remove
    handleRemoveSubjectForYear = async(subject)=>{
       // this.setState({removeSubject: e.target.value});
       // e.preventDefault();
        const response =  await fetch('/diary/years/' + this.props.viewYear.yearId + '/remove-subject/' + subject.subjectId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        this.componentDidMount(); 


    }

    async componentDidMount() {
           this.setState({ isLoading: true });
       
        const response = await fetch('/diary/subjects/by-year/'+this.props.viewYear.yearId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (response.ok) {
                const subjects = await response.json(); 
                this.setState({subjects: subjects, isLoading: false })
                console.log(this.state.subjects)
            } else {
                this.setState({ isLoading: false, isError: true })
                this.props.handleLogOut();
            }

    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                            <thead>
                                <tr>
                                    <th>Subjects of class {this.props.viewYear.year}</th>

                                    <th>Remove subject</th>

                                </tr>
                            </thead>
                            <tbody style={{ width: "200px" }}>
                                {this.props.subjects.map((subject) => {
                                    return (
                                        <tr key={subject.subjectId}>
                                            <td>{subject.subjectName}</td>

                                            <td><button className="removeButton" onClick={() => this.handleRemoveSubjectForYear(subject)}>x</button></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <input type='button' value='Add subject' id="adddd" onClick={() => this.handleAddSubjectToYear()} />
                    </div>
                </div>
                <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseBack}>Close</button></div>
                <div className="center">
                    {this.state.showAddSubjectForm &&
                        <AddSubjectToYear
                            subjects={this.state.subjects}
                            username={this.props.username}
                            password={this.props.password}
                            viewYear={this.props.viewYear}
                            onChange={this.props.onChange}
                            componentDidMount={this.componentDidMount}
                            handleCancelAddSubjectsToYear={this.handleCancelAddSubjectsToYear}
                            handleAddSubject={this.props.handleAddSubject}
                            handleChangeSubject={this.handleChangeSubject}
                            handleEditAddSubjectToYear={this.handleEditAddSubjectToYear}

                            allSubjects={this.props.allSubjects}
                        />}
                </div>
            </div>

        )
    }
}

export default YearViewSubjects;

