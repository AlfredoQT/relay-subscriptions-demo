import http from 'http';
import express from 'express';
import SubscriptionServer from './utils/subscription-server';

const server = http.createServer(express());

const subscriptionServer = new SubscriptionServer({
  server: server
});

server.listen(4000, () => console.log('Server'));
