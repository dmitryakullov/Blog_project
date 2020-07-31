import { bindActionCreators } from 'redux'


const cleanState = () => {
    return {
        type: 'CLEAN_STATE'
    };
}

const putState = (userData) => {
    return {
        type: 'SET_STATE',
        userData
    }
}


const mapDispatchToProps = (dispath) => {
    return bindActionCreators({cleanState, putState}, dispath)
}


export default mapDispatchToProps;