import { errorResponse, successResponse } from '../utils';
import { Request, Response } from 'express';
import { FnResponseDataType, ResponseMSG } from '../types';
import { PostsService } from '../services';
import { Result, ValidationError, validationResult } from 'express-validator';

export class PostController {
	private postsService: PostsService;

	constructor() {
		this.postsService = new PostsService();
	}

	public create = async (req: Request, res: Response) => {
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty()) return errorResponse(res, 'Validation Error', errors.array());
		const { title, content } = req.body;
		const { id } = req.params;
		try {
			const post: FnResponseDataType = await this.postsService.createPost({ title, content, userId: id });
			if (!post.status) return errorResponse(res, post.message);
			return successResponse(res, post.message, post.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};

	public retrieve = async (req: Request, res: Response) => {
		const { id } = req.params;
		console.log({ params: id });
		try {
			const posts: FnResponseDataType = await this.postsService.getUserPosts(id);
			if (!posts.status) return errorResponse(res, posts.message);
			return successResponse(res, posts.message, posts.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};
}
