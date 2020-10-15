/**
 * The InputCityAPI class is used to manage autocompletion on city name.
 * @class
 */
class InputCityAPI {
	/**
	 * Create an InputCityAPI instance with public key.
	 * @param {App} app - The main App instance. 
	 */
	constructor(app){
		this.app = app;
		this.key = 'woos-81a699ca-5082-3ffd-9f54-a684a4b82853';
	}
	/**
	 * Active input city listener.
	 */
	activeListener(){
		(key => {
			let previousSearch = '';
			let autocompleteService = new woosmap.localities.AutocompleteService(key);
			const inputLocalities = document.getElementById("inputCity");
			function renderPredictions({localities}, app) {
				let results = document.querySelector('.predictions');
				results.innerHTML = '';
				for (let prediction_id in localities || []) {
					if (localities.hasOwnProperty(prediction_id)) {
						let prediction = localities[prediction_id];
						let formatted_name = prediction['description'];
						let listElementLocality = document.createElement('li');
						listElementLocality.setAttribute('class', 'prediction');
						listElementLocality.setAttribute('id', prediction_id);
						listElementLocality.textContent = formatted_name;
						listElementLocality.addEventListener('click', event => {
							results.style.display = 'none';
							inputLocalities.value = prediction.description;
							const jsonData = prediction;
							app.inputDataTreatment(jsonData);
						});
						results.appendChild(listElementLocality);
					}
				}
				if(results.childElementCount == 0){
					let notFound = document.createElement('li');
					notFound.setAttribute('class', 'prediction');
					notFound.textContent = 'Aucunes villes ne correspond';
					results.appendChild(notFound);
				}
				results.style.display = 'block';
					
			}

			const that = this;
			inputLocalities.addEventListener("keyup", function (e) {
				const input = inputLocalities.value;
				if (input !== previousSearch) {
					previousSearch = input;
					let selectedItem = document.getElementById('selected-locality');
					if (inputLocalities.value.length === 0) {
						document.querySelector('.predictions').innerHTML = ''
					}
					selectedItem.innerHTML = '';
					const components = {country: 'fr'};
					autocompleteService.getQueryPredictions({
							input, components
						}, response => {
							renderPredictions(response, that.app);
						},
						(errorCode, errorText) => {
							console.error(`error ${errorCode} : ${errorText}`)
						}
					);
				}
				if(input === ''){
					const results = document.querySelector('.predictions');
					results.style.display = 'none';
				}
			});
		})(this.key);
	}
}

export default InputCityAPI;
