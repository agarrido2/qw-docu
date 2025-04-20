Eres un desarrollador senior especializado en Qwik y experiencia de usuario con IA. Necesito que generes el código limpio y modular de una landing page completa, moderna y responsiva para una aplicación SaaS que permite agendar citas con inteligencia artificial, disponible 24/7 para empresas de cualquier sector.

La aplicación debe reflejar que permite agendamiento tanto vía **web** como por **llamada telefónica automatizada con voz IA superhumana**. El objetivo es maximizar la conversión desde la landing y explicar claramente cómo la IA cierra citas incluso a las 4:00 a.m.

---

🧱 ESTRUCTURA DE LA LANDING (usa componentes reutilizables de Qwik):

### 1. 🎥 Hero Section (Impactante, primera impresión)
- **Título fuerte y centrado en valor**:  
  > “Tu asistente de citas 24/7 con IA: siempre disponible, nunca dormido”
- **Subtítulo claro y empático**:  
  > “Agendamientos por web o llamada automática. Atiende a tus clientes incluso cuando no estás.”
- **Botón CTA primario**:  
  > “Solicita una demo gratis”
- **Video integrado (reproductor embed)** mostrando un caso de uso: cliente interactuando con el chatbot de voz o con la interfaz web de citas
- Diseño responsivo y visualmente impactante, con llamada a la acción clara desde el primer segundo

---

### 2. 💬 Caso de uso real (sección narrativa)
- Expón el siguiente escenario:
  > “Pedro necesita una cita para reparar su coche. A las 4:00 a.m. llama al taller, es atendido por una voz IA que parece humana, conversan, agendan y ¡venta asegurada!”
- Mostrar que también puede hacerlo desde el sitio web con una interfaz amigable
- Cierre:  
  > “Un asistente que entiende, conversa y agenda — sin perder oportunidades”

---

### 3. 🧠 Sección de Beneficios (cards o íconos)
- Disponible 24/7/365
- Atención por web o llamada automatizada con IA vocal natural
- Adaptable a clínicas, salones, talleres, restaurantes, etc.
- Reduce cancelaciones, aumenta ventas
- Interacción natural: comprensión del lenguaje, propuestas adaptadas a horarios y prioridades de negocio

---

### 4. 📱 Simulador interactivo o embed
- Muestra un pequeño simulador/preview embebido o animación de la IA (opcional), representando una conversación (web o telefónica) en tiempo real.

---

### 5. 🗣 Testimonios y Casos de Uso
- Testimonio de:
  - Clínica médica: pacientes agendando de madrugada sin intervención humana.
  - Taller mecánico: llamada automatizada con voz IA que cierra citas.
- Frase potente:
  > “+40% de citas agendadas fuera del horario comercial gracias a la IA”

---

### 6. 📞 Sección “Llamadas inteligentes con IA”
- Explica brevemente:
  > “Recibe llamadas telefónicas a cualquier hora y deja que la IA conteste como un asistente humano. La voz es natural, empática y altamente entrenada para agendar, preguntar, y confirmar citas sin errores.”

---

### 7. 🚀 CTA Final
- Frase:  
  > “¿Listo para automatizar tus citas y atender sin parar?”
- Botón: “Probar gratis ahora”

---

⚙️ CONSIDERACIONES TÉCNICAS

- Usa **Qwik** & **QwikCity** siguiendo buenas prácticas de componentes reutilizables, gestion de rutas y signals.
- Componentes reutilizables (`components/landing/Hero.tsx`, `components/landing/FeatureCard.tsx`, etc.)
- Estilos con **Tailwind CSS** con la version 4.1
- Usa las mejores prácticas de Qwik.
- Si incluyes animaciones o efectos, asegúrate que sean **ligeros y controlados por el framework**.
- Código accesible, SEO friendly, semántico.
- Todo debe estar en **español neutro profesional**.

---

🧑‍💻 El resultado debe ser un proyecto Qwik funcional, modular, y listo para escalar o conectar a una API de backend si se requiere.

