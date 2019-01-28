// @flow
import { $$asyncIterator } from 'iterall';
import type { ReadPreference } from 'mongodb';

import { getDb } from '../db';

type ChangeStreamOptions = {
  fullDocument?: 'default' | 'updateLookup',
  maxAwaitTimeMS?: number,
  resumeAfter?: mixed,
  batchSize?: number,
  collation?: mixed,
  readPreference?: ReadPreference
};

function changeStreamToAsyncIterator(
  collection: string,
  pipeline?: Array<mixed>,
  options?: ChangeStreamOptions
) {
  const pipelineArg = pipeline || [];
  const optionsArg = options || {};

  const changeStream = getDb()
    .collection(collection)
    .watch(pipelineArg, optionsArg);

  return {
    next() {
      if (changeStream.isClosed()) {
        return this.return();
      }
      return changeStream.next().then(data => {
        if (!data.fullDocument) {
          return { value: null, done: false };
        }
        const { _id: id, ...noId } = data.fullDocument;
        return { value: { id, ...noId }, done: false };
      });
    },
    return() {
      if (changeStream.isClosed()) {
        return Promise.resolve({ value: undefined, done: true });
      }
      return changeStream
        .close()
        .then(() => ({ value: undefined, done: true }));
    },
    throw(error: Error) {
      if (!changeStream.isClosed()) {
        changeStream.close(); // Remove this hack
      }
      return Promise.reject(error);
    },
    [$$asyncIterator]() {
      return this;
    }
  };
}

export default changeStreamToAsyncIterator;
