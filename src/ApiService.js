import axios from 'axios';

const API_URL = 'http://localhost:3000';

export class ApiService {
  constructor() {
  }

  getRunActivities(params, page = 1) {
    const url = `${API_URL}/api/v1/activities?${params}&page=${page}`;
    return axios.get(url).then(response => response.data);
  }
}
