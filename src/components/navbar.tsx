import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/app-logo";
import { ThemeSwitch } from "@/components/theme-switch";
import { auth, signIn, signOut } from "@/auth";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";

interface NavbarProps {
  messages?: Array<{
    tags: string;
    message: string;
  }>;
}

export async function Navbar({ messages }: NavbarProps) {
  const session = await auth();
  const user = session?.user;

  if (session?.error === "RefreshTokenError") {
    await signOut();
    console.error("Refresh token error");
  }

  return (
    <nav className="flex items-center p-4 px-5 container mx-auto mt-4 gap-4 rounded-lg shadow-lg dark:bg-[#161b22]">
      <div className="flex items-center gap-4">
        <AppLogo />

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Main Navigation */}
      <div className="hidden md:flex flex-1 items-center justify-between">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="hidden md:flex">
            {/* Worksheets */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
              >
                <Link href="/worksheets">Twoje próby</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Manage Worksheets */}
            {user?.function && user.function >= 2 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  <Link href="/worksheets/manage">Zarządzaj próbami</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#161b22] z-50">
                  <ul className="grid gap-1 p-2 w-[240px]">
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/worksheets/manage">Zarządzaj próbami</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/worksheets/check-tasks">
                          Prośby o zatwierdzenie
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/worksheets/archive">Archiwum</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/worksheets/templates">Szablony</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/worksheets/create">Utwórz nową próbę</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Admin Section */}
            {user?.isSuperuser && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_URL}/admin`}
                    target="_blank"
                  >
                    Admin
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#161b22] z-50">
                  <ul className="grid gap-1 p-2 w-[240px]">
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_API_URL}/admin`}
                          target="_blank"
                        >
                          Panel administracyjny
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/site-management">Zarządzaj stroną</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/team-requests">Zgłoszenia drużyn</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Team Section */}
            {user?.function && user.function >= 3 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  <Link href="/teams">Twoja drużyna</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#161b22] z-50">
                  <ul className="grid gap-1 p-2 w-[240px]">
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/teams">Zarządzaj drużyną</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/team-statistics">Statystyki</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Wiki */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
              >
                <Link href="/wiki">Wiki</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* More Section */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Więcej
              </NavigationMenuTrigger>
              <NavigationMenuContent className="dark:bg-[#161b22] z-50">
                <ul className="grid gap-1 p-2 w-[240px]">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about">O stronie</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact">Kontakt</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <div className="h-px bg-gray-200 my-2" />
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="https://github.com/eproba/web/issues"
                        target="_blank"
                      >
                        Zgłoś błąd
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Navigation */}
        <div className="hidden md:flex gap-2">
          <ThemeSwitch />
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="default" className="bg-[#1abc9c] ">
                  <UserIcon />
                  Profil
                </Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit" variant="destructive">
                  <LogOutIcon />
                  Wyloguj
                </Button>
              </form>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("eproba");
                }}
              >
                <Button variant="outline" type="submit">
                  <LogInIcon />
                  Zaloguj się
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
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

      {/*/!* Verification Warnings *!/*/}
      {/*{user && (*/}
      {/*    <div className="absolute top-full left-0 right-0">*/}
      {/*        {(!user.emailVerified || (user.patrol && !user.patrol.team.isVerified)) && (*/}
      {/*            <div className="bg-yellow-100 text-yellow-800 p-4 mx-4 my-2 rounded-lg">*/}
      {/*                {!user.emailVerified && (*/}
      {/*                    <p>*/}
      {/*                        Na twój adres e-mail została wysłana wiadomość weryfikacyjna...*/}
      {/*                    </p>*/}
      {/*                )}*/}
      {/*                {!user.patrol && path !== "/select-patrol" && (*/}
      {/*                    <p>*/}
      {/*                        Nie jesteś jeszcze przypisany do żadnej jednostki...*/}
      {/*                    </p>*/}
      {/*                )}*/}
      {/*                {user.patrol && !user.patrol.team.isVerified && (*/}
      {/*                    <p>*/}
      {/*                        Twoja jednostka nie jest zweryfikowana...*/}
      {/*                    </p>*/}
      {/*                )}*/}
      {/*            </div>*/}
      {/*        )}*/}
      {/*    </div>*/}
      {/*)}*/}
    </nav>
  );
}
