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
				
				immages: function (movie) {
					if (movie.backdrop_path) return `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
					return "./assets/img/image-not-found.jpg"
				},
				callApi: function (status, search1, search2) {
					if (status == "search") {
						if (!search2) {
							axios.get(`${this.uri}/search/${search1}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
								.then(result => this.arrayOfMovie = result.data.results);
						} else {
							this.arrayOfMovie = []
							axios.get(`${this.uri}/search/${search1}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
								.then(result => this.arrayOfMovie = [...this.arrayOfMovie, ...result.data.results]);
							axios.get(`${this.uri}/search/${search2}?api_key=${this.api_key}&query=${this.searchMovie}&language=${this.language}`)
								.then(result => this.arrayOfMovie = [...this.arrayOfMovie, ...result.data.results]);
						}
					}
					if (status == "discovery") {
						axios.get(`${this.uri}/discover/${search1}?api_key=${this.api_key}with_genres=${search2}&language=${this.language}`)
							.then(result => this.arrayOfMovie = result.data.results);
					}
				},
				onSearch: function (search) {
					switch (search) {
						case "movieAndTv": this.callApi("search", "movie", "tv"); break;
						case "movie": this.callApi("search", "movie"); break;
						case "tv": this.callApi("search", "tv"); break;
						case "person": this.callApi("search", "person"); break;
						default: this.callApi("search", "multi");
					}
				},
				onDiscovery: function (genre) {
					switch (genre) {
						case "movieAction": this.callApi("discovery", "movie", "28"); break;
						case "tvAnimation": this.callApi("discovery", "tv", "16"); break;
						case "movieAction": this.callApi("discovery", "movie", "28"); break;
						// default: this.callApi("multi");
					}
				},
				stelline: function (star) {
					if (star >= 0 && star < 3) return 1;
					if (star >= 3 && star < 5) return 2;
					if (star >= 5 && star < 7) return 3;
					if (star >= 7 && star < 9) return 4;
					if (star >= 9) return 5;
					return 0
				},
				stellineVuote: function (star) { return 5 - this.stelline(star) }
			},
			created: function () {
			}
		}
	);
});
