const actionsRedux = {
    cleanState() {
        return {
            type: 'CLEAN_STATE'
        };
    },
    setState(userData) {
        return {
            type: 'SET_STATE',
            userData
        }
    }
}
export default actionsRedux;