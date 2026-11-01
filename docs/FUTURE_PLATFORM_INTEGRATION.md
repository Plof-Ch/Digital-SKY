# Future real Digital Sky platform — integration boundary

The public website is complete as a **research and product information site**. It does **not** perform real financial operations, store user bank credentials, or create wallets. This separation is deliberate.

## What to keep intact when adding the system

- Public website routes and their research content should remain independent of future account/login routes.
- A future restricted access product (`/app/`, or better, a separate `app.digital-sky...` domain) should have its own authentication, authorization, audit trail and backend/API services.
- All current diagrams and financial charts are **source-derived static project data**, not a transaction database.
- Bank/CBDC infrastructure must be integrated only upon institutional authorization and completion of legal and security review.
- When implementing user accounts, do not reuse the current public website's `site-data.js` as a database, authorization source or source of payment balances.

## Suggested future engineering interfaces (proposals, NOT existing endpoints)

- `GET /api/v1/session` — authenticated user session.
- `GET /api/v1/accounts` — bank-authorized account views.
- `POST /api/v1/quotes` — request a firm cross-currency quote and availability.
- `POST /api/v1/transfers` — submit a permitted transfer, subject to banking rules and approvals.
- `GET /api/v1/transfers/:id` — transfer state machine/status from authenticated backend.
- `GET /api/v1/audit/:id` — immutable audit evidence subject to user privileges.

**These are architectural suggestions for Cursor only**, not facts extracted from the Digital Sky project documents. No live calls, fake account creation, or demonstrations using real money should be added to the public site.

## Required product decisions before engineering

1. Authoritative customer-facing channel: bank app, Digital Sky standalone app, or both.
2. Authorized bank/CBDC partners and legal permission to connect.
3. FX liquidity provider, source of rates, quoting and settlement finality.
4. Multi-bank approval/role design, operational governance, disputes and recovery.
5. Security and testing standards for the transaction core.
