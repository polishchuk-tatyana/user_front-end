import {environment} from "../Environments/environment";

export const UrlService = () => {
    const createUrl = (urlPart) => {
        return `${environment.baseUrl}${urlPart}`
    }
    return{createUrl}
}