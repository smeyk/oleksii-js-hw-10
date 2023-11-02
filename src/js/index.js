import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import { selector, catInfo } from './cat-api';




let breedsIdArr = [];
fetchBreeds()
	.then(data => {
		data.data.map(element => {
			breedsIdArr.push({ text: element.name, value: element.id });
		});

		new SlimSelect({
			select: selector,
			data: breedsIdArr
		});
	})
	.catch(onFetchError);


const onSelectedBreed = (event) => {
	//selector.style.display = "none"
	const breedId = event.currentTarget.value;
	fetchCatByBreed(breedId)
		.then(data => {
			const { url, breeds } = data.data[0];
			catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
		})
		.catch(onFetchError);
}

function onFetchError() {
	Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
		position: 'center-center',
		timeout: 5000,
		width: '400px',
		fontSize: '24px'
	});
};



selector.addEventListener("change", onSelectedBreed);

