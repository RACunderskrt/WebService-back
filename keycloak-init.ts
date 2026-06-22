const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

export const keycloak = new Keycloak({ store: memoryStore });