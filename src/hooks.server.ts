import { NotFoundError, QueryError, DatabaseError } from '$utils/errors';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	// Log the error with context
	console.error(`Error during ${event.request.method} ${event.url.pathname}:`, error);

	// Map custom database errors to appropriate HTTP responses
	if (error instanceof NotFoundError) {
		return {
			message: error.message,
			status: 404
		};
	}

	if (error instanceof QueryError) {
		return {
			message: 'A database query error occurred',
			status: 400
		};
	}

	if (error instanceof DatabaseError) {
		return {
			message: 'Database connection issue',
			status: 503 // Service Unavailable
		};
	}

	// Default error handling
	return {
		message: 'An unexpected error occurred',
		status: 500
	};
};
