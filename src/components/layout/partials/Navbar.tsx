import { component$ } from "@builder.io/qwik";
import { Link, useNavigate, useContent, useLocation } from "@builder.io/qwik-city";
import { useCheckSession, useLogoutAction } from "~/routes/layout";
import MyLogo from '~/assets/images/okios_white.png?jsx';

interface NavbarProps {
  location: ReturnType<typeof useLocation>;
}

export const Navbar = component$<NavbarProps>(({ location }) => {
  const { menu } = useContent();
  const sessionData = useCheckSession();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();
  const user = sessionData.value.user;

  return (
    <nav class="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 text-gray-100 shadow backdrop-blur">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <Link href="/" class="flex flex-shrink-0 items-center">
            <picture>

              <MyLogo
                style={{
                  display: "block",
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
                />
                </picture>
            </Link>

            {/* Opciones de menú dinámico solo si el usuario NO está logueado */}
            {!user && (
              <nav class="hidden sm:ml-6 sm:flex sm:space-x-6">
                {menu && menu.items
                  ? menu.items.flatMap((section, i) =>
                      section.items?.map((item, j) => (
                        <Link
                          key={`menu-${i}-${j}`}
                          href={item.href}
                          class={{
                            'text-sm font-medium px-2 py-1 rounded transition-colors': true,
                            'text-blue-400 font-semibold': location.url.pathname === item.href,
                            'text-gray-200 hover:text-blue-400': location.url.pathname !== item.href,
                          }}
                        >
                          {item.text}
                        </Link>
                      )) ?? []
                    )
                  : null}
              </nav>
            )}

            {user && (
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard/"
                  class="inline-flex items-center border-b-2 border-blue-400 px-1 pt-1 text-sm font-medium text-gray-100 transition-colors hover:text-blue-400"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          <div class="flex items-center">
            {user ? (
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-200">{user.email}</span>

                <button
                  onClick$={async () => {
                    await logoutAction.submit();
                    navigate("/login");
                  }}
                  class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm leading-4 font-medium text-white shadow hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div class="flex items-center space-x-4">
                <Link
                  href="/login"
                  class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
                >
                  Iniciar sesión
                </Link>

                <Link
                  href="/registro"
                  class="inline-flex items-center rounded-md border border-blue-400 bg-transparent px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-900/30 hover:text-white"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
