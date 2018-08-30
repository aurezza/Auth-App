const login = ( 
    state={
        upload: [
            {
                id: 1,
                name: 'custom-img',
                extension: 'jpg'
            },
            {
                id: 2,
                name: 'custom-img2',
                extension: 'jpg'
            }
        ],
        files: null
    }, 
    action={})  => {
        let newState = {...state};

        const uploadFactory = {
            returnState: returnState,
            GET_UPLOADS: getUploads,
            ADD_UPLOAD: addUpload
        }

        function returnState() {
            return state;
        }

        function getUploads() {
            console.log('uploads list...')
            newState.files = action.payload;
            console.log('newstate: ', newState);
            return newState;
        }

        function addUpload() {
            console.log('adding upload...');
            state.upload.push(action.payload);
            return newState;
        }
        
    return (uploadFactory[action.type] || uploadFactory.returnState)(state, action);
}

export default login;