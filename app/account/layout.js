import SideNavigation from "@/app/_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[16rem_1fr] md:gap-12 gap-4 h-full relative">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
