import axios from 'axios';

export function getUploads(data) {
    return {
        type: 'GET_UPLOADS',
        payload: data
    }

    // TODO: attach middeware for dispatching axios 
    //  return(dispatch) => {
    //     return axios.get('/api/test').then((res) => {
    //         dispatch({
    //             type: 'GET_UPLOADS',
    //             payload: res.data
    //         });
            
    //         return res.data;
    //     });
    // }
}

export function addUpload() {
    return(dispatch) => {
        return axios.post('/test', {
            image: profile_pic
        }).then((res) => {
            dispatch({
                type: 'ADD_UPLOAD',
                payload: res.data
            });

            return res.data;
        });
    }
}