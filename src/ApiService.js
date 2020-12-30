import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export class ApiService {
  constructor() {
  }

  getRunLocations() {
    const url = `${API_URL}/api/v1/locations`;
    return axios.get(url).then(response => response.data);
  }

  getRunActivities(params, page = 1) {
    const url = `${API_URL}/api/v1/activities?${params}&page=${page}`;
    return axios.get(url).then(response => response.data);
  }

  getFastestRunsForRoute(routeId) {
    const url = `${API_URL}/graphql`;
    return axios({
      url: url,
      method: 'post',
      data: {
        query: `
          {
            fastestRunsForRoute(routeId: ${routeId}) {
              startDateLocal
              movingTime
              distance
              milePace
              routeRank
            }
          }
        `
      }
    }).then(response => response.data)
  }
}
