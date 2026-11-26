# CATO!

App para conocer personas y hacer amistades en la universidad. Proyecto personal.
Es una página web que se instala en iPhone y Android desde el navegador (PWA). No usa tiendas de apps.

## Qué hace
- Cuenta con correo y contraseña (sin restricción de edad ni de correo universitario).
- Perfil: nombre, fecha de nacimiento, género, qué buscas (**Amistad** / **Conocer personas**), 1 a 3 fotos y 3 a 12 intereses.
  Opcionales: bio, carrera y semestre (se puede ocultar), rompehielo, artistas e Instagram.
- Descubrir: swipe con porcentaje de afinidad, match cuando el like es mutuo, y chat.
- Hoy: una pregunta automática al día, feed de respuestas, reacciones y **racha**.
- Reportar y bloquear.

## Cómo está hecho
Sin compilar ni instalar nada: HTML, CSS y JavaScript simples.
- `index.html`, `styles.css`, `app.js`: la app.
- `config.js`: URL y clave pública de tu proyecto de Supabase.
- `supabase/schema.sql`: tablas y reglas de seguridad.
- `manifest.webmanifest`, `sw.js`, `icons/`: para instalarla en el celular.
- `legacy/cato-artifact.html`: la primera versión (solo funcionaba dentro de Claude).
- `.claude/agents/`: agentes `Explore` (Haiku, solo lee) y `code-writer` (Sonnet, escribe código).

## Puesta en marcha
1. Crea una cuenta gratis en https://supabase.com y un proyecto nuevo.
2. En el proyecto, abre **SQL Editor > New query**, pega todo `supabase/schema.sql` y pulsa **Run**.
3. En **Authentication > Providers > Email**, apaga **Confirm email** si quieres que tus amigos entren sin confirmar el correo.
4. En **Project Settings > API** copia la **Project URL** y la clave **anon public**, y pégalas en `config.js`.
   (La clave `anon` es pública por diseño. Nunca uses la `service_role`.)
5. Sube todo a GitHub y activa **Settings > Pages > Deploy from a branch > main / (root)**.
6. Abre la dirección que te da GitHub Pages en el celular y usa **Compartir > Añadir a pantalla de inicio**.

Para probar en tu computadora sin publicar, abre `index.html` desde un servidor local.

## Colores (del logo)
Azul `#0A5CFF`, azul oscuro `#0019B8`, amarillo `#FFB400`, estrella `#FFE01B`.

## Pendiente
- Moderación de fotos y textos.
- Conexión real con Spotify.
- Eventos del campus.
