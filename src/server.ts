import express, { Application } from 'express';
import cors from 'cors';

// routes
import routes from './routes';
import config from './config';

// load the WSDL file
const server = () => {
	const app: Application = express();

	// PARSE JSON
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// ENABLE CORS AND START SERVER
	app.use(cors({ origin: true }));

	// Routes
	app.use(routes);
	return app;
};

export default server;
