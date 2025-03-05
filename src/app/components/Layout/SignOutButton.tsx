import { signOutAction } from "@/lib/actions/authActions";
import FormButton from "../FormButton";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <FormButton label="sign out" notFull />
    </form>
  );
}
