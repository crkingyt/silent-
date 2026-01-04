import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, FileText, Activity, Bell, Phone, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/patient", icon: Home },
  { name: "Voice Log", href: "/voice-log", icon: Mic },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Recommendations", href: "/recommendations", icon: Activity },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Contact Doctor", href: "/contact-doctor", icon: Phone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">HealthGuard AI</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/login"
          className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
