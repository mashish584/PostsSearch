const elasticSearch = require("elasticsearch");
const esClient = new elasticSearch.Client({
	host: "localhost:9200",
	log: "error"
});

module.exports = { esClient };
