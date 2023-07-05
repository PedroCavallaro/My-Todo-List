import {GoogleLogin} from "@react-oauth/google"
import { GoogleOAuthProvider } from "@react-oauth/google"
import jwtDecode from "jwt-decode";

export default function Login() {
    return(
    
       <GoogleOAuthProvider clientId="388645190987-ehus75pnbprlu662kmhjidimqd4obget.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse.credential));
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />;   
       </GoogleOAuthProvider>
           
    )
};
    