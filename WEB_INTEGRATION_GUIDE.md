# DirectGo — Web Frontend Integration Guide

**Audience:** External web developer building the customer-facing website for DirectGo.
**Scope:** Customer-only flows (book a ride, manage account, pay, rate). Driver, fleet operator, and admin tooling are out of scope and not accessible with a customer account.
**Version:** 1.0 — last updated 2026-04-27.

---

## 1. Project context

DirectGo is a Turkish on-demand transportation platform offering four service categories: **TAKSI** (street taxi), **NAKLIYE** (moving / freight), **YOL_YARDIM** (roadside assistance), **TRANSFER** (airport / scheduled transfer). The mobile apps (iOS / Android) are already live; the website is a third client against the same backend, similar to Uber's web app.

For v1 of the website, prioritize **TAKSI**. The other categories share the same booking shape with different `service_type_code` values.

---

## 2. Recommended stack

You're free to choose, but this is what fits cleanly:

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** TailwindCSS
- **Data fetching:** TanStack Query or SWR for REST, native `WebSocket` API for live updates
- **Maps:** Google Maps JavaScript API (same provider as mobile — fares + ETAs match)
- **Payments:** iyzico **hosted Checkout Form** (do **not** collect card numbers on your forms)
- **State / auth:** httpOnly cookies for tokens (do not use `localStorage`)
- **i18n:** Turkish primary, structure for `tr-TR` / `en-US` from day one

---

## 3. Quick-start checklist

Before writing any UI, confirm you have:

- [ ] Staging API base URL + WebSocket base URL
- [ ] A test passenger account (phone + password)
- [ ] An iyzico **sandbox** test card: `5528790000000008`, expiry `12/30`, CVC `123`
- [ ] A Google Maps JS API key restricted to your dev / staging origins
- [ ] Your dev origin (e.g. `http://localhost:3000`) and staging origin added to the backend CORS allowlist (request from us)

---

## 4. Environments

| Environment | API base | WebSocket base |
|---|---|---|
| Local dev | _provided separately_ | _provided separately_ |
| Staging | `https://staging.directgo.com.tr/api` *(TBD)* | `wss://staging.directgo.com.tr/ws` *(TBD)* |
| Production | `https://api.directgo.com.tr/api` *(TBD)* | `wss://api.directgo.com.tr/ws` *(TBD)* |

**Never hardcode URLs.** Read from `NEXT_PUBLIC_API_BASE` / `NEXT_PUBLIC_WS_BASE`.

---

## 5. Conventions

- **Auth:** `Authorization: Bearer <access_token>` header on every authenticated request
- **Encoding:** UTF-8, JSON request/response bodies
- **Phone format:** E.164 — `+905XXXXXXXXX` (always `+90` country code)
- **Currency:** TRY (Turkish Lira), as decimal strings like `"200.00"`
- **Coordinates:** WGS84 decimal degrees, e.g. `41.0082`, `28.9784`
- **Distances:** kilometers (decimal)
- **Timestamps:** ISO 8601 UTC, e.g. `"2026-04-27T14:30:00Z"`
- **Locale:** all server-side error messages and labels are returned in Turkish — display them as-is

---

## 6. Authentication

Backend uses JWT (rest_framework_simplejwt). Two-token system: short-lived `access` (60 min) + long-lived `refresh` (30 days).

### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "phone": "+905551234567",
  "password": "..."
}
```

Response `200`:
```json
{
  "access": "eyJhbGciOi...",
  "refresh": "eyJhbGciOi..."
}
```

### Refresh

```http
POST /api/auth/refresh/
Content-Type: application/json

{ "refresh": "eyJhbGciOi..." }
```

Response `200`:
```json
{ "access": "eyJhbGciOi..." }
```

Refresh **before** the access token expires. Standard pattern: intercept 401 responses, refresh once, retry the original request.

### Register passenger

```http
POST /api/auth/register/passenger/
Content-Type: application/json

{
  "phone": "+905551234567",
  "password": "...",
  "first_name": "...",
  "last_name": "...",
  "email": "..."   // optional
}
```

Response `201`:
```json
{
  "user": { "id": 42, "phone": "...", "first_name": "...", ... },
  "access": "...",
  "refresh": "..."
}
```

### Token storage

Use **httpOnly secure cookies**, not `localStorage`. localStorage is readable by any JS that runs on your origin — including injected scripts from a single XSS bug. httpOnly cookies are not.

---

## 7. User profile

```http
GET /api/auth/me/
Authorization: Bearer <access>
```

Response `200`:
```json
{
  "id": 42,
  "phone": "+905551234567",
  "first_name": "Ali",
  "last_name": "Yılmaz",
  "email": "ali@example.com",
  "default_payment_method": "CARD",
  "has_default_card": true,
  "created_at": "2026-01-15T10:00:00Z"
}
```

```http
PATCH /api/auth/me/
Authorization: Bearer <access>
Content-Type: application/json

{
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "default_payment_method": "CARD"   // "CARD" or "CASH"
}
```

Returns `200` with the updated profile.

---

## 8. Service catalog

```http
GET /api/services/
```

Response `200`:
```json
[
  {
    "code": "TAKSI",
    "name": "Taksi",
    "service_types": [
      { "code": "TAKSI_STANDARD", "name": "Standart Taksi", "description": "..." }
    ]
  },
  { "code": "NAKLIYE", "name": "Nakliye", "service_types": [...] },
  { "code": "YOL_YARDIM", "name": "Yol Yardım", "service_types": [...] },
  { "code": "TRANSFER", "name": "Transfer", "service_types": [...] }
]
```

Cache this for the session — service definitions don't change mid-session.

---

## 9. Geo — nearby drivers (for the homepage map)

Show idle drivers near the user's current location, like Uber's homepage map.

```http
GET /api/geo/nearby/?lat=41.0082&lng=28.9784&service_type_code=TAKSI_STANDARD&radius_km=3
Authorization: Bearer <access>
```

Response `200`:
```json
[
  { "id": 7, "lat": 41.005, "lng": 28.971, "heading": 180, "vehicle_type": "Sedan" },
  { "id": 12, "lat": 41.011, "lng": 28.984, "heading": 270, "vehicle_type": "SUV" }
]
```

**Throttling:** poll at most every 5–10 seconds. Don't use this as a heartbeat. When the user starts a booking, stop polling.

---

## 10. Booking flow

### Estimate fare

```http
POST /api/bookings/estimate/
Authorization: Bearer <access>
Content-Type: application/json

{
  "pickup_lat": 41.0082, "pickup_lng": 28.9784,
  "dropoff_lat": 41.0422, "dropoff_lng": 29.0094,
  "service_type_code": "TAKSI_STANDARD"
}
```

Response `200`:
```json
{
  "estimated_fare": "200.00",
  "distance_km": 3.2,
  "duration_min": 15,
  "currency": "TRY"
}
```

> **Important:** for TAKSI, trips shorter than 5 km return a fixed indi-bindi price (e.g. 200 TL flat). The driver enters the actual taximeter reading at trip end, capped at this estimate. Display the estimate as-is — never recalculate client-side.

### Create booking

```http
POST /api/bookings/request/
Authorization: Bearer <access>
Content-Type: application/json

{
  "pickup_lat": 41.0082,
  "pickup_lng": 28.9784,
  "pickup_address": "Taksim Meydanı, Beyoğlu/İstanbul",
  "dropoff_lat": 41.0422,
  "dropoff_lng": 29.0094,
  "dropoff_address": "Levent, Beşiktaş/İstanbul",
  "service_type_code": "TAKSI_STANDARD",
  "payment_method": "CARD",
  "stored_card_id": 17,
  "notes": "Bagajda valiz var."
}
```

`stored_card_id` is required when `payment_method` is `"CARD"`. For `"CASH"`, omit it.

Response `201`:
```json
{
  "id": 12345,
  "status": "PENDING",
  "service_type_code": "TAKSI_STANDARD",
  "pickup_address": "...",
  "dropoff_address": "...",
  "estimated_fare": "200.00",
  "payment_method": "CARD",
  "created_at": "2026-04-27T14:30:00Z",
  "driver": null
}
```

### Active booking

After creating a booking, open the WebSocket (section 11) and also fetch:

```http
GET /api/bookings/my-active/
Authorization: Bearer <access>
```

Returns `200` with the active booking, or `204 No Content` if none.

### Booking detail

```http
GET /api/bookings/<id>/
Authorization: Bearer <access>
```

Response includes driver info once `status >= ACCEPTED`:

```json
{
  "id": 12345,
  "status": "DRIVER_ARRIVED",
  "driver": {
    "id": 7,
    "first_name": "Mehmet",
    "rating": 4.87,
    "vehicle": { "plate": "34 ABC 123", "make": "Toyota", "model": "Corolla", "color": "Beyaz" },
    "lat": 41.0085, "lng": 28.9787, "heading": 180
  },
  "estimated_fare": "200.00",
  "final_fare": null,
  ...
}
```

### Cancel

```http
POST /api/bookings/<id>/cancel/
Authorization: Bearer <access>
Content-Type: application/json

{
  "reason_code": "TOO_LONG_WAIT",
  "free_text": ""
}
```

**Reason codes:** `TOO_LONG_WAIT`, `CHANGED_MIND`, `WRONG_PICKUP`, `DRIVER_REQUESTED`, `OTHER`.

If a driver was already assigned, a small partial fare may be charged (mid-trip cancel). The response will include the charged amount.

### Rate

After the trip completes:

```http
POST /api/bookings/<id>/rate/
Authorization: Bearer <access>
Content-Type: application/json

{
  "stars": 5,
  "tags": ["TEMIZ_ARAC", "GUVENLI_SURUS", "NAZIK_SURUCU"],
  "comment": "Çok iyi sürücüydü, teşekkürler."
}
```

**Tag codes (any subset, any number):**
`TEMIZ_ARAC`, `GUVENLI_SURUS`, `NAZIK_SURUCU`, `HIZLI`, `RAHAT_YOLCULUK`, `IYI_MUZIK`, `SESSIZ_YOLCULUK`, `BILDIGI_ROTA`, `IYI_KLIMA`, `PROFESYONEL`.

### History

```http
GET /api/bookings/history/?page=1&page_size=20
Authorization: Bearer <access>
```

Standard DRF pagination:
```json
{
  "count": 45,
  "next": "https://.../api/bookings/history/?page=2",
  "previous": null,
  "results": [ ...bookings ]
}
```

### Booking status lifecycle

```
PENDING → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
                                                  ↘ CANCELLED (from any state)
```

---

## 11. WebSocket — live ride updates

After `POST /api/bookings/request/` returns, open:

```
wss://api.directgo.com.tr/ws/bookings/<booking_id>/?token=<access_token>
```

The token is passed as a query string because browsers don't expose WS headers. Use the **access** token (not refresh).

### Server-pushed messages

```json
{ "type": "booking_status", "status": "ACCEPTED",        "booking_id": 12345 }
{ "type": "booking_status", "status": "DRIVER_ARRIVED",  "booking_id": 12345 }
{ "type": "booking_status", "status": "IN_PROGRESS",     "booking_id": 12345 }
{ "type": "booking_status", "status": "COMPLETED",       "booking_id": 12345, "final_fare": "215.00" }
{ "type": "booking_status", "status": "CANCELLED",       "booking_id": 12345, "reason": "DRIVER_REQUESTED" }

{ "type": "driver_location", "lat": 41.0085, "lng": 28.9787, "heading": 180 }

{ "type": "payment_status",  "status": "COMPLETED" }
{ "type": "payment_status",  "status": "FAILED", "code": "CARD_DECLINED" }
```

### Client behavior

- **Reconnect** with exponential backoff (1s, 2s, 4s, 8s, max 30s) if the socket drops.
- **On reconnect**, re-fetch `GET /api/bookings/<id>/` to resync — you may have missed messages.
- **Close** the socket when the booking reaches `COMPLETED` or `CANCELLED`.
- **No client-pushed messages.** This socket is server → client only for the customer.

---

## 12. Payments — iyzico

**Critical:** never collect card numbers on your own forms. PCI scope is handled entirely by iyzico's hosted form. Your role is to redirect the user there and listen for the callback.

### Saved cards

```http
GET /api/payments/cards/
Authorization: Bearer <access>
```

Response `200`:
```json
[
  {
    "id": 17,
    "alias": "İş Kartım",
    "last4": "1234",
    "brand": "VISA",
    "is_default": true,
    "created_at": "2026-02-01T10:00:00Z"
  }
]
```

### Add a card

```http
POST /api/payments/cards/
Authorization: Bearer <access>
Content-Type: application/json

{ "alias": "İş Kartım" }
```

Response `200`:
```json
{
  "checkoutFormContent": "<script>...</script>",
  "token": "iyzico-token-abc123"
}
```

Inject `checkoutFormContent` into a div on your page (or render in an iframe / modal). iyzico handles the card entry + 3DS challenge. On success, the card is stored and the user is redirected back. Refresh the cards list after the user returns.

### Other card operations

```http
DELETE /api/payments/cards/<id>/
PATCH  /api/payments/cards/<id>/update/        Body: { "alias": "Yeni Adı" }
POST   /api/payments/cards/<id>/set-default/
```

### Charging at trip end

There are two scenarios:

**A) Saved card auto-charge (preferred):** when the user books with `payment_method=CARD` + `stored_card_id`, the backend automatically charges that card at trip completion. You don't initiate anything — listen for the WS message `{"type":"payment_status","status":"COMPLETED"}`.

**B) Manual checkout:** if the auto-charge declines (`{"type":"payment_status","status":"FAILED","code":"CARD_DECLINED"}`), or the user has no saved card, prompt them to either pay cash to the driver or open a hosted checkout:

```http
POST /api/payments/initialize/
Authorization: Bearer <access>
Content-Type: application/json

{ "booking_id": 12345 }
```

Response `200`:
```json
{
  "checkoutFormContent": "<script>...</script>",
  "token": "..."
}
```

Render the form. iyzico runs the 3DS flow in-page (no WebView needed — this is one area where web is actually simpler than mobile).

---

## 13. Support / feedback

```http
GET /api/support/categories/
```

Response `200`:
```json
[
  { "id": 1, "name": "Sürücü ile ilgili", "code": "DRIVER" },
  { "id": 2, "name": "Ödeme sorunu",      "code": "PAYMENT" },
  { "id": 3, "name": "Uygulama hatası",   "code": "BUG" },
  { "id": 4, "name": "Diğer",             "code": "OTHER" }
]
```

```http
POST /api/support/feedback/
Authorization: Bearer <access>
Content-Type: application/json

{
  "category_id": 3,
  "subject": "Harita yüklenmiyor",
  "message": "Detaylı açıklama..."
}
```

---

## 14. Errors

All errors follow standard DRF format:

```json
{ "detail": "Geçersiz oturum." }
```

Or per-field:
```json
{ "phone": ["Bu telefon numarası zaten kayıtlı."], "password": ["Şifre çok kısa."] }
```

### HTTP status codes

| Code | Meaning |
|---|---|
| 200 / 201 | Success |
| 204 | No content (e.g. no active ride) |
| 400 | Validation error — check field-level messages |
| 401 | Token missing / expired — refresh and retry once |
| 403 | Authenticated but not allowed (e.g. driver-only endpoint) |
| 404 | Not found |
| 409 | Conflict (e.g. trying to start a new ride while one is active) |
| 429 | Rate limited — show "Lütfen biraz bekleyin." |
| 5xx | Server error — show generic "Bir hata oluştu, lütfen tekrar deneyin." |

**Display server messages as-is.** They are already in Turkish and tuned for end users.

---

## 15. Rate limits

| Endpoint group | Limit |
|---|---|
| Login / register | 5 attempts per phone per 5 minutes |
| Booking estimate | 30 requests per minute per user |
| General API | 120 requests per minute per user |
| WebSocket | 1 active connection per booking per user |

If you hit `429`, back off and retry after the duration in the `Retry-After` header (if present).

---

## 16. CORS

The backend will be configured to accept browser requests from your registered origins. Send us:

- Your local dev origin (e.g. `http://localhost:3000`)
- Your staging origin (e.g. `https://web-staging.directgo.com.tr`)
- Your production domain (e.g. `https://directgo.com.tr`)

Until your origin is added, requests will be blocked by the browser with a CORS error.

---

## 17. Out of scope — endpoints you cannot use

These exist on the same backend but are not for the customer web app. They will return `401` or `403` with a customer JWT — do not attempt to integrate them:

- `/admin/*` — Django admin
- `/fleet/*` — Internal operator dashboard
- `/api/driver/*` — Driver app endpoints
- `/api/auth/register/driver/` — Driver onboarding
- `/api/geo/admin-api/*` — Internal geo admin
- `/api/payments/webhooks/*` — iyzico webhooks (server-to-server only)

---

## 18. Pre-launch checklist (we provide)

Before you go live, we will provide:

- [ ] Production API + WebSocket URLs
- [ ] Production Google Maps API key restricted to `directgo.com.tr` (and any subdomains)
- [ ] CORS allowlist entry for your production domain
- [ ] Privacy policy + KVKK consent text URLs
- [ ] Brand assets (logo, colors, fonts) — request from the brand owner
- [ ] iyzico **live** mode is configured server-side; you don't need merchant keys

You provide:

- [ ] Production domain finalized
- [ ] HTTPS certificate (Let's Encrypt or paid)
- [ ] Domain ownership confirmed for Maps API restriction

---

## 19. Things to be careful with

1. **Don't poll endpoints as heartbeats.** Use WebSockets for live state. REST polling at >1 Hz will hit rate limits and pressure the database.
2. **Don't store JWT in localStorage.** httpOnly cookies only.
3. **Don't take card numbers on your forms.** iyzico hosted form only.
4. **Don't recalculate fares client-side.** Server is authoritative — show what the API returns.
5. **Handle the "active ride" state.** A user with an active booking cannot start a new one. The 409 from `POST /api/bookings/request/` is the source of truth.
6. **Treat WS messages as best-effort.** Always be able to recover state from `GET /api/bookings/<id>/` after a reconnect.
7. **Keep a `Retry-After` aware backoff.** Don't hammer endpoints after a 429.

---

## 20. Contact

For staging access, CORS allowlisting, or production credentials, contact the DirectGo backend team. Do not commit any provided URLs, tokens, or test credentials to a public repository.

---

*End of document.*
