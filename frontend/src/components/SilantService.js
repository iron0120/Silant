import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export default class SilantService{
	getMachines() {
		const url = `${API_URL}/api/machines/`;
		return axios.get(url).then(response => response.data);
	}

	// getRecipe(pk) {
	// 	const url = `${API_URL}/dishes/${pk}`;
	// 	return axios.get(url).then(response => response.data);
	// }
}