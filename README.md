# Tectonic Precision — Civil Construction & Structural Engineering Platform

A production-ready website and backend API for civil construction and building works professionals, designed with **Tectonic Precision** (Modern Architectural Precision design system) and powered by Node.js, Express, and Supabase (PostgreSQL & Storage).

---

## 🏗️ System Architecture

```
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Supabase initialization
│   │   ├── controllers/     # REST API route handlers
│   │   ├── db/              # SQL schema, unified db adapter, and seed data
│   │   ├── middleware/      # Rate limiter & error handling
│   │   ├── routes/          # Express API route modules
│   │   ├── services/        # Email (Nodemailer), Storage (Supabase)
│   │   ├── types/           # Shared TypeScript interfaces
│   │   ├── utils/           # Response formatter & input sanitization
│   │   └── app.ts           # Express application setup
├── src/                     # Frontend (React 19 + Vite + Tailwind CSS v4)
│   ├── api/                 # API client connecting to backend endpoints
│   ├── components/          # Architectural UI components
│   ├── App.tsx              # Root application
│   ├── index.css            # Tectonic styling tokens & typography
│   └── main.tsx             # DOM mounting
├── server.ts                # Full-stack entry point (Express + Vite middlewares)
└── .env.example             # Environment variable template
```

---

## 🗄️ Database Tables (Supabase PostgreSQL)

1. **`projects`**:
   - `id`: UUID / Primary key
   - `title`: Project title
   - `location`: Site location / coordinates
   - `category`: Structural typology (e.g. Commercial, Infrastructure, Industrial)
   - `description`: Technical scope and execution summary
   - `status`: `'Completed'` | `'Ongoing'`
   - `year`: Execution timeline
   - `cover_image`: Primary project photograph URL
   - `gallery_images`: JSON array of high-resolution site photographs
   - `created_at`, `updated_at`: Timestamps

2. **`services`**:
   - `id`: UUID / Primary key
   - `title`: Service designation
   - `description`: Execution methodology & standards
   - `icon`: Structural Lucide icon token
   - `display_order`: Integer sorting sequence
   - `created_at`, `updated_at`: Timestamps

3. **`contact_messages`**:
   - `id`: UUID / Primary key
   - `name`: Contact person / firm
   - `email`: Validated email address
   - `phone`: Contact telephone
   - `message`: Project inquiry / tender description
   - `status`: `'new'` | `'read'` | `'archived'`
   - `created_at`: Timestamp

4. **`site_settings`**:
   - `id`: Primary key (`default`)
   - `business_name`, `phone`, `whatsapp`, `email`, `address`, `about_text`
   - `updated_at`: Timestamp

SQL migration script is located at: `backend/src/db/schema.sql`.

---

## 🌐 API Endpoints

### Projects
- `GET /api/projects` — Retrieve all projects (filterable by `?status=Completed` or `?status=Ongoing` and `?category=...`)
- `GET /api/projects/:id` — Retrieve single project details
- `POST /api/projects` — Create project
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Services
- `GET /api/services` — List engineering capabilities
- `GET /api/services/:id` — Get single service
- `POST /api/services` — Create service
- `PUT /api/services/:id` — Update service
- `DELETE /api/services/:id` — Delete service

### Contact & Tender Inquiries
- `POST /api/contact` — Submit inquiry (rate-limited, sanitized, triggers email notification)
- `GET /api/contact` — View contact messages

### Site Settings
- `GET /api/settings` — Get current company details
- `PUT /api/settings` — Update company details

### Storage
- `POST /api/storage/upload` — Upload cover image to Supabase Storage bucket
- `POST /api/storage/upload-gallery` — Upload multiple gallery images

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

PORT=3000
CLIENT_URL=http://localhost:3000

OWNER_EMAIL=owner@tectonic-civilworks.com
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@tectonic-civilworks.com
EMAIL_PASSWORD=secret-smtp-password
```

*Note: In local or preview environments where Supabase or SMTP credentials are not yet specified, the platform automatically activates integrated resilient fallback storage with full seed data.*
