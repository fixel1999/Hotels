# Hotels Management App

**Proyecto:** Gestión de hoteles (Backend: Java + Spring Boot, Frontend: Next.js / React)

## 1. Requisitos técnicos

- **Java:** JDK 17 o superior (recomendado Java 25). Spring Boot requiere Java 17+.
- **Maven:** 3.8+ para compilar y ejecutar el backend.
- **Node.js:** Node 21 recomendado.
- **NPM / PNPM / Yarn:** cualquiera para instalar dependencias del frontend. Se usará `npm` en los ejemplos.

---

## 2. Estructura del repositorio

```
HotelsApp/
├─ hotelsApi/            # Backend (Spring Boot)
│  ├─ src/main/java/...  # Controladores, servicios, modelos, seguridad
│  └─ src/main/resources/application.properties
└─ react-client/       # Frontend (Next.js)
   ├─ src/
   └─ package.json
```

Resumen:

- Backend: Spring Boot 3.x, JPA, Spring Security, JWT, H2 (in-memory) como DB por defecto.
- Frontend: Next.js, Chakra UI, axios para llamadas API.
- Endpoints principales (resumen):
  - `POST /api/auth/register` — registro de usuario.
  - `POST /api/auth/login` — autenticación; devuelve JWT.
  - `GET/POST/PUT/DELETE /api/hotels` — operaciones CRUD para hoteles (ver más abajo ejemplos).
- H2 Console: habilitada en `/h2-console` (JDBC url: `jdbc:h2:mem:hoteldb`, user `sa`, password vacío).

---

## 3. Instalación

### 3.1 Backend (hotelsApi)

1. Asegúrate de tener JDK 17+ y Maven instalados.
2. Desde la raíz del proyecto ejecuta:

```bash
cd hotelsApi
mvn clean install
```

Esto descargará dependencias y compilará el proyecto.

### 3.2 Frontend (react-client)

1. Instala Node.js (recomendado Node 20).
2. Desde la carpeta del cliente:

```bash
cd react-client
npm install
```

---

## 4. Ejecución (desarrollo)

### 4.1 Ejecutar backend (modo desarrollo)

```bash
cd hotelsApi
mvn spring-boot:run
```

- El backend por defecto arranca en `http://localhost:8080`.
- API base: `http://localhost:8080/api`.
- H2 console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:hoteldb`).

### 4.2 Ejecutar frontend (modo desarrollo)

```bash
cd react-client
npm run dev
```

- Frontend en `http://localhost:3000`.
- Si la aplicación cliente necesita apuntar a otro backend, exporta `NEXT_PUBLIC_API_URL`:

---

## 5. Variables de entorno y configuración relevantes

> Estas variables de entornos deben ser servidas de forma segura si se despliega a producción.

- **Backend (`application.properties`)** — ubicadas en `hotelsApi/src/main/resources/application.properties`:

  - `server.port` — puerto del backend (default 8080).
  - `spring.datasource.url` — `jdbc:h2:mem:hoteldb` por defecto.
  - `cors.allowed.origins` — orígenes permitidos para CORS (por defecto `http://localhost:3000`).
  - `jwt.secret` — secret base64 para firmar tokens JWT. **Cambiar en producción.**
  - `jwt.expiration` — tiempo de expiración (ms).

- **Frontend**:
  - `NEXT_PUBLIC_API_URL` — URL base para las llamadas API (p. ej. `http://localhost:8080/api`).

---

## 6. Endpoints principales (ejemplos)

> Prefijo base: `http://localhost:8080/api`

### Autenticación

- **Registro**

```http
POST /api/auth/register
Content-Type: application/json
{
  "username": "usuario",
  "password": "pass",
  "role": "USER" | "ADMIN"
}
```

- **Login**

```http
POST /api/auth/login
Content-Type: application/json
{
  "username": "usuario",
  "password": "pass"
}
# Respuesta: token JWT en el body (string)
```

### Hoteles (ejemplos)

- **Crear hotel**

```
POST /api/hotels
Body: HotelDTO (JSON)
```

- **Listar (paginado)**

```
GET /api/hotels?page=0&size=5&sortBy=id&sortDir=asc
```

- **Buscar por ciudad**

```
GET /api/hotels/findByCity/{city}?page=0&size=5
```

- **Actualizar dirección**

```
PUT /api/hotels/updateAddress/{id}
Body: Address JSON
```

- **Eliminar**

```
DELETE /api/hotels/delete/{id}
```

> Nota: Los endpoints requieren Authorization header con `Bearer <token>` (ver `AuthController` y configuración de seguridad).

---

## 7. Testing

Se pueden ejecutar los tests tanto del frontend como del backend de manera sencilla.

### 7.1 Frontend

```bash
cd react-client
npm run test
```

### 7.2 Backend

```bash
cd hotelsApi
mvn test
```

## 8. Sugerencias / Mejoras

- Mover `jwt.secret` a variables de entorno (no en `application.properties`) para mayor seguridad.
- Añadir perfiles de Spring (`application-dev.properties`, `application-prod.properties`) y usar una base de datos persistente para producción (Postgres/MySQL).
- Escribir tests unitarios e integrados adicionales para servicios y controladores.
- Añadir manejo de errores más descriptivo en el API (códigos y cuerpos de error).
- Añadir un panel de administración para la creación de usuarios con role de ADMIN.
