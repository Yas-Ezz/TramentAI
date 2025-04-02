export class AIServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export function handleAIError(error: unknown): never {
  if (error instanceof AIServiceError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new AIServiceError('AI service error', error);
  }

  throw new AIServiceError('Unknown AI service error');
}