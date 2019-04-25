async function get(url, options = {}) {
  const response = await fetch(url, { ...options, method: 'GET' });
  if (!response.ok) {
    const error = await response.json();
    throw error; // TODO: Fix this super crap
  }

  const data = await response.json();

  return data;
}

export async function getItems(query = null, options = {}) {
  let q = '';
  if (query) {
    q = `?q=${query}`;
  }
  const items = await get(`http://localhost:4001/items${q}`, options);

  return items;
}

export async function getApplicants(query = null, options = {}) {
  let q = '';
  if (query) {
    q = `?q=${query}`;
  }
  const applicants = await get(`http://localhost:4001/applicants${q}`, options);

  return applicants;
}

export function putItem(item, options = {}) {
  return fetch('http://localhost:4001/items', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(item),
    ...options,
  }).then(async response => {
    const json = await response.json();
    if (!response.ok) {
      throw json; // TODO: Fix this super crap
    }
    return json;
  });
}

export function putApplicant(applicant, options = {}) {
  return fetch('http://localhost:4001/applicants', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(applicant),
    ...options,
  }).then(async response => {
    const json = await response.json();
    if (!response.ok) {
      throw json; // TODO: Fix this super crap
    }
    return json;
  });
}

export function putRequest(request, options = {}) {
  return fetch('http://localhost:4001/requests', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(request),
    ...options,
  }).then(async response => {
    const json = await response.json();
    if (!response.ok) {
      throw json; // TODO: Fix this super crap
    }
    return json;
  });
}

export function updateItem(item, id, options = {}) {
  return fetch(`http://localhost:4001/items/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(item),
    ...options,
  }).then(async response => {
    const json = await response.json();
    if (!response.ok) {
      throw json; // TODO: Fix this super crap
    }
    return json;
  });
}

export function updateApplicant(applicant, id, options = {}) {
  return fetch(`http://localhost:4001/applicants/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(applicant),
    ...options,
  }).then(async response => {
    const json = await response.json();
    if (!response.ok) {
      throw json; // TODO: Fix this super crap
    }
    return json;
  });
}
