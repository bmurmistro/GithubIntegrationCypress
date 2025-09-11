const { testGenAICypressTasksSetup } = require('@applitools/testgenai-cypress/tasks')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    projectId: 'va1s61',
    defaultCommandTimeout: 15000,
    eyesIsDisabled: false,
    eyesBrowser: '[{"width":1000,"height":660,"name":"chrome"}]',
    eyesFailCypressOnDiff: false,
    eyesDisableBrowserFetching: false,
    eyesTestConcurrency: 4,
    eyesRemoveDuplicateTests: false,
    universalDebug: false,
    appliConfFile: {
        testConcurrency: 4,
        browser: [
            {
                width: 1000,
                height: 660,
                name: 'chrome',
            },
        ],
        failCypressOnDiff: false,
        dontCloseBatches: true,
        apiKey: '9Q0SBkHP5TlrXa5Tzzs6jqrWiujmgecCrM5BlfDo107t0110',
        batch: {
            id: '8f7086a4-0afc-424c-aea4-21f223342fb3',
        },
    },
    eyesIsGlobalHooksSupported: false,
    eyesPort: 49370,
    isComponent: false,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    }
})
