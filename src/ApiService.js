import axios from 'axios';

const API_URL = 'http://localhost:3000';

export class ApiService {
  constructor() {
  }

  getRunActivities(page = 1) {
    const url = `${API_URL}/api/v1/activities?page=${page}`;
    return axios.get(url).then(response => response.data);
  }
}
