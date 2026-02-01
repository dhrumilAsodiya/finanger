// "use client";

// import { LayoutDashboard, Receipt, LineChart } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { UserButton, useUser } from "@clerk/nextjs";

// const navItems = [
//   { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { title: "Transactions", href: "/transactions", icon: Receipt },
//   { title: "Analytics", href: "/analytics", icon: LineChart },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { user } = useUser();

//   return (
//     <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white fixed left-0 top-0">
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-slate-900">Finanger.</h1>
//         <p className="text-xs text-slate-500">Personal Finance Manager</p>
//       </div>

//       <div className="flex-1 px-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={cn(
//               "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
//               pathname === item.href
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//             )}
//           >
//             <item.icon className="h-5 w-5" />
//             {item.title}
//           </Link>
//         ))}
//       </div>

//       <div className="p-4 border-t border-slate-200">
//         <div className="flex items-center gap-3">
//           <UserButton showName />
//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-slate-900">
//               {user ? user.fullName : "Loading..."}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { LayoutDashboard, Receipt, LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", href: "/transactions", icon: Receipt },
  { title: "Analytics", href: "/analytics", icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white fixed left-0 top-0">
      <div className="p-6">
        {/* I CHANGED THIS TITLE TO VERIFY THE UPDATE */}
        <h1 className="text-2xl font-bold text-indigo-600">FINANGER PRO</h1>
        <p className="text-xs text-slate-500">Personal Finance Manager</p>
      </div>

      <div className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
              pathname === item.href
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <UserButton showName />
          
          {/* Only show text if UserButton is NOT showing the name */}
          <div className="flex flex-col">
            {!user ? (
               <span className="text-xs text-slate-400">Guest</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}