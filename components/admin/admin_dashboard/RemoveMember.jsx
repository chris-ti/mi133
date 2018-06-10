import React,{Component} from "react";
import './Admin_Portal.css'
import {loadAllUsers,deleteUserAction} from "../../../actions/Admin_actions";
import {connect} from "react-redux";


class RemoveMember extends Component{

    componentDidMount(){
        this.props.loadAllUsers()
    }

    deleteUser(id){
        this.props.deleteUserAction(id);
    }

    render(){
        const allUsers=Object.assign([],this.props.userList);
        const adminUser= allUsers.filter( function (each) {
            return each.role === "ADMIN";
        })
        const memberUser= allUsers.filter( function (each) {
            return each.role === "MEMBER";
        })
        return <div>
            <div>
                <h2 className={"removeUserHeading"}>Remove User</h2>
                <div className={"removeUserHeadingContainer"}>
                    <div className={"adminList"}>
                        <h3 className={"adminListHeader"} >Admin</h3>
                        <div className={"AList"}>
                            { adminUser.map(data=>{
                                return <tr className={'listRemoveAdmin'} key={data._id}>
                                    <td className={"listUsernameAdmin"}>{data.username}
                                    </td>
                                    <div className={"btn btn-danger removeAdmin"} onClick={()=>this.deleteUser(data._id)} >Remove</div>
                                </tr>
                            })}
                        </div>
                    </div>
                    <div className={"memberList"}>
                        <h3 className={"memberListHeader"} >Members</h3>
                        <div className={"MList"}>
                            { memberUser.map(data=>{
                                return <tr className={'listRemoveAdmin'} key={data._id}>
                                    <td className={"listUsernameAdmin"}>{data.username}
                                    </td>
                                    <div className={"btn btn-danger removeAdmin"} onClick={()=>this.deleteUser(data._id)} >Remove</div>
                                </tr>
                            })}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    }
}

const mapStateToProps = ({userList}) => ({userList});

const mapDispatchToProps = {
    loadAllUsers,
    deleteUserAction
};
export default connect(mapStateToProps,mapDispatchToProps)(RemoveMember)