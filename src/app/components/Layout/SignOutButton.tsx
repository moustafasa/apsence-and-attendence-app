import { signOutAction } from "@/lib/actions/authActions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className=" capitalize block bg-blue-300 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300">
        sign out
      </button>
    </form>
  );
}
