import { ValidationErrors } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';

import {
  KwErrorMessage,
  KwErrorMessages,
  KwErrorParams,
  KwNormalizedError,
} from '../types/error-messages.types';

export function normalizeReactiveErrors(errors: ValidationErrors | null): KwNormalizedError[] {
  return Object.entries(errors ?? {}).map(([key, value]) => ({
    key: key.toLowerCase(),
    params: typeof value === 'object' && value !== null ? value : {},
  }));
}

export function normalizeSignalErrors(errors: readonly ValidationError[]): KwNormalizedError[] {
  return errors.map((error) => {
    const params: KwErrorParams = { ...error };
    const { kind } = error;
    if (kind === 'minLength' || kind === 'maxLength') {
      params['requiredLength'] = (error as unknown as Record<string, unknown>)[kind];
    }
    return { key: kind.toLowerCase(), params };
  });
}

export function resolveErrorMessage(
  errors: readonly KwNormalizedError[],
  messages: KwErrorMessages | null,
): string | null {
  if (!messages || !errors.length) return null;

  const match = errors.find((error) => Object.hasOwn(messages, error.key));
  if (match) return renderMessage(messages[match.key], match.params);

  if (Object.hasOwn(messages, 'default')) {
    return renderMessage(messages['default'], errors[0].params);
  }

  return null;
}

function renderMessage(message: KwErrorMessage, params: KwErrorParams): string {
  return typeof message === 'function' ? message(params) : message;
}
