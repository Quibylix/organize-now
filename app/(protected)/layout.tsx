import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
