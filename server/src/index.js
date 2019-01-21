// @flow

const http = require('http');
const express = require('express');
const SubscriptionServer = require('./utils/subscription-server');

const server = http.createServer(express());

const subscriptionServer = new SubscriptionServer({
  server
});

server.listen(4000, () => console.log('Server'));
