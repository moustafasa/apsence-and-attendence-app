import { signOutAction } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className=" capitalize block bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300">
        sign out
      </button>
    </form>
  );
}
