Vue.config.devtools = true;
document.addEventListener('DOMContentLoaded', function () {
	console.log('ciao ale');
	//https://flynn.boolean.careers/exercises/api/random/mail
	var root = new Vue(
		{
			el: '#root',
			data: {
				titolo: "generatore di email da un posto random",
				searchMovie: "back to the future",
				arrayOfMovie: [],

			},
			methods: {
				onSearch: function name() {
					axios.get(`https://api.themoviedb.org/3/search/multi?api_key=389025e503a041a76d8fd9cd31f48057&query=${this.searchMovie}&language=it-IT`)
						.then((result) => {
							this.arrayOfMovie = result.data.results
							console.log(this.arrayOfMovie);
						});
				}
			},
			created: function () {



			}
		}
	);
});
