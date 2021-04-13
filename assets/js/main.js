Vue.config.devtools = true;
document.addEventListener('DOMContentLoaded', function () {
	console.log('ciao ale');
	//https://flynn.boolean.careers/exercises/api/random/mail
	var root = new Vue(
		{
			el: '#root',
			data: {
				arrayOfMovie: [],

				//#region element for API
				searchMovie: "back to the future",
				uri: "https://api.themoviedb.org/3",
				api_key: "389025e503a041a76d8fd9cd31f48057",
				language: "it-IT",
				//#endregion

			},
			methods: {
				callApi: function (search1, search2) {
					if (!search2) {
						axios.get(`${this.uri}/search/${search1}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
							.then((result) => {
								this.arrayOfMovie = result.data.results
								console.log(this.arrayOfMovie);
							});
					} else {
						this.arrayOfMovie = []
						axios.get(`${this.uri}/search/${search1}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
							.then((result) => {
								this.arrayOfMovie = [...this.arrayOfMovie, ...result.data.results]
							});

						axios.get(`${this.uri}/search/${search2}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
							.then((result) => {
								this.arrayOfMovie = [...this.arrayOfMovie, ...result.data.results]
							});
					}
				},
				onSearch: function name(search) {

					switch (search) {
						case "movieAndTv":
							this.callApi("movie", "tv")
							break;
						case "movie":
							this.callApi("movie")
							break;
						case "tv":
							this.callApi("tv")
							break;
						case "person":
							this.callApi("person")
							break;
						default:
							this.callApi("multi")
					}
				},
				stelline: function (star) {
					if (star >= 0 && star < 3) return 1;
					else if (star >= 3 && star < 5) return 2;
					else if (star >= 5 && star < 7) return 3;
					else if (star >= 7 && star < 9) return 4;
					else if (star >= 9) return 5;
					else {
						return 0
					}

				},
				stellineVuote: function (star) {
					return 5 - this.stelline(star) 
				}
			},
			created: function () {



			}
		}
	);
});
