import session from 'express-session';
import Keycloak from 'keycloak-connect';

export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, require('./keycloak.json'));