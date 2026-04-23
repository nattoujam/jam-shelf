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
      const rd = encodeURIComponent(window.location.href)
      window.location.href = `${import.meta.env.VITE_AUTH_URL}?rd=${rd}`
    }
    return Promise.reject(error)
  },
)

export default jamShelfApi
