import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

function fetchFunction(request, variables) {
  return fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: request.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json();
  });
}

function subscribeFunction(request, variables, cacheConfig, observer) {
  const subscriptionClient = new SubscriptionClient('ws://localhost:4000/', {
    reconnect: true
  });
  const subscription = subscriptionClient
    .request({
      query: request.text,
      operationName: request.name,
      variables
    })
    .subscribe(observer.onNext, observer.onError, observer.onCompleted);

  return {
    dispose() {
      subscription.unsubscribe();
    }
  };
}

const network = Network.create(fetchFunction, subscribeFunction);

const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store
});

export default environment;
