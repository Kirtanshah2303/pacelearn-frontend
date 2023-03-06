import cookie from "js-cookie";
import baseUrl2 from "@/utils/baseUrl2";
import {handleLogout} from "@/utils/auth";
import {parseCookies} from "nookies";

export let isAuthorized = false;
export let MyCourses=[]
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
        }
        await fetchMyCourses();
    }
};
export const fetchMyCourses=async () =>{
    console.log("Authorize ------------------>"+isAuthorized);
    if(isAuthorized){
        const { charuvidhya_users_token } = parseCookies();
        let bearer = 'Bearer ';
        let token = charuvidhya_users_token;
        bearer = bearer+token;
        const payload = {
            headers: { Authorization: bearer },
        };
        const response = fetch(`${baseUrl2}/api/courses/enrolled`,{
            method : "GET",
            headers : {
                Authorization: bearer
            }
        }).then(response => response.json())
            .then(result => {
                for (let course in result.enrolments) {
                    MyCourses.push(course);
                }
            })
        console.log("CourseID ------------------------>"+JSON.stringify(MyCourses));
        return MyCourses;
    }
    else{
        return null;
    }
}