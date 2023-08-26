import config from './config';
import server from './server';

const app = server();
app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
});
