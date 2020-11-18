import React, { Component } from 'react';
import ProfileEdit from '../TeacherAsUser/ProfileEdit'

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
            dateOfEmployment:'',//.props.user.dateEntered,
            vocation:'',//this.props.user.note,
            isCloseClick: false,
            isEditClick: false,
            targetPage: '',
            selectProfile: null,
            teacher: this.props.user,
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
            selectProfile: this.state.teacher})
            }  

    handleEditSubmit = async (e) => {
         e.preventDefault()
         console.log(this.state.teacher)
        const response = await fetch('/diary/teachers/' + this.state.teacher.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectProfile),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log(this.state.teacher)
        this.componentDidMount();
        this.setState({selectProfile: null, showProfile: true})
        console.log(this.state.teacher)
     }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/teachers/' + this.props.user.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const teacher = await response.json();        
            this.setState({ teacher, isLoading: false })       
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
                    <p><span>First name: </span>{this.state.teacher.firstName}</p>
                    <p><span>Last name: </span>{this.state.teacher.lastName}</p>
                    <p><span>JMBG: </span>{this.state.teacher.jmbg}</p>
                    <p><span>Date of birth: </span>{this.state.teacher.dateOfBirth}</p>
                    <p><span>Date of employment: </span>{this.state.teacher.dateOfEmployment}</p>
                    <p><span>Vocation: </span>{this.state.teacher.vocation}</p>
                    <p><span>Username: </span>{this.props.username}</p>
                    <p><button className="closeButton" onClick={this.props.handleProfileClose}>Close</button>
                 <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.handleProfileEdit(this.state.teacher)}>Edit</button></span></p>
              
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
export default Profile;