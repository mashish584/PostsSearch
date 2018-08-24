const elasticSearch = require("elasticsearch");

const esClient = new elasticSearch.Client({
	host: "localhost:9200",
	log: "error"
});

// function related to es-server
const loadData = body => {
	esClient.bulk({ body }).then(response => {
		let noIndex = 0;
		response.items.map(item => {
			if (item.index && item.index.error) {
				console.log(`Index Error ${++noIndex} : ${item.index.error}`);
			}
		});
		// Log the count of index data
		console.log(`${body.length / 2 - noIndex}/${body.length / 2} items successfully indexed.`);
	});
};

const searchWithPostNameAndBody = async body => {
	// console.log("HEY");
	let response = await esClient.search({ index: "blogs", type: "comment", body });
	// console.log(`${response.took}ms taken for search.`);
	// console.log(response);
	return response.hits.hits;
};

module.exports = {
	esClient,
	loadData,
	searchWithPostNameAndBody
};
