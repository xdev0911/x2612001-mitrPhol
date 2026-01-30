# Frontend Views Inventory

## Project Structure
- **Framework**: Nuxt 3 (Vue 3)
- **Location**: `x0101-xMixing_Nuxt/app/pages/`
- **Package**: Located in `x01-FrontEnd/` folder

---

## Main Views Directory Structure

```
x01-FrontEnd/
├── x0101-xMixing_Nuxt/          # Primary Nuxt 3 Frontend Application
│   ├── app/
│   │   ├── pages/               # All Vue page components
│   │   ├── components/          # Reusable UI components
│   │   ├── composables/         # Vue 3 composables for logic
│   │   ├── assets/              # CSS and styling
│   │   ├── middleware/          # Route middleware
│   │   └── appConfig/           # Application configuration
│   └── public/                  # Static assets
└── x0101-xMixing_Vue/           # Legacy Vue 2 application (archived)
```

---

## All Views Summary

### Core Pages

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `index.vue` | `/` | Dashboard - Shows KPIs and main statistics | ✅ Active |
| `x80-UserLogin.vue` | `/login` | User authentication login page | ✅ Active |
| `x81-UserRegister.vue` | `/register` | User registration page | ✅ Active |
| `x89-UserConfig.vue` | `/user-config` | User profile and settings configuration | ✅ Active |
| `x90-ServerStatus.vue` | `/server-status` | System health and server monitoring | ✅ Active |
| `x99-About.vue` | `/about` | Application information page | ✅ Active |

### Ingredient Management

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `x10-IngredientIntake.vue` | `/ingredient-intake` | Ingredient stock intake entry form | ✅ Active |
| `x11-IngredientConfig.vue` | `/ingredient-config` | Configure ingredient master data | ✅ Active |
| `x13-IngredientIntakeReport.vue` | `/ingredient-intake-report` | View intake history and reports | ✅ Active |

### Warehouse Management

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `x12-WarehouseConfig.vue` | `/warehouse-config` | Warehouse/plant location setup | ✅ Active |

### SKU Management

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `x20-Sku.vue` | `/sku` | Stock Keeping Unit (product) management | ✅ Active |

### Production Management

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `x30-ProductionPlan.vue` | `/production-plan` | Create and manage production schedules | ✅ Active |
| `x30-ProductionPlan/` | - | Sub-views folder for production details | 📁 Directory |
| `x30-ProductionPlan/plant-config.vue` | `/production-plan/plant-config` | Plant-specific production configuration | ✅ Active |
| `x40-PreBatch.vue` | `/pre-batch` | Pre-batch creation and management | ✅ Active |
| `x60-BatchRecheck.vue` | `/batch-recheck` | Quality assurance batch verification | ✅ Active |

### Logistics & Packing

| View File | Route | Purpose | Status |
|-----------|-------|---------|--------|
| `x50-PackingList.vue` | `/packing-list` | Packing list generation and management | ✅ Active |

---

## Key Features by Module

### 🔐 Authentication & User Management
- User login with JWT tokens
- User registration system
- User configuration/profile management
- Role-based access control (RBAC) via middleware

### 📊 Dashboard & Monitoring
- Real-time KPI display
- Active SKU count
- Ingredient stock inventory
- Pending batches overview
- Active production count
- Server health status

### 🧪 Ingredient Management System
- Intake form for adding stock
- Master ingredient configuration
- Intake history and reporting
- Warehouse location tracking

### 🏭 Production Workflow
- Production planning and scheduling
- Plant-specific configurations
- Pre-batch preparation
- Batch verification and quality checks

### 📦 Supply Chain
- SKU/Product management
- Packing list generation
- Warehouse configuration

---

## Supporting Files

### Components (`app/components/`)
- `WelcomeItem.vue` - Welcome section component
- `icons/` - Icon components for UI

### Composables (`app/composables/`)
- `useAuth.ts` - Authentication logic and permissions
- `useMQTT.ts` - MQTT integration for real-time updates

### Middleware (`app/middleware/`)
- `auth.global.ts` - Global authentication middleware for route protection

### Configuration (`app/appConfig/`)
- `config.ts` - Application-wide configuration (API endpoints, etc.)

### Styling (`app/assets/`)
- `base.css` - Base styling
- `main.css` - Main stylesheet
- `quasar-variables.sass` - Quasar framework variables

### Plugins (`app/plugins/`)
- `apexcharts.client.ts` - ApexCharts for data visualization

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Nuxt 3** | Meta-framework for Vue 3 |
| **Vue 3** | Progressive UI framework |
| **TypeScript** | Type-safe development |
| **Quasar** | Component framework |
| **ApexCharts** | Data visualization |
| **Vue Router** | Client-side routing |
| **MQTT** | Real-time messaging |
| **JWT** | Authentication tokens |

---

## Running the Application

### Installation
```bash
cd x01-FrontEnd/x0101-xMixing_Nuxt
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Testing (Playwright)
```bash
npm run test
```

---

## Navigation Flow

```
Login/Register
    ↓
Dashboard (index.vue)
    ├─→ User Config (x89)
    ├─→ Server Status (x90)
    └─→ Main Modules:
        ├─→ Ingredient Management
        │   ├─→ Intake (x10)
        │   ├─→ Config (x11)
        │   └─→ Reports (x13)
        ├─→ Warehouse Config (x12)
        ├─→ SKU Management (x20)
        ├─→ Production Planning
        │   ├─→ Plan (x30)
        │   ├─→ Plant Config (x30-sub)
        │   ├─→ Pre-Batch (x40)
        │   └─→ Batch Recheck (x60)
        └─→ Packing List (x50)
```

---

## Notes

- All views are protected by the `auth.global.ts` middleware
- API calls use the configured `appConfig.apiBaseUrl`
- The application uses role-based permissions via `useAuth().hasPermission()`
- Real-time updates may be handled via MQTT integration
- Responsive design using Quasar components

---

## Last Updated
January 31, 2026

