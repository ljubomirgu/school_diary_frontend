import React, { Component } from 'react';
import ProfileEdit from './ProfileEdit'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',//this.props.user.firstName,
            lastName:'',// this.props.user.firstName,
            jmbg:'',//this.props.user.firstName,
            dateOfBirth:'',// this.props.user.firstName,
            username: '',//this.props.user.firstName,
            userId: '',//this.props.user.firstName,
            dateEntered:'',//.props.user.dateEntered,
            note:'',//this.props.user.note,
            isCloseClick: false,
            isEditClick: false,
            targetPage: '',
            selectProfile: null,
            student: this.props.user,
            showProfile: true
        }
    }

    handleChange = (e) => {
        this.setState({ 
            selectProfile: {
                 ...this.state.selectProfile, [e.target.name]: e.target.value 
                } 
            })
    }

    handleCancel = (e) => this.setState({ selectProfile: null, showProfile: true })

    handleProfileEdit = () => {
        this.setState({ showProfile: false,
            selectProfile: this.state.student})
            }  

    handleEditSubmit = async (e) => {
         e.preventDefault()
         console.log(this.state.student)
        const response = await fetch('/diary/students/' + this.state.student.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectProfile),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log(this.state.student)
        this.componentDidMount();
        this.setState({selectProfile: null, showProfile: true})
        console.log(this.state.student)
     }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/students/' + this.props.user.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const student = await response.json();        
            this.setState({ student, isLoading: false })       
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
        }

    }


    render() {
        return (
            <div className="profileStyl" style={{marginTop:"4%"}}>
                {this.state.showProfile &&
                <div>                    
                    <p><span>First name: </span>{this.state.student.firstName}</p>
                    <p><span>Last name: </span>{this.state.student.lastName}</p>
                    <p><span>JMBG: </span>{this.state.student.jmbg}</p>
                    <p><span>Date of birth: </span>{this.state.student.dateOfBirth}</p>
                    <p><span>Date of entered: </span>{this.state.student.dateEntered}</p>
                    <p><span>Note: </span>{this.state.student.note}</p>
                    <p><span>Username: </span>{this.props.username}</p>
                    <p><button className="closeButton" onClick={this.props.handleProfileClose}>Close</button>
                 <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.handleProfileEdit(this.state.student)}>Edit</button></span></p>
              
                </div>}

                <div className="center">
                    {this.state.selectProfile &&
                        <ProfileEdit {...this.state.selectProfile}
                            onChange={this.handleChange}
                            handleEditSubmit={this.handleEditSubmit}
                            handleCancel={this.handleCancel} />}
                </div>

            </div>
        )
    }
}
export default Profile