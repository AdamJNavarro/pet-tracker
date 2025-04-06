import { NotFoundError, QueryError } from './errors';

// Utility function to safely execute database queries
export async function safeQuery<T>(
	queryFn: () => Promise<T>,
	errorMessage = 'Database query failed'
): Promise<T> {
	try {
		return await queryFn();
	} catch (err) {
		console.error(`${errorMessage}:`, err);
		throw new QueryError(errorMessage, err);
	}
}

// Example usage for a find operation with not found handling
export async function findOrFail<T>(
	queryFn: () => Promise<T | null>,
	entity: string,
	id?: string | number
): Promise<T> {
	const result = await safeQuery(queryFn);
	if (!result) {
		throw new NotFoundError(entity, id);
	}
	return result;
}
