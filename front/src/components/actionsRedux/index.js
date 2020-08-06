import { bindActionCreators } from 'redux'


const cleanStore = () => {
    return {
        type: 'CLEAN_STATE'
    };
}

const putStore = (userData) => {
    return {
        type: 'PUT_STATE',
        userData
    }
}



const mapDispatchToProps = (dispath) => {
    return bindActionCreators({cleanStore, putStore}, dispath)
}


export default mapDispatchToProps;