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
            email:'',//this.props.user.note,
            isCloseClick: false,
            isEditClick: false,
            targetPage: '',
            selectProfile: null,
            parent: this.props.user,
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
            selectProfile: this.state.parent})
            }  

    handleEditSubmit = async (e) => {
         e.preventDefault()
         console.log(this.state.student)
        const response = await fetch('/diary/parents/' + this.state.parent.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectProfile),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log(this.state.parent)
        this.componentDidMount();
        this.setState({selectProfile: null, showProfile: true})
        console.log(this.state.parent)
     }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/parents/' + this.props.user.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const parent = await response.json();        
            this.setState({ parent, isLoading: false })    
            console.log(this.state.parent)   
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
        }

    }


    render() {
        return (
            <div className="profileStyl">
                {this.state.showProfile &&
                <div>                    
                    <p><span>First name: </span>{this.state.parent.firstName}</p>
                    <p><span>Last name: </span>{this.state.parent.lastName}</p>
                    <p><span>JMBG: </span>{this.state.parent.jmbg}</p>
                    <p><span>Date of birth: </span>{this.state.parent.dateOfBirth}</p>
                    <p><span>Email: </span>{this.state.parent.email}</p>
                    <p><span>Username: </span>{this.props.username}</p>
                    <p><button className="closeButton" onClick={this.props.handleProfileClose}>Close</button>
                 <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.handleProfileEdit(this.state.parent)}>Edit</button></span></p>
              
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