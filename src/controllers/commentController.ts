import { errorResponse, successResponse } from '../utils';
import { Request, Response } from 'express';
import { FnResponseDataType, ResponseMSG } from '../types';
import { CommentsService } from '../services';
import { Result, ValidationError, validationResult } from 'express-validator';

export class CommentController {
	private commentsService: CommentsService;

	constructor() {
		this.commentsService = new CommentsService();
	}

	public create = async (req: Request, res: Response) => {
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty()) return errorResponse(res, 'Validation Error', errors.array());
		const { content } = req.body;
		const { postId } = req.params;
		try {
			const comment: FnResponseDataType = await this.commentsService.createComment({ content, postId });
			if (!comment.status) return errorResponse(res, comment.message);
			return successResponse(res, comment.message, comment.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};
}
