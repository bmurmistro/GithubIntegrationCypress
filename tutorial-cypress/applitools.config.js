module.exports = {
  testConcurrency: 4,
  //
  browser: [
    // Add browsers with different viewports
    {width: 1000, height: 660, name: 'chrome'},
    /*{iosDeviceInfo: {
          deviceName: 'iPhone XR'
        }
    },*/
    //{width: 700, height: 500, name: 'firefox'},
    //{width: 1600, height: 1200, name: 'ie11'},
    //{width: 1024, height: 768, name: 'edgechromium'},
    //{width: 800, height: 600, name: 'safari'} ,
    // Add mobile emulation devices in Portrait mode
    //{deviceName: 'iPhone X', screenOrientation: 'portrait'},
    //{deviceName: 'Pixel 2', screenOrientation: 'portrait'}
  ],
  // set batch name to the configuration
  //batchName: 'Demo',
  //branchName: 'bmurmistro/GithubIntegrationCypress/master',
  //serverUrl: 'https://testeyesapi.applitools.com',
  batchId: process.env.APPLITOOLS_BATCH_ID,
  failCypressOnDiff: false,
  dontCloseBatches: true
}
