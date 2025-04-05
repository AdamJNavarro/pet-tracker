export class DatabaseError extends Error {
	constructor(
		message: string,
		public cause?: unknown
	) {
		super(message);
		this.name = 'DatabaseError';
	}
}

export class QueryError extends DatabaseError {
	constructor(
		message: string,
		public cause?: unknown
	) {
		super(message);
		this.name = 'QueryError';
	}
}

export class NotFoundError extends QueryError {
	constructor(entity: string, id?: string | number) {
		super(`${entity}${id ? ` with ID ${id}` : ''} not found`);
		this.name = 'NotFoundError';
	}
}
