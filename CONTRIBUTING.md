# Guía para contribuir al proyecto

¡Bienvenido/a! Este documento explica cómo trabajar en equipo con Git y GitHub para que el proyecto sea ordenado, profesional y fácil de mantener, incluso si sos nuevo en Git.

---

## 1. Flujo de trabajo con Git

### a) Rama principal (`main`)

- La rama `main` siempre debe estar estable y lista para producción o demo.
- No se debe trabajar directamente en esta rama.

### b) Crear una rama para cada tarea

- Para trabajar en una funcionalidad o corrección, crear una nueva rama basada en `main`.
- El nombre debe ser descriptivo y seguir esta convención:

```
feature/nombre-descriptivo
fix/descripcion-del-bug
```

Ejemplo:

```bash
git checkout -b feature/login
```

### c) Hacer commits frecuentes y claros

- Cada cambio debe ser guardado con un commit.
- Los mensajes deben ser claros, en presente, y explicar qué se hizo.
- Ejemplos buenos:

  - "Agregar validación de email"
  - "Corregir error en formulario de registro"

- Ejemplos malos:

  - "Arreglos"
  - "Cambios varios"

### d) Subir la rama al repositorio remoto

```bash
git push -u origin nombre-rama
```

### e) Abrir un Pull Request (PR)

- En GitHub, abrir un PR para que otros revisen el código antes de mezclarlo con `main`.
- Esperar la revisión y aprobación de al menos un compañero.

### f) Merge a `main`

- Solo se debe hacer merge a `main` una vez aprobado el PR.
- Usar “Squash and merge” o “Rebase and merge” para mantener el historial limpio.

---

## 2. Revisión de código (Code Review)

- Los PRs deben ser revisados por al menos un miembro del equipo.
- Los comentarios y sugerencias deben ser considerados para mejorar la calidad.
- La revisión ayuda a evitar errores y a compartir conocimiento.

---

## 3. Reglas para commits

- Mensajes en presente y específicos.
- Hacer commits pequeños y atómicos, no un solo commit gigante.
- Ejemplo: "Agregar botón para enviar formulario", no "cambios".

---

## 4. Protección de ramas

- La rama `main` está protegida para evitar merges sin PR.
- No hacer merge directo a `main` sin revisión.

---

## 5. Uso de `.gitignore`

- No subir archivos que no sean necesarios (ej: `node_modules`, `.env`, compilados).
- Si usás nuevas tecnologías, mantenelo actualizado.

---

## 6. Documentación

- Mantener actualizada la documentación en la carpeta `documents/` o en `README.md`.
- Explicar cómo clonar, instalar y correr el proyecto.

---

## 7. Seguridad

- No subir datos sensibles (contraseñas, API keys).
- Usar variables de entorno para manejar secretos.

---

## 8. Tips para novatos

- Si no entendés algo de Git, preguntá antes de hacer cambios importantes.
- Usá comandos básicos:

```bash
git status    # para ver qué cambió
git add .     # para preparar cambios
git commit -m "mensaje claro"
git push      # para subir cambios
```

- Evitá trabajar directamente en `main`.

---

## Gracias por sumarte al proyecto y aportar con tu código limpio y organizado. ¡Vamos con todo! 🚀
