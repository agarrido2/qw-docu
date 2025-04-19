// Para incorporar los iconos tienes que realizar los siguientes pasos:
// 1. Ir a la url: 'https://icones.js.org/'
// 2. Elegir el icono que te salga de los huevos o el que más te guste.
// 3. Una vez elegido el icono, pulsa en la pestaña Download el formato Qwik y los guardas en la app.
// 4. Tendra que salir igual que esto.

import type { QwikIntrinsicElements } from "@builder.io/qwik";

export function RiApps2AddFill(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M2.5 7a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m0 10a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m10 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m3.5-6V8h-3V6h3V3h2v3h3v2h-3v3z"
      ></path>
    </svg>
  );
}

export default RiApps2AddFill