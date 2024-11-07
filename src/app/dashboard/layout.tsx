import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col tablet:flex-row tablet:overflow-hidden">
      <div className="w-full flex-none tablet:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 tablet:overflow-y-auto tablet:p-12">{children}</div>
    </div>
  );
}