import { Ref } from 'vue';
import { AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiOptions extends AxiosRequestConfig {
    method?: "get" | "post";
    params?: Record<string, unknown>;
    urlParams?: Record<string, unknown>;
}

interface Error {
    code: number;
    message: string;
}

export class ApiResponse<T> {
    error: Error | null;
    response: T;

    constructor(apiResponse: any) {
        this.error = apiResponse.error;
        this.response = apiResponse.response as T;
    }
}

const useApi = <T>(url: string) => {
    const loading = ref(false);
    const data = ref<T | null>(null) as Ref<T | null>;

    const fetchData = async (options?: ApiOptions) => {
        loading.value = true;
        data.value = null;
        try {
            const finalUrl = options?.urlParams
                ? Object.entries(options.urlParams).reduce(
                    (url, [param, value]) => url.replace(`:${param}`, String(value)),
                    url
                )
                : url;

            const response: AxiosResponse<{ response: T }> =
                options?.method === "post"
                    ? await useNuxtApp().$api.post(finalUrl, options?.params)
                    : await useNuxtApp().$api.get(finalUrl, { params: options?.params });
            data.value = response.data.response;
            return data.value;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        data,
        fetchData,
    };
};

export default useApi;