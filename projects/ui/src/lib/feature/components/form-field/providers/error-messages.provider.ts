import { Provider } from '@angular/core';

import { KW_ERROR_MESSAGES } from '../types/error-messages.token';
import { KwErrorMessages } from '../types/error-messages.types';

export function provideKwErrorMessages(messages: KwErrorMessages): Provider {
  return { provide: KW_ERROR_MESSAGES, useValue: messages };
}
