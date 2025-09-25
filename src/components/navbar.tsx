import { auth, signIn, signOut } from "@/auth";
import { AppLogo } from "@/components/app-logo";
import AutoNotificationSetup from "@/components/auto-notification-setup";
import {
  MoreNavMenuDesktop,
  MoreNavMenuMobile,
} from "@/components/more-nav-menu";
import { PatrolAlert } from "@/components/patrol-alert";
import { PwaInstallAlert } from "@/components/pwa-install-alert";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
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
import { LogInIcon, LogOutIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
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
            <Button variant="destructive" className="w-full">
              <LogOutIcon />
              Wyloguj
            </Button>
          ) : (
            <>
              <Button variant="destructive" className="hidden w-full xl:flex">
                <LogOutIcon />
                Wyloguj
              </Button>
              <Button
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
          <DrawerClose asChild>
            <Link href="/profile" className="flex-1">
              <Button className="w-full bg-[#1abc9c] hover:bg-[#16a085]">
                <UserIcon />
                Profil
              </Button>
            </Link>
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
      <form
        className="w-full"
        action={async () => {
          "use server";
          await signIn("eproba");
        }}
      >
        <Button className="w-full">
          <LogInIcon />
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
          <Link
            href={item.href}
            target={item.external ? "_blank" : undefined}
            className="pointer-coarse:hidden"
          >
            <NavigationMenuTrigger className="bg-transparent">
              {item.title}
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuTrigger className="bg-transparent pointer-fine:hidden">
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 dark:bg-[#161b22]">
            <ul className="grid w-[240px] gap-1 p-2">
              {item.subItems.map((subItem) => (
                <NavigationMenuItem key={subItem.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={subItem.href}
                      target={subItem.external ? "_blank" : undefined}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full items-start bg-transparent",
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
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="size-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-l-lgflex ml-auto h-full w-[300px] flex-col p-4">
              <DrawerHeader className="mb-4 p-0">
                <DrawerTitle className="flex items-center justify-between">
                  <AppLogo />
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
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
          <NavigationMenu viewport={false}>
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
