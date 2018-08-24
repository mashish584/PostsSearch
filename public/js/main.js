{
	const searchInput = document.querySelector("#search");

	searchInput.addEventListener("input", e => {
		axios
			.get(`/api/search?q=${e.target.value}`)
			.then(response => {
				const searchResultsDiv = document.querySelector("#search-result");
				if (response.data.length == 0) {
					searchResultsDiv.innerHTML = "<div>0 items found.</div>";
					return;
				}
				let html = response.data
					.map(item => `<div><h2>${item._source.name}</h2>${item._source.body} <br/> - ${item._source.email}</div>`)
					.join("");
				searchResultsDiv.innerHTML = html;
				return;
			})
			.catch(console.error);
	});
}
