import React, {ComponentType} from "react"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AllAppStateType} from "../components/Redux/RedaxStore";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<MapStateToPropsType> {

        render() {
            let {isAuth, ...restProps} = this.props
            if (!this.props.isAuth) return <Redirect to={"./login"}/>
            return <Component {...restProps as T}/>
        }
    }

    let connectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return connectedRedirectComponent
}


//
// const [ panels, setPanels ] = useState<T[]>(defaultValues);
//
// const togglePanel = useCallback((panel: T) => {
//     if (panels.includes(panel)) {
//         setPanels(panels.filter( p => p !== panel));
//     } else {
//         setPanels([panel].concat(panels));
//     }
// }, [panels])


// const useHook = (defaultValues: any) => {
//
//
//     const [panels, setPanels] = useState<T[]>(defaultValues);
//
//     const togglePanel = useCallback((panel: T) => {
//         if (panels.includes(panel)) {
//             setPanels(panels.filter(p => p !== panel));
//         } else {
//             setPanels([panel].concat(panels));
//         }
//     }, [panels])
//
//     return [panels, togglePanel]
// }
