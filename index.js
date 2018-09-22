/*
 * Index file
 */

const joi = require('joi')

module.exports = (config) => {
  const schema = joi.object().keys({
    AUTH0_URL: joi.string().uri().trim().required(),
    AUTH0_AUDIENCE: joi.string().uri().trim().required(),
    TOKEN_CACHE_TIME: joi.number().integer().min(0),
    AUTH0_CLIENT_ID: joi.string().required(),
    AUTH0_CLIENT_SECRET: joi.string().required(),
    BUSAPI_URL: joi.string().uri().trim().required(),
    KAFKA_ERROR_TOPIC: joi.string().required()
  })

  // Validate the arguments
  const result = joi.validate(config, schema)

  if (result.error) {
    throw new Error(result.error.details[0].message)
  }

  // Export functions
  return {
    // Event API functions
    postEvent: (reqBody) => {
      return require('./src/EventsApi').postEvent(config, reqBody)
    },
    postError: (reqBody) => {
      return require('./src/EventsApi').postError(config, reqBody)
    },

    // Topics API functions
    getTopics: () => {
      return require('./src/TopicsApi').getTopics(config)
    },
    headTopics: () => {
      return require('./src/TopicsApi').headTopics(config)
    },

    // Health checks API functions
    getHealth: () => {
      return require('./src/HealthChecksApi').getHealth(config)
    },
    headHealth: () => {
      return require('./src/HealthChecksApi').headHealth(config)
    },

    // Placeholder API functions
    clearPlaceholdersCache: () => {
      return require('./src/PlaceholdersApi').clearPlaceholdersCache(config)
    },

    // Service API functions
    getServices: () => {
      return require('./src/ServiceApi').getServices(config)
    },
    headServices: () => {
      return require('./src/ServiceApi').headServices(config)
    },
    createService: (reqBody) => {
      return require('./src/ServiceApi').createService(config, reqBody)
    },
    getService: (serviceName) => {
      return require('./src/ServiceApi').getService(config, serviceName)
    },
    headService: (serviceName) => {
      return require('./src/ServiceApi').headService(config, serviceName)
    },
    updateService: (serviceName, reqBody) => {
      return require('./src/ServiceApi').updateService(config, serviceName, reqBody)
    },
    patchService: (serviceName, reqBody) => {
      return require('./src/ServiceApi').patchService(config, serviceName, reqBody)
    },
    deleteService: (serviceName) => {
      return require('./src/ServiceApi').deleteService(config, serviceName)
    },

    getServicePayloads: (serviceName) => {
      return require('./src/ServiceApi').getServicePayloads(config, serviceName)
    },
    headServicePayloads: (serviceName) => {
      return require('./src/ServiceApi').headServicePayloads(config, serviceName)
    },
    createServicePayload: (serviceName, reqBody) => {
      return require('./src/ServiceApi').createServicePayload(config, serviceName, reqBody)
    },
    getServicePayload: (serviceName, payloadName) => {
      return require('./src/ServiceApi').getServicePayload(config, serviceName, payloadName)
    },
    headServicePayload: (serviceName, payloadName) => {
      return require('./src/ServiceApi').headServicePayload(config, serviceName, payloadName)
    },
    updateServicePayload: (serviceName, payloadName, reqBody) => {
      return require('./src/ServiceApi').updateServicePayload(config, serviceName, payloadName, reqBody)
    },
    patchServicePayload: (serviceName, payloadName, reqBody) => {
      return require('./src/ServiceApi').patchServicePayload(config, serviceName, payloadName, reqBody)
    },
    deleteServicePayload: (serviceName, payloadName) => {
      return require('./src/ServiceApi').deleteServicePayload(config, serviceName, payloadName)
    }

  }
}
