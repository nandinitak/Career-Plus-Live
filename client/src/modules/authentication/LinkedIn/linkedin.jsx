import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

function LinkedInPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: "8675x0snh4gp9d",
    redirectUri: `${window.location.origin}/dashboard`,
    onSuccess: (code) => {
      console.log("hello");
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
    scope: "openid profile email w_member_social",
    state: "123456789",
  });

  return (
    <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Sign in with Linked In"
      style={{ maxWidth: "100px", cursor: "pointer" }}
    />
  );
}
export default LinkedInPage;
