
import axios, { AxiosInstance } from 'axios'

// Создаем экземпляр Axios с указанным базовым URL
const api: AxiosInstance = axios.create({
    baseURL: '/public/expert/api/v1',
})

// Экспортируем плагин
export default defineNuxtPlugin( async () => {
    // Получаем токен авторизации из Local Storage браузера (только на клиентской стороне)
    if (process.client) {
        const authToken = localStorage.getItem('authToken')

        // Добавляем токен авторизации в заголовок каждого запроса
        api.interceptors.request.use((config) => {
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`
            }
            return config
        })
    }

    // Добавляем созданный экземпляр Axios в контекст Nuxt
    // inject('api', api)
    return {
        provide: {
            api

        }
    }
});
