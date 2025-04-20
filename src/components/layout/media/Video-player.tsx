import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';

/**
 * Componente VideoDemo
 * Muestra un video promocional con overlay animado y controles accesibles.
 * Props:
 * - src: string (ruta del video)
 * - poster: string (ruta del poster)
 * - ariaLabel: string (accesibilidad)
 */
export interface VideoPlayerProps {
  src: string;
  poster?: string;
  ariaLabel?: string;
}

export const VideoPlayer = component$<VideoPlayerProps>(({ src, poster, ariaLabel }) => {
  const isPlaying = useSignal(true); // Arranca en reproducción
  const videoRef = useSignal<HTMLVideoElement>();
  const isHovered = useSignal(false);

  // Reproduce automáticamente al montar
  useTask$(() => {
    const video = videoRef.value;
    if (video) {
      video.play();
      isPlaying.value = true;
    }
  });

  // Si el usuario pausa el video con el botón, actualiza el estado
  const toggleVideo$ = $(() => {
    const video = videoRef.value;
    if (!video) return;
    if (video.paused) {
      video.play();
      isPlaying.value = true;
    } else {
      video.pause();
      isPlaying.value = false;
    }
  });

  // Asegura que el estado se sincroniza si el usuario pausa/play con atajos del SO
  useTask$(() => {
    const video = videoRef.value;
    if (!video) return;
    const onPause = () => (isPlaying.value = false);
    const onPlay = () => (isPlaying.value = true);
    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    return () => {
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
    };
  });

  // Mostrar el botón solo si hover/focus O si está pausado (para UX móvil)
  const showButton = isHovered.value || !isPlaying.value;

  return (
    <div
      class="mt-12 relative max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl group animate-fade-in"
      onMouseEnter$={() => (isHovered.value = true)}
      onMouseLeave$={() => (isHovered.value = false)}
      onFocus$={() => (isHovered.value = true)}
      onBlur$={() => (isHovered.value = false)}
      tabIndex={-1}
    >
      <video
        ref={videoRef}
        class="w-full h-auto rounded-xl border border-gray-300"
        src={src}
        {...(poster ? { poster } : {})}
        preload="metadata"
        aria-label={ariaLabel || 'Demo de gestión documental'}
        autoplay
        loop
        muted
        playsInline
        // Sin controles nativos
      >
        Tu navegador no soporta vídeo HTML5.
      </video>
      {/* Botón cool solo visible en hover/focus o si está pausado */}
      {showButton && (
        <button
          class={
            'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none transition ' +
            (isPlaying.value
              ? 'opacity-70 hover:opacity-100 scale-90 hover:scale-110'
              : 'opacity-100 scale-100 animate-pulse')
          }
          style={{ pointerEvents: 'auto' }}
          onClick$={toggleVideo$}
          aria-label={isPlaying.value ? 'Pausar video' : 'Reproducir video'}
          type="button"
          tabIndex={0}
        >
          <span class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl rounded-full border-4 border-white ring-4 ring-blue-200/40">
            {isPlaying.value ? (
              // Botón de pausa "cool"
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white drop-shadow-lg">
                <rect x="6" y="4" width="4" height="16" rx="2" fill="#fff"/>
                <rect x="14" y="4" width="4" height="16" rx="2" fill="#fff"/>
              </svg>
            ) : (
              // Botón de play "cool"
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 drop-shadow-lg animate-pulse">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
});
