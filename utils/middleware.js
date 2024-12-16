const errorHandler = (error, _, response, next) => {
	console.log("Error handler initialized:");
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "Malformed ID." });
	} else if (
		[
			"Error", // invalid email
			"ReferenceError",
			"SequelizeValidationError",
			"ValidationError",
		].includes(error.name)
	) {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "TypeError") {
		return response.status(500).json({ error: error.message });
	}

	next(error);
};

const unknownEndpointHandler = (_, response) => {
	response
		.status(404)
		.send({ error: "These are not the endpoints you are looking for..." });
};

module.exports = {
	errorHandler,
	unknownEndpointHandler,
};
