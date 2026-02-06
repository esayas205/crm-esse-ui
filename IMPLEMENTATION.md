# CRM Angular Application - Implementation Guide

## Overview

This is a comprehensive Angular CRM application built with standalone components, Angular Router, HttpClient, RxJS patterns, and Reactive Forms. The application follows a clean feature-folder structure and implements centralized API handling with interceptors.

## What Has Been Implemented

### ✅ Core Infrastructure

1. **Environment Configuration** (`src/environments/environment.ts`)
   - API base URL: `http://localhost:8080`
   - Centralized configuration

2. **HTTP Interceptor** (`src/app/core/interceptors/api.interceptor.ts`)
   - Automatic URL prefixing for `/api` requests
   - Centralized error handling with toast notifications
   - Integrated with ToastService

3. **Toast Service & Component** (`src/app/shared/`)
   - Signal-based notification system
   - Auto-dismiss after 5 seconds
   - Success, error, and info message types
   - Animated toast notifications

4. **Pagination Component** (`src/app/shared/components/pagination.component.ts`)
   - Reusable pagination with page navigation
   - Configurable page size (10, 20, 50, 100)
   - Shows item range and total count

### ✅ Layout & Navigation

5. **Main Layout** (`src/app/layout/main-layout.component.ts`)
   - Left sidebar navigation with active route highlighting
   - Responsive design
   - Includes: Dashboard, Accounts, Contacts, Leads, Opportunities, Activities, Settings

6. **Routing Configuration** (`src/app/app.routes.ts`)
   - Lazy-loaded components
   - Nested routes for detail and edit pages
   - Default redirect to dashboard

7. **App Configuration** (`src/app/app.config.ts`)
   - HttpClient with interceptors
   - Router configuration
   - Global error listeners

### ✅ Accounts Feature (Complete)

**Models** (`src/app/features/accounts/models/account.model.ts`)
- Account, Contact, Activity interfaces
- PageResponse generic type

**Service** (`src/app/features/accounts/services/accounts.service.ts`)
- `GET /api/accounts?search=&page=0&size=20&sort=accountName,asc`
- `GET /api/accounts/:id`
- `POST /api/accounts`
- `PUT /api/accounts/:id`
- `DELETE /api/accounts/:id`
- `GET /api/accounts/:id/contacts?page=0&size=20`
- `GET /api/accounts/:id/activities?type=CALL&completed=false&page=0&size=20`

**Components**
1. **AccountsListComponent** - List view with:
   - Debounced search (300ms)
   - Sortable columns (accountName)
   - Pagination
   - Table columns: accountName, industry, website, phone, status
   - Loading, error, and empty states

2. **AccountDetailComponent** - Detail view with:
   - Account information display
   - Edit and Delete actions
   - Tabs: Contacts and Activities
   - Activity filters (type, completed status)
   - Pagination for both tabs

3. **AccountFormComponent** - Create/Edit form with:
   - Reactive forms with validation
   - Fields: accountName*, industry, website, phone, billingAddress, shippingAddress, status
   - Form validation and error messages
   - Cancel and Save actions

### ✅ Leads Feature (Complete)

**Models** (`src/app/features/leads/models/lead.model.ts`)
- Lead, Activity, ConvertLeadResponse interfaces

**Service** (`src/app/features/leads/services/leads.service.ts`)
- `GET /api/leads?status=NEW&source=WEBSITE&searchTerm=&ownerUser=&page=0&size=20`
- `GET /api/leads/:id`
- `POST /api/leads`
- `PUT /api/leads/:id`
- `POST /api/leads/:id/convert`
- `DELETE /api/leads/:id`
- `GET /api/leads/:id/activities?type=MEETING&completed=false&page=0&size=20`

**Components**
1. **LeadsListComponent** - List view with:
   - Multiple filters: status, source, searchTerm (debounced), ownerUser (debounced)
   - Pagination
   - Status badges with color coding
   - Table columns: company, contactName, email, phone, source, status, owner

2. **LeadDetailComponent** - Detail view with:
   - Lead information display
   - Convert Lead button (creates Account, Contact, Opportunity)
   - Edit and Delete actions
   - Activities panel with filters
   - Pagination for activities

3. **LeadFormComponent** - Create/Edit form with:
   - Reactive forms with validation
   - Fields: company*, contactName*, email, phone, source, status, ownerUser
   - Dropdown selects for source and status

### ✅ Opportunities Feature (Partial)

**Models** (`src/app/features/opportunities/models/opportunity.model.ts`)
- Opportunity, Activity interfaces

**Service** (`src/app/features/opportunities/services/opportunities.service.ts`)
- `GET /api/opportunities?stage=QUALIFICATION&accountId=1&startDate=2024-01-01&endDate=2024-12-31&minAmount=1000&maxAmount=50000&page=0&size=20`
- `GET /api/opportunities/:id`
- `POST /api/opportunities`
- `PUT /api/opportunities/:id`
- `PATCH /api/opportunities/:id/stage?stage=CLOSED_WON`
- `DELETE /api/opportunities/:id`
- `GET /api/opportunities/:id/activities?type=TASK&completed=false&page=0&size=20`

**Components**
1. **OpportunitiesListComponent** - List view with:
   - Multiple filters: stage, accountId, startDate, endDate, minAmount, maxAmount
   - Pagination
   - Table columns: name, stage, amount, closeDate, probability, accountId

### ✅ Dashboard & Settings

**DashboardComponent** - Placeholder with metric cards
**SettingsComponent** - Placeholder page

## What Needs to Be Completed

### 🔨 Opportunities Feature (Remaining)

**Components to Create:**

1. **OpportunityDetailComponent** (`src/app/features/opportunities/components/opportunity-detail.component.ts`)
   ```typescript
   // Similar to AccountDetailComponent
   // Display opportunity information
   // "Advance Stage" dropdown calling PATCH /api/opportunities/:id/stage?stage=...
   // Activities panel with filters
   // Edit and Delete actions
   ```

2. **OpportunityFormComponent** (`src/app/features/opportunities/components/opportunity-form.component.ts`)
   ```typescript
   // Similar to AccountFormComponent
   // Fields: name*, stage, amount, closeDate, probability, accountId
   // Reactive forms with validation
   ```

**Routes to Add** (in `app.routes.ts`):
```typescript
{
  path: 'opportunities/create',
  loadComponent: () => import('./features/opportunities/components/opportunity-form.component').then(m => m.OpportunityFormComponent)
},
{
  path: 'opportunities/:id',
  loadComponent: () => import('./features/opportunities/components/opportunity-detail.component').then(m => m.OpportunityDetailComponent)
},
{
  path: 'opportunities/:id/edit',
  loadComponent: () => import('./features/opportunities/components/opportunity-form.component').then(m => m.OpportunityFormComponent)
}
```

### 🔨 Contacts Feature (Complete Implementation Needed)

**Models** (`src/app/features/contacts/models/contact.model.ts`)
```typescript
export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  accountId?: number;
  isPrimaryContact?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactListResponse {
  content: Contact[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
```

**Service** (`src/app/features/contacts/services/contacts.service.ts`)
- `GET /api/contacts?search=&page=0&size=20`
- `GET /api/contacts/:id`
- `POST /api/contacts`
- `PUT /api/contacts/:id`
- `DELETE /api/contacts/:id`
- `GET /api/contacts/:id/activities?type=EMAIL&completed=true&page=0&size=20`

**Components to Create:**
1. **ContactsListComponent** - List with search and pagination
2. **ContactDetailComponent** - Detail with activities panel
3. **ContactFormComponent** - Create/Edit form with fields: firstName*, lastName*, email, phone, jobTitle, accountId, isPrimaryContact

**Routes to Add:**
```typescript
{
  path: 'contacts',
  loadComponent: () => import('./features/contacts/components/contacts-list.component').then(m => m.ContactsListComponent)
},
{
  path: 'contacts/create',
  loadComponent: () => import('./features/contacts/components/contact-form.component').then(m => m.ContactFormComponent)
},
{
  path: 'contacts/:id',
  loadComponent: () => import('./features/contacts/components/contact-detail.component').then(m => m.ContactDetailComponent)
},
{
  path: 'contacts/:id/edit',
  loadComponent: () => import('./features/contacts/components/contact-form.component').then(m => m.ContactFormComponent)
}
```

### 🔨 Activities Feature (Complete Implementation Needed)

**Models** (`src/app/features/activities/models/activity.model.ts`)
```typescript
export interface Activity {
  id?: number;
  type: string; // CALL, EMAIL, MEETING, TASK
  subject: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  outcome?: string;
  leadId?: number;
  contactId?: number;
  accountId?: number;
  opportunityId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityListResponse {
  content: Activity[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
```

**Service** (`src/app/features/activities/services/activities.service.ts`)
- `GET /api/activities?completed=false&type=CALL&startDate=2024-01-01T00:00:00&endDate=2024-12-31T23:59:59&leadId=1&opportunityId=1&accountId=1&contactId=1&page=0&size=20`
- `GET /api/activities/:id`
- `POST /api/activities`
- `PUT /api/activities/:id`
- `PATCH /api/activities/:id/complete?outcome=...`
- `DELETE /api/activities/:id`

**Components to Create:**
1. **ActivitiesListComponent** - List with filters: completed, type, date range, leadId, opportunityId, accountId, contactId
2. **ActivityDetailComponent** - Detail view with complete action
3. **ActivityFormComponent** - Create/Edit form with fields: type*, subject*, description, dueDate, completed, leadId/contactId/accountId/opportunityId

**Routes to Add:**
```typescript
{
  path: 'activities',
  loadComponent: () => import('./features/activities/components/activities-list.component').then(m => m.ActivitiesListComponent)
},
{
  path: 'activities/create',
  loadComponent: () => import('./features/activities/components/activity-form.component').then(m => m.ActivityFormComponent)
},
{
  path: 'activities/:id',
  loadComponent: () => import('./features/activities/components/activity-detail.component').then(m => m.ActivityDetailComponent)
},
{
  path: 'activities/:id/edit',
  loadComponent: () => import('./features/activities/components/activity-form.component').then(m => m.ActivityFormComponent)
}
```

## Project Structure

```
angular-app/src/app/
├── core/
│   ├── interceptors/
│   │   └── api.interceptor.ts          ✅ Complete
│   ├── services/
│   └── models/
├── shared/
│   ├── components/
│   │   ├── pagination.component.ts     ✅ Complete
│   │   └── toast.component.ts          ✅ Complete
│   └── services/
│       └── toast.service.ts            ✅ Complete
├── features/
│   ├── accounts/                       ✅ Complete
│   │   ├── components/
│   │   │   ├── accounts-list/
│   │   │   │   ├── accounts-list.component.ts
│   │   │   │   ├── accounts-list.component.html
│   │   │   │   └── accounts-list.component.css
│   │   │   ├── account-detail/
│   │   │   │   ├── account-detail.component.ts
│   │   │   │   ├── account-detail.component.html
│   │   │   │   └── account-detail.component.css
│   │   │   └── account-form/
│   │   │       ├── account-form.component.ts
│   │   │       ├── account-form.component.html
│   │   │       └── account-form.component.css
│   │   ├── services/
│   │   │   └── accounts.service.ts
│   │   └── models/
│   │       └── account.model.ts
│   ├── leads/                          ✅ Complete
│   │   ├── components/
│   │   │   ├── leads-list/
│   │   │   │   ├── leads-list.component.ts
│   │   │   │   ├── leads-list.component.html
│   │   │   │   └── leads-list.component.css
│   │   │   ├── lead-detail/
│   │   │   │   ├── lead-detail.component.ts
│   │   │   │   ├── lead-detail.component.html
│   │   │   │   └── lead-detail.component.css
│   │   │   └── lead-form/
│   │   │       ├── lead-form.component.ts
│   │   │       ├── lead-form.component.html
│   │   │       └── lead-form.component.css
│   │   ├── services/
│   │   │   └── leads.service.ts
│   │   └── models/
│   │       └── lead.model.ts
│   ├── opportunities/                  🔨 Partial
│   │   ├── components/
│   │   │   ├── opportunities-list/
│   │   │   │   ├── opportunities-list.component.ts
│   │   │   │   ├── opportunities-list.component.html
│   │   │   │   └── opportunities-list.component.css
│   │   │   ├── opportunity-detail.component.ts  ❌ TODO
│   │   │   └── opportunity-form.component.ts    ❌ TODO
│   │   ├── services/
│   │   │   └── opportunities.service.ts         ✅
│   │   └── models/
│   │       └── opportunity.model.ts             ✅
│   ├── contacts/                       ❌ TODO
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── activities/                     ❌ TODO
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── dashboard/                      ✅ Placeholder
│   │   └── components/
│   │       └── dashboard/
│   │           ├── dashboard.component.ts
│   │           ├── dashboard.component.html
│   │           └── dashboard.component.css
│   └── settings/                       ✅ Placeholder
│       └── components/
│           └── settings/
│               ├── settings.component.ts
│               ├── settings.component.html
│               └── settings.component.css
├── layout/
│   └── main-layout.component.ts        ✅ Complete
├── app.routes.ts                       ✅ Configured (needs additions)
├── app.config.ts                       ✅ Complete
├── app.ts                              ✅ Complete
└── app.html                            ✅ Complete
```

## Key Patterns & Best Practices Used

### 1. Standalone Components
All components use `standalone: true` with explicit imports.

### 2. Signal-Based State Management
Using Angular signals for reactive state:
```typescript
accounts = signal<Account[]>([]);
loading = signal(false);
error = signal('');
```

### 3. RxJS Patterns
- **debounceTime**: Search inputs debounced by 300ms
- **distinctUntilChanged**: Prevent duplicate API calls
- **switchMap**: Cancel previous requests (can be added)
- **catchError**: Centralized in interceptor

### 4. Reactive Forms
All forms use `FormBuilder` and `FormGroup` with validators:
```typescript
this.accountForm = this.fb.group({
  accountName: ['', Validators.required],
  industry: [''],
  // ...
});
```

### 5. Lazy Loading
Routes use dynamic imports for code splitting:
```typescript
loadComponent: () => import('./features/accounts/...').then(m => m.AccountsListComponent)
```

### 6. Consistent Component Structure
Each feature follows the same pattern:
- List component with filters, search, pagination
- Detail component with tabs/panels
- Form component for create/edit (shared)

## Running the Application

### Prerequisites
- Node.js 18+ and npm
- Backend API running at `http://localhost:8080` with CORS enabled

### Development Server
```bash
cd angular-app
npm install
npm start
```

Navigate to `http://localhost:4200/`

### Build
```bash
npm run build
```

## API Contract Summary

All endpoints follow the pattern:
- **List**: `GET /api/{resource}?filters&page=0&size=20`
- **Get**: `GET /api/{resource}/:id`
- **Create**: `POST /api/{resource}`
- **Update**: `PUT /api/{resource}/:id`
- **Delete**: `DELETE /api/{resource}/:id`
- **Related**: `GET /api/{resource}/:id/{related}?filters&page=0&size=20`

Special endpoints:
- `POST /api/leads/:id/convert` - Convert lead to account/contact/opportunity
- `PATCH /api/opportunities/:id/stage?stage=...` - Update opportunity stage
- `PATCH /api/activities/:id/complete?outcome=...` - Mark activity complete

## Next Steps to Complete

1. **Finish Opportunities Feature**
   - Create `opportunity-detail.component.ts`
   - Create `opportunity-form.component.ts`
   - Add routes to `app.routes.ts`

2. **Implement Contacts Feature**
   - Create models, service, and all three components
   - Add routes
   - Update route in `app.routes.ts` (currently points to dashboard)

3. **Implement Activities Feature**
   - Create models, service, and all three components
   - Add routes
   - Update route in `app.routes.ts` (currently points to dashboard)

4. **Enhance Dashboard**
   - Add real metrics from API
   - Add charts/graphs
   - Add recent activities widget

5. **Testing**
   - Test all CRUD operations
   - Test filters and pagination
   - Test form validations
   - Test error handling

## Component Templates Reference

For consistency, follow these patterns when creating remaining components:

### List Component Pattern
- Search input with debounce
- Filter dropdowns/inputs
- Data table with clickable rows
- Pagination component
- Loading/error/empty states
- Create button

### Detail Component Pattern
- Header with title and actions (Edit, Delete)
- Info section with grid layout
- Tabs or panels for related data
- Activities panel with filters
- Special actions (Convert, Advance Stage, Complete)

### Form Component Pattern
- Reactive form with FormBuilder
- Field validation and error messages
- Cancel and Save buttons
- Loading state during submission
- Success/error toast notifications

## Styling Notes

The application uses inline styles with a consistent design system:
- Primary color: `#1976d2`
- Success: `#4caf50`
- Error: `#f44336`
- Warning: `#ff9800`
- Gray scale: `#f5f5f5`, `#e0e0e0`, `#666`, `#333`

All components follow the same spacing and layout patterns for consistency.

## Conclusion

The foundation of the CRM application is complete with:
- ✅ Core infrastructure (interceptors, services, shared components)
- ✅ Layout and navigation
- ✅ Accounts feature (100%)
- ✅ Leads feature (100%)
- 🔨 Opportunities feature (60%)
- ❌ Contacts feature (0%)
- ❌ Activities feature (0%)

The remaining work follows established patterns and can be completed by replicating the structure of the Accounts and Leads features.
