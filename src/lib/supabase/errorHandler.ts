export class DatabaseError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export function handleDatabaseError(error: unknown): never {
  console.error('Database error:', error);
  
  if (error instanceof DatabaseError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new DatabaseError(
      'Database operation failed',
      undefined,
      error
    );
  }

  throw new DatabaseError('Unknown database error');
}