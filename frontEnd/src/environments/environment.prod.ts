export const environment = {
  production: true,
  accessToken: '_zz7MgLZ7dqWxmoKzvLf', //TODO : make sure the access token is still valid.
  useLocalStorage : false,
  enableIntroDelay: true,

  enableCronJob: true,
  downloadTable : false,

  // fetchDataEndPoint : 'http://titanic.w11k:3000/api/group',
  // fetchDateLastFetchEndPoint: 'http://titanic.w11k:3000/api/group/time-last-fetch'

  fetchDataEndPoint : '/api/group',
  fetchDateLastFetchEndPoint: '/api/group/time-last-fetch',
  checkBackend: '/api/group/test'


};
