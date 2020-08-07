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
const putMainPageStore = (mainPageStore) => {
    return {
        type: 'PUT_MAIN_PAGE_STATE',
        mainPageStore
    }
}



const mapDispatchToProps = (dispath) => {
    return bindActionCreators({cleanStore, putStore, putMainPageStore}, dispath)
}


export default mapDispatchToProps;