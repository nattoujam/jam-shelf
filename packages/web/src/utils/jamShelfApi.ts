import axios from 'axios'

const jamShelfApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  },
  responseType: 'json',
})

jamShelfApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = import.meta.env.BASE_URL
    }
    return Promise.reject(error)
  },
)

export default jamShelfApi
