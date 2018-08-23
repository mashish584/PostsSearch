const https = require("https");

exports.getData = () => {
	const response = new Promise((resolve, reject) => {
		https
			.get("https://jsonplaceholder.typicode.com/comments", res => {
				const { statusCode } = res;
				if (statusCode !== 200) {
					next(new Error("Request can't be processed."));
				}
				let response = "";
				res.setEncoding("utf8");
				res.on("data", data => (response += data));
				res.on("end", () => {
					return resolve(JSON.parse(response));
				});
			})
			.on("error", err => reject(err.message));
	});

	return response;
};
