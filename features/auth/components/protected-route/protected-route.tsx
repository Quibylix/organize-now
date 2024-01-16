import { redirect } from "next/navigation";
import { isLogged } from "./services/is-logged.service";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default async function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { success } = await isLogged();

  if (!success) {
    return redirect("/login");
  }

  return <>{children}</>;
}
