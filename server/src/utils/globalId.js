// @flow
import { base64, unbase64 } from './base64';

type ResolvedGlobalId = {
  type: string,
  id: string
};

export function toGlobalId(type: string, id: string): string {
  return base64([type, id].join(':'));
}

export function fromGlobalId(id: string): ResolvedGlobalId {
  const unbased = unbase64(id);

  const delimiterPos = unbased.indexOf(':');

  return {
    type: unbased.substring(0, delimiterPos),
    id: unbased.substring(delimiterPos + 1)
  };
}
