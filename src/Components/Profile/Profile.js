import React, { Component } from 'react';
import ProfileEdit from './ProfileEdit'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            phoneNumber: '',
            username: '',
            userId: '',
            /*
            dateOfEmployment:'',
            vocation:'',
            dateEntered:'',
            note:'',
            email:''
            */
            isCloseClick: false,
            isEditClick: false,
            targetPage: '',
            selectProfile: null,

            admin: this.props.user,
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

    //handleCancel = (e) => this.setState({ selectProfile: null, isProfileClick: true })
    handleCancel = (e) => this.setState({ selectProfile: null, showProfile: true })

/*     handleClose = () => this.setState({ isCloseClick: true })
    handleEdit = () => this.setState({ isEditClick: true }) */

    handleProfileEdit = () => {
        this.setState({ showProfile: false,
            selectProfile: this.state.admin})
            }  

    handleEditSubmit = async (e) => {
         e.preventDefault()
         console.log(this.state.admin)
        const response = await fetch('/diary/administrators/' + this.state.admin.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectProfile),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        this.componentDidMount();
        this.setState({selectProfile: null, showProfile: true})
     }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/administrators/' + this.props.user.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const admin = await response.json();
            this.setState({ admin, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
            // this.props.handleLogOut();
        }

    }


    render() {
        return (
            <div className="profileStyl">
                {this.state.showProfile &&
                <div>
                    <p><span>User id: </span>{this.state.admin.userId}</p>
                    <p><span>First name: </span>{this.state.admin.firstName}</p>
                    <p><span>Last name: </span>{this.state.admin.lastName}</p>
                    <p><span>JMBG: </span>{this.state.admin.jmbg}</p>
                    <p><span>Date of birth: </span>{this.state.admin.dateOfBirth}</p>
                    <p><span>Phone number: </span>{this.state.admin.phoneNumber}</p>
                    <p><span>Username: </span>{this.props.username}</p>
                    <p><button className="closeButton" onClick={this.props.handleProfileClose}>Close</button>
                        {/*                         <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.props.handleProfileEdit(this.props.user)}>Edit</button></span></p>
 */}                 <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.handleProfileEdit(this.state.admin)}>Edit</button></span></p>
              

                    {/*
                    <p><span>User id: </span>{this.props.userId}</p>
                    <p><span>First name: </span>{this.props.firstName}</p>
                    <p><span>Last name: </span>{this.props.lastName}</p>
                    <p><span>JMBG: </span>{this.props.jmbg}</p>
                    <p><span>Date of birth: </span>{this.props.dateOfBirth}</p>
                    <p><span>Phone number: </span>{this.props.phoneNumber}</p>
                    <p><span>Username: </span>{this.props.username}</p>
                    <p><button className="closeButton" onClick={this.props.handleProfileClose}>Close</button>
                        <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.props.handleProfileEdit(this.props.user)}>Edit</button></span></p>
                        <span style={{ float: "right" }}><button className="editProfileButton" onClick={() => this.props.handleProfileEdit(this.props.user)}>Edit</button></span></p>
*/}
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