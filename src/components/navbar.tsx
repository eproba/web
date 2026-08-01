import { auth, signOut } from "@/auth";
import { AppLogo } from "@/components/app-logo";
import AutoNotificationSetup from "@/components/auto-notification-setup";
import { LoginButton } from "@/components/login-button";
import {
  MoreNavMenuDesktop,
  MoreNavMenuMobile,
} from "@/components/more-nav-menu";
import { PatrolAlert } from "@/components/patrol-alert";
import { PwaInstallAlert } from "@/components/pwa-install-alert";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserHydrator } from "@/components/user-hydrator";
import { RequiredFunctionLevel } from "@/lib/const";
import { fetchCurrentUser } from "@/lib/server-api";
import { cn } from "@/lib/utils";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import { LogOutIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

type NavItem = {
  title: string;
  href: string;
  subItems?: NavItem[];
  external?: boolean;
  kind?: "bug-report";
  access?: (user?: User) => boolean;
};

const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Twoje próby",
    href: "/worksheets",
  },
  {
    title: "Zarządzaj próbami",
    href: "/worksheets/manage",
    access: (user) =>
      !!user &&
      user.function.numberValue >= RequiredFunctionLevel.WORKSHEET_MANAGEMENT,
    subItems: [
      { title: "Zarządzaj próbami", href: "/worksheets/manage" },
      { title: "Prośby o zatwierdzenie", href: "/worksheets/review" },
      { title: "Archiwum", href: "/worksheets/archive" },
      { title: "Szablony", href: "/worksheets/templates" },
      {
        title: "Utwórz nową próbę",
        href: "/worksheets/create?redirectTo=/worksheets/manage",
      },
    ],
  },
  {
    title: "Admin",
    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
    access: (user) => !!user && user.isStaff,
    subItems: [
      {
        title: "Panel administracyjny",
        href: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
        external: true,
      },
      {
        title: "Zgłoszenia drużyn",
        href: "/team/requests",
        access: (user) => !!user && user.isSuperuser,
      },
    ],
    external: true,
  },
  {
    title: "Twoja drużyna",
    href: "/team",
    access: (user) =>
      !!user &&
      user.function.numberValue >= RequiredFunctionLevel.TEAM_MANAGEMENT,
    subItems: [
      { title: "Zarządzaj drużyną", href: "/team" },
      { title: "Statystyki", href: "/team/statistics" },
    ],
  },
  {
    title: "Regulamin stopni",
    href: "/regulations/male",
    access: (user) => !!user && user.organization === Organization.Male,
  },
];

const MORE_NAV_ITEMS: NavItem[] = [
  { title: "O stronie", href: "/about" },
  { title: "Kontakt", href: "/contact" },
  { title: "Zgłoś błąd", href: "", kind: "bug-report" },
];

const AuthButtons = ({
  user,
  mobile = false,
}: {
  user?: User;
  mobile?: boolean;
}) => (
  <>
    <ThemeSwitch />
    {user ? (
      <>
        <form
          className="flex-1"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/signout" });
          }}
        >
          {mobile ? (
            <Button type="submit" variant="destructive" className="w-full">
              <LogOutIcon />
              Wyloguj
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                variant="destructive"
                className="hidden w-full xl:flex"
              >
                <LogOutIcon />
                Wyloguj
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="min-w-full xl:hidden"
                size="icon"
              >
                <LogOutIcon />
              </Button>
            </>
          )}
        </form>
        {mobile ? (
          <DrawerClose
            nativeButton={false}
            render={
              <Link
                href="/profile"
                className={cn(
                  buttonVariants(),
                  "flex-1 bg-[#1abc9c] hover:bg-[#16a085]",
                )}
              />
            }
          >
            <UserIcon />
            Profil
          </DrawerClose>
        ) : (
          <Link href="/profile" className="flex-1">
            <Button className="hidden w-full bg-[#1abc9c] hover:bg-[#16a085] xl:flex">
              <UserIcon />
              Profil
            </Button>
            <Button
              className="min-w-full bg-[#1abc9c] hover:bg-[#16a085] xl:hidden"
              size="icon"
            >
              <UserIcon />
            </Button>
          </Link>
        )}
      </>
    ) : (
      <LoginButton className="w-fit" />
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
} & Omit<ComponentProps<typeof Link>, "href">) => {
  return (
    <Link
      href={item.href}
      {...props}
      className={cn(
        navigationMenuTriggerStyle(),
        "h-auto w-full justify-start py-1.5",
        header &&
          "text-muted-foreground pointer-events-none h-auto pt-2 pb-0 text-xs",
      )}
      target={item.external ? "_blank" : undefined}
    >
      {item.title}
    </Link>
  );
};

const DesktopNavItem = ({ item }: { item: NavItem }) => {
  return (
    <NavigationMenuItem>
      {item.subItems ? (
        <>
          <NavigationMenuTrigger>
            <span className="pointer-fine:hidden">{item.title}</span>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className={cn("pointer-coarse:hidden")}
            >
              {item.title}
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-50">
              {item.subItems.map((subItem) => (
                <li key={subItem.href}>
                  <NavigationMenuLink
                    closeOnClick
                    render={
                      <Link
                        href={subItem.href}
                        target={subItem.external ? "_blank" : undefined}
                      />
                    }
                  >
                    {subItem.title}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      ) : (
        <NavigationMenuLink
          render={
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
            />
          }
          className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
        >
          {item.title}
        </NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
};

export async function Navbar() {
  let user: User | undefined = undefined;
  const session = await auth();

  // if (session?.error === "RefreshTokenError") {
  //   await signOut({ redirectTo: "/signout" });
  //   console.error("Refresh token error");
  // }

  if (session) {
    const userResults = await fetchCurrentUser();
    if (userResults.user) {
      user = userResults.user;
    }
  }

  const filteredMainNav = MAIN_NAV_ITEMS.filter(
    (item) => item.access?.(user) ?? true,
  ).map((item) => ({
    ...item,
    subItems: item.subItems?.filter(
      (subItem) => subItem.access?.(user) ?? true,
    ),
  }));

  const filteredMoreNav = MORE_NAV_ITEMS.filter(
    (item) => item.access?.(user) ?? true,
  );

  return (
    <>
      <nav className="bg-background container mx-auto flex items-center gap-4 rounded-lg p-4 px-5 shadow-lg dark:bg-[#161b22]">
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          <AppLogo />

          {/* Mobile Navigation */}
          <Drawer swipeDirection="right">
            <DrawerTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <MenuIcon className="size-6" />
              <span className="sr-only">Otwórz menu nawigacji</span>
            </DrawerTrigger>
            <DrawerContent className="ml-auto flex h-full max-w-75 flex-col p-2">
              <DrawerHeader className="mb-4 flex-row items-center justify-between">
                <DrawerTitle>
                  <AppLogo />
                </DrawerTitle>
                <DrawerClose
                  render={
                    <Button
                      aria-label="Zamknij menu nawigacji"
                      variant="ghost"
                      size="icon"
                    />
                  }
                >
                  <XIcon className="h-5 w-5" />
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {filteredMainNav.map((item) => (
                  <div key={item.href} className="flex flex-col gap-1">
                    <DrawerClose
                      nativeButton={false}
                      render={
                        <MobileNavItem
                          item={item}
                          header={(item.subItems?.length ?? 0) > 0}
                        />
                      }
                    />
                    {item.subItems?.map((subItem) => (
                      <DrawerClose
                        key={subItem.href}
                        nativeButton={false}
                        render={<MobileNavItem item={subItem} />}
                      />
                    ))}
                  </div>
                ))}

                <div className="mt-4 border-t pt-2">
                  <h5 className="text-muted-foreground mb-2 px-3 text-xs">
                    Więcej
                  </h5>
                  <div className="flex flex-col gap-1">
                    <MoreNavMenuMobile items={filteredMoreNav} />
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t pt-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 px-2">
                    <AuthButtons user={user} mobile={true} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-between md:flex">
          <NavigationMenu align="start">
            <NavigationMenuList className="hidden flex-wrap md:flex lg:flex-nowrap">
              {filteredMainNav.map((item) => (
                <DesktopNavItem key={item.href} item={item} />
              ))}

              <MoreNavMenuDesktop items={filteredMoreNav} />
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <AuthButtons user={user} mobile={false} />
          </div>
        </div>
      </nav>

      {user && !user.patrol && <PatrolAlert />}

      {/* Auto notification setup for authenticated users */}
      {user && <AutoNotificationSetup />}
      <PwaInstallAlert />
      <UserHydrator user={user} />
    </>
  );
}
