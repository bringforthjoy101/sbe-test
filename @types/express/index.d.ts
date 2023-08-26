export {};

declare global {
	namespace Express {
		export interface Request {
			user?: any;
			admin?: any;
			query?: any;
		}
	}
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			DB_URI: string;
		}
	}
}
