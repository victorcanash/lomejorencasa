import axios from 'axios';

import envConfig from 'utils/config/env.config';

export default axios.create(
    {
        baseURL: envConfig.BACKEND_API_BASE_URL, // Base URL will be completed with the endpoints of our backend app
        responseType: 'json',
        timeout: 7000
    }
)
