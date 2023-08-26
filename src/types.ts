export type FnResponseDataType = {
	status: boolean;
	message: string;
	data?: any;
};

export enum DBTables {
	USERS = 'users',
	POSTS = 'posts',
	COMMENTS = 'comments',
}

export enum ResponseMSG {
	SUCCESS = 'Success',
	ERROR = 'An error occurred:- {error}',
	RECORD_EXISTS = '{model} already exists!',
	RECORD_NOT_FOUND = '{model} not found!',
	VALIDATION_ERROR = 'Validation Error',
}

export enum Routes {
	UP_DB = '/up',
	DOWN_DB = '/down',
	USERS = '/users',
	TOP_USERS = '/users/top',
	POSTS = '/users/:id/posts',
	COMMENTS = '/posts/:postId/comments',
}
