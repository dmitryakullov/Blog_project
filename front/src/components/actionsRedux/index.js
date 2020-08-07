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
const putUserPageStore = (userPageStore) => {
    return {
        type: 'PUT_USER_PAGE_STATE',
        userPageStore
    }
}



const mapDispatchToProps = (dispath) => {
                    return bindActionCreators({
                        cleanStore,
                        putStore,
                        putMainPageStore,
                        putUserPageStore
                    }, dispath)
}


export default mapDispatchToProps;