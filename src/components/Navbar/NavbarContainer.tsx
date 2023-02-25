import { connect } from "react-redux";
import Navbar from "./Navbar";
import { AllAppStateType } from "../Redux/RedaxStore";
import { IsideinitialStateTypeForNavbar } from "../Redux/SideBarReducer";

type MapStateToPropsType = {
    sideBar:IsideinitialStateTypeForNavbar
}

export type DialogsPropsType =MapStateToPropsType

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        sideBar: state.sideBar
    }
}


export const NavbarContainer = connect(mapStateToProps)(Navbar);
export default NavbarContainer
