import cookie from "js-cookie";
import baseUrl2 from "@/utils/baseUrl2";
import {handleLogout} from "@/utils/auth";

export let isAuthorized = false;
export const user=null;

export const fetchUserData = async (user,setUser) => {
    console.log("Cookies ---------------->"+cookie.get("charuvidhya_users_token"));
    if(typeof cookie.get("charuvidhya_users_token") !== 'undefined' && (user === null || (typeof user) === undefined )) {

        const options = {
            headers: {
                'Authorization': 'Bearer ' + cookie.get('charuvidhya_users_token'),
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(`${baseUrl2}/api/account`, options);
        const jsonData = await response.json();
        if(typeof jsonData.firstName ==="undefined"){
            handleLogout()
        }
        else {
            isAuthorized = true;
            setUser(jsonData);
            console.log("Data@@@@@@@@@@@@@@@@@" + user + "JSON :" + jsonData);
        }
    }
};