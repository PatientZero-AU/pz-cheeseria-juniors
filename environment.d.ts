declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: string;
			DATABASE_HOST:string;
			DATABASE_PORT:string;
		}
	}
}
export {};