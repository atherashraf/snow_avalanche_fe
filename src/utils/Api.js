import CommonUtils from "./CommonUtils";
import store from "../provider/store";
import {AlertType} from "../modules/base/store/SnackbarSlice";

export const APIs = Object.freeze({
    ACCOUNTS_API_TOKEN: "account/api/token/",
    ACCOUNTS_API_TOKEN_REFRESH: "account/api/token/refresh/"
});

class Api {
    static getURL (api) {
        console.log(process.env);
        const API_URL = "http://127.0.0.1:8000";
        return `${API_URL}/${api}`;
    }

    static async authenticationServices (data) {
        try {
            const url = Api.getURL(APIs.ACCOUNTS_API_TOKEN);
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: new Headers({
                    "X-REQUESTED-WITH": "XMLHttpRequest",
                    "Content-Type": "application/json"
                }),
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            if(response.status==200)
                return await response.json();
            else{
                const result = await response.json();
                CommonUtils.showSnackbar(result.detail, AlertType.error);
                console.error("error", result);
            }
        } catch (e) {
            console.error("Authentiction error", e);
            CommonUtils.showSnackbar("Service is not available. Please try again later", AlertType.error);
        }
    }

    static async getService (api, isJSON = true) {
        try {
            const state = store.getState();
            const headers = new Headers({
                "X-SESSION-KEY": state.user.sessionKey,
                "X-REQUESTED-WITH": "XMLHttpRequest",
                "X-LOGIN-REQUIRED": state.base.isAuthenticationRequired
            });
            const url = Api.getURL(api);
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: headers
            });
            return await this.getResponsePayload(response, isJSON);
        } catch (e) {
            CommonUtils.showSnackbar("Services are not available. Please try again later", AlertType.error);
            console.error(e);
        }
    }

    static async getPostServices (api_key, data, isJSON = true) {
        try {
            const state = store.getState();
            // const csrf_token =state.user.csrfToken;
            const headers = new Headers({
                "X-SESSION-KEY": state.user.sessionKey,
                "X-REQUESTED-WITH": "XMLHttpRequest",
                "X-CSRFToken": state.user.csrfToken,
                "X-LOGIN-REQUIRED": state.base.isAuthenticationRequired,
                "Content-Type": "application/json"
            });
            // console.log(headers);
            const url = Api.getURL(api_key);
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: headers,
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return await this.getResponsePayload(response, isJSON);
        } catch (e) {
            console.error(e);
        }
    }

    static async getResponsePayload (response, isJSON = true) {
        if (isJSON) {
            const result = await response.json();
            return result;

        } else
            return await response.text();


    }
}

export default Api;
