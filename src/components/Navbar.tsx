import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "./ui/button";
import { Menu, User } from "lucide-react";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

// Rotas do menu
const routeList: RouteProps[] = [
  { href: "home", label: "Principal" },
  { href: "eventos", label: "Eventos" },
  { href: "resultados", label: "Resultados" },
  { href: "servicos", label: "Serviços" },
  { href: "#faq", label: "FAQ" },
  { href: "contato", label: "Contato" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Zustand - Recupera usuário e funções
  const { user, token, logout, loadStoredAuth } = useAuthStore();

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  // Extrai o primeiro nome do usuário
  const getFirstName = (name: string) => name.split(" ")[0];

  // Extrai iniciais para AvatarFallback
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return `${names[0][0]}${names[1] ? names[1][0] : ""}`.toUpperCase();
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          {/* Logo */}
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoIcon />
              SPORT BRO
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    SPORT BRO
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  {!token ? (
                    <a
                      rel="noreferrer noopener"
                      href="/login"
                      className={`w-[110px] border ${buttonVariants({
                        variant: "secondary",
                      })}`}
                    >
                      <User className="mr-2 w-5 h-5" />
                      Login
                    </a>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={`https://sportbro.com.br/uploads/${user?.img}`}
                          />
                          <AvatarFallback className="bg-gray-300 text-gray-700">
                            {getInitials(user?.nome)}
                          </AvatarFallback>
                        </Avatar>
                        {getFirstName(user.nome)}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <a href="/meus-dados">Meus Dados</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/meus-eventos">Meus Eventos</a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            logout();
                            window.location.href = "/login";
                          }}
                        >
                          Sair
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          {/* Login/Avatar Desktop */}
          <div className="hidden md:flex gap-2">
            {!token ? (
              <a
                rel="noreferrer noopener"
                href="/login"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Login
              </a>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  {getFirstName(user.nome)}
                  <Avatar>
                    <AvatarImage
                      src={`https://sportbro.com.br/uploads/${user?.img}`}
                    />
                    <AvatarFallback className="bg-gray-300 text-gray-700">
                      {getInitials(user?.nome)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="gap-4">
                  <DropdownMenuItem asChild>
                    <a href="/meus-dados">Meus Dados</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/meus-eventos">Meus Eventos</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      window.location.href = "/login";
                    }}
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
