import axios from 'axios';
const API_KEY = "live_PGOvlK1LuOs5S0w40z8idCBrNpZfWSapTpxs5aRtm9fjEM4TdJLNuUmBZjL6Xybd"
const API_URL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export const selector = document.querySelector(".breed-select");
export const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");



export const fetchCatByBreed = (breedId) => {
	loader.style.display = "flex";
	catInfo.style.display = 'none';
	selector.style.display = 'none';
	return axios.get(`${API_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.data.error);
			}
			return response;
		})
		.finally(function () {
			loader.style.display = "none";
			catInfo.style.display = 'block';
		});
}

export const fetchBreeds = () => {
	selector.style.display = 'none';
	catInfo.style.display = 'none';
	loader.style.display = "flex";
	return axios.get(`${API_URL}/breeds?api_key=${API_KEY}`)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.data.error);
			}
			return response;
		})
		.finally(function () {
			selector.style.display = 'flex';
			catInfo.style.display = 'block';
		});
}