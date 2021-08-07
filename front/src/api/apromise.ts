import axios, { AxiosPromise } from 'axios'
// import { plainToClass } from 'class-transformer'

// A helper that converts an Axios promise to a typed Typescript promise. The
// specified type must be a class.

export default <T>(c: any, axiosPromise: AxiosPromise): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        axiosPromise
            .then(response => {
                // resolve(plainToClass(c, response.data as T))
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    reject({
                        status: error.response.status,
                        message: error.response.data,
                    })
                } else if (error.request) {
                    // The request was made but no response was received. `error.request`
                    // is an instance of XMLHttpRequest in the browser and an instance
                    // of http.ClientRequest in node.js
                    reject({
                        status: 444,
                        message: 'The request was made but no response was received',
                    })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    reject({
                        status: 417,
                        message: 'Something happened in setting up the request that triggered an Error',
                    })
                }
            })
    })
}