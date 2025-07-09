import SignInButton from "./SignInButton";

function Socials() {
  return (
    <div className="flex gap-10">
      <SignInButton provider={"google"}>
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </SignInButton>

      <SignInButton provider={"github"}>
        <img
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height="24"
          width="24"
        />
        <span>Continue with Github</span>
      </SignInButton>
    </div>
  );
}

export default Socials;
