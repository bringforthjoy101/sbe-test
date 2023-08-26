// Import packages
import { Router } from 'express';

import env from './config';
import validate from './validate';
import { DBController, UserController } from './controllers';
import { Routes } from './types';
import { PostController } from './controllers/postController';
import { CommentController } from './controllers/commentController';

// Import function files

const routes: Router = Router();
const dbController: DBController = new DBController();
const userController: UserController = new UserController();
const postController: PostController = new PostController();
const commentController: CommentController = new CommentController();

/*************************************************************************
API CALL START
 *************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/', (req, res) => {
	return res.status(200).send('API Working');
});

routes.get(Routes.UP_DB, dbController.upTables);
routes.get(Routes.DOWN_DB, dbController.downTables);

routes.post(Routes.USERS, validate(Routes.USERS), userController.create);
routes.get(Routes.USERS, userController.retrieve);
routes.get(Routes.TOP_USERS, userController.getTopUsers);

routes.post(Routes.POSTS, validate(Routes.POSTS), postController.create);
routes.get(Routes.POSTS, postController.retrieve);

routes.post(Routes.COMMENTS, validate(Routes.COMMENTS), commentController.create);

export default routes;
