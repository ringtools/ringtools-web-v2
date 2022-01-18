/// <reference types="node" />
export const environment = {
  production: true,
  networkClass: null,
  apiEndpoint: process.env["API_ENDPOINT"] || ''
};
