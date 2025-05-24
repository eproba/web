import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { AppLogo } from "@/components/app-logo";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogInIcon, LogOutIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { User } from "@/types/user";
import { API_URL } from "@/lib/api";
import { userSerializer } from "@/lib/serializers/user";

interface NavbarProps {
  messages?: Array<{
    tags: string;
    message: string;
  }>;
}

type NavItem = {
  title: string;
  href: string;
  subItems?: NavItem[];
  external?: boolean;
  access?: (user?: User) => boolean;
};

const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Twoje próby",
    href: "/worksheets",
    access: () => true,
  },
  {
    title: "Zarządzaj próbami",
    href: "/worksheets/manage",
    access: (user) => !!user && user.function.value >= 2,
    subItems: [
      { title: "Zarządzaj próbami", href: "/worksheets/manage" },
      { title: "Prośby o zatwierdzenie", href: "/worksheets/check-tasks" },
      { title: "Archiwum", href: "/worksheets/archive" },
      { title: "Szablony", href: "/worksheets/templates" },
      { title: "Utwórz nową próbę", href: "/worksheets/create" },
    ],
  },
  {
    title: "Admin",
    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
    access: (user) => !!user && user.isSuperuser,
    subItems: [
      {
        title: "Panel administracyjny",
        href: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
        external: true,
      },
      { title: "Zarządzaj stroną", href: "/site-management" },
      { title: "Zgłoszenia drużyn", href: "/team-requests" },
    ],
    external: true,
  },
  {
    title: "Twoja drużyna",
    href: "/team",
    access: (user) => !!user && user.function.value >= 3,
    subItems: [
      { title: "Zarządzaj drużyną", href: "/team" },
      { title: "Statystyki", href: "/team/statistics" },
    ],
  },
  {
    title: "Wiki",
    href: "/wiki",
    access: () => true,
  },
];

const MORE_NAV_ITEMS: NavItem[] = [
  { title: "O stronie", href: "/about", access: () => true },
  { title: "Kontakt", href: "/contact", access: () => true },
  {
    title: "Zgłoś błąd",
    href: "https://github.com/eproba/web-v2/issues",
    access: () => true,
    external: true,
  },
];

const AuthButtons = ({ user }: { user?: User }) => (
  <>
    <ThemeSwitch />
    {user ? (
      <>
        <form
          className="flex-1"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="destructive" className="w-full">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Wyloguj
          </Button>
        </form>
        <Link href="/profile" className="flex-1">
          <Button className="w-full bg-[#1abc9c] hover:bg-[#16a085]">
            <UserIcon className="mr-2 h-4 w-4" />
            Profil
          </Button>
        </Link>
      </>
    ) : (
      <form
        className="w-full"
        action={async () => {
          "use server";
          await signIn("eproba");
        }}
      >
        <Button className="w-full">
          <LogInIcon className="mr-2 h-4 w-4" />
          Zaloguj się
        </Button>
      </form>
    )}
  </>
);

const MobileNavItem = ({
  item,
  header,
  ...props
}: {
  item: NavItem;
  header?: boolean;
}) => (
  <Link
    href={item.href}
    {...props}
    className={cn(
      navigationMenuTriggerStyle(),
      "py-1.5 h-auto",
      header &&
        "text-xs text-muted-foreground pb-0 pt-2 h-auto pointer-events-none",
    )}
    target={item.external ? "_blank" : undefined}
  >
    {item.title}
  </Link>
);

const DesktopNavItem = ({ item }: { item: NavItem }) => (
  <NavigationMenuItem>
    {item.subItems ? (
      <>
        <Link href={item.href} target={item.external ? "_blank" : undefined}>
          <NavigationMenuTrigger className="bg-transparent">
            {item.title}
          </NavigationMenuTrigger>
        </Link>
        <NavigationMenuContent className="dark:bg-[#161b22] z-50">
          <ul className="grid gap-1 p-2 w-[240px]">
            {item.subItems.map((subItem) => (
              <NavigationMenuItem key={subItem.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.href}
                    target={subItem.external ? "_blank" : undefined}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                    )}
                  >
                    {subItem.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </>
    ) : (
      <NavigationMenuLink
        asChild
        className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
      >
        <Link href={item.href} target={item.external ? "_blank" : undefined}>
          {item.title}
        </Link>
      </NavigationMenuLink>
    )}
  </NavigationMenuItem>
);

export async function Navbar({ messages }: NavbarProps) {
  const session = await auth();

  if (session?.error === "RefreshTokenError") {
    await signOut();
    console.error("Refresh token error");
  }
  const response = await fetch(`${API_URL}/user/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const user = userSerializer(await response.json());

  const filteredMainNav = MAIN_NAV_ITEMS.filter((item) => item.access?.(user));
  const filteredMoreNav = MORE_NAV_ITEMS.filter((item) => item.access?.(user));

  return (
    <nav className="flex items-center p-4 px-5 container mx-auto gap-4 rounded-lg shadow-lg dark:bg-[#161b22]">
      <div className="flex items-center gap-4 justify-between w-full md:w-auto">
        <AppLogo />

        {/* Mobile Navigation */}
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full w-[300px] ml-auto rounded-l-lg">
            <div className="flex flex-col h-full p-4">
              <DrawerHeader className="p-0 mb-4">
                <DrawerTitle className="flex justify-between items-center">
                  <AppLogo />
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex-1 flex flex-col gap-3">
                {filteredMainNav.map((item) => (
                  <div key={item.href} className="flex flex-col gap-1">
                    <DrawerClose asChild>
                      <MobileNavItem
                        item={item}
                        header={(item.subItems?.length ?? 0) > 0}
                      />
                    </DrawerClose>
                    {item.subItems?.map((subItem) => (
                      <DrawerClose key={subItem.href} asChild>
                        <MobileNavItem item={subItem} />
                      </DrawerClose>
                    ))}
                  </div>
                ))}

                <div className="mt-4 border-t pt-2">
                  <h5 className="text-xs text-muted-foreground px-3 mb-2">
                    Więcej
                  </h5>
                  <div className="flex flex-col gap-1">
                    {filteredMoreNav.map((item) => (
                      <DrawerClose key={item.href} asChild>
                        <MobileNavItem item={item} />
                      </DrawerClose>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 justify-between items-center px-2">
                    <AuthButtons user={user} />
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 items-center justify-between">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="hidden md:flex">
            {filteredMainNav.map((item) => (
              <DesktopNavItem key={item.href} item={item} />
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Więcej
              </NavigationMenuTrigger>
              <NavigationMenuContent className="dark:bg-[#161b22] z-50">
                <ul className="grid gap-1 p-2 w-[240px]">
                  {filteredMoreNav.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent",
                          )}
                          target={item.external ? "_blank" : undefined}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex gap-2">
          <AuthButtons user={user} />
        </div>
      </div>

      {messages && messages.length > 0 && (
        <div className="absolute top-full left-0 right-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-4 mx-4 my-2 rounded-lg",
                message.tags === "error"
                  ? "bg-red-100 text-red-800"
                  : `bg-${message.tags}-100 text-${message.tags}-800`,
              )}
            >
              {message.message}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
