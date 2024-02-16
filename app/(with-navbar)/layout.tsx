import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";

type WithNavbarLayoutProps = {
  children: React.ReactNode;
};

export default function WithNavbarLayout({ children }: WithNavbarLayoutProps) {
  return <PageWithNavbar>{children}</PageWithNavbar>;
}
