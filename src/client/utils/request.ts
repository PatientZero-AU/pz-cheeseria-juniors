import axios from 'axios';

export const baseURL = "http://localhost:9000/";

const withCredentials = true;
const timeout = 30000;

const axiosInstance = axios.create({
	baseURL,
	withCredentials,
	timeout
});

axiosInstance.interceptors.response.use(
	response => {
		return Promise.resolve(response);
	},
	error => {
		const { response } = error;
		return Promise.reject(response);
	}
);

/**
 * Requests a path, returning a promise.
 *
 * @param  {string} path       The path we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
 export default function request(options:any) {
	return axiosInstance(options)
		.then(response => response)
		.catch(error => error);
}

