---
title: "API Security Testing: The Flaws Scanners Never Find"
description: "Broken object-level authorisation, mass assignment and business logic abuse. Why automated tools miss the most damaging API vulnerabilities, and how to test for them properly."
date: "2026-01-21"
category: "Offensive Security"
tags: ["API Security", "OWASP", "Penetration Testing", "Application Security"]
---

APIs now carry most of the traffic and almost all of the sensitive data in modern applications. They are also where automated security testing is weakest, because the most damaging API flaws are logical rather than technical.

A scanner can find an injection flaw. It cannot know that user 1041 should not be able to read invoice 88213.

## The flaw that causes the most damage

**Broken object-level authorisation (BOLA)** — also called IDOR — is the most common serious API vulnerability, and it is conceptually simple: the API checks *who you are* but not *what you are allowed to see*.

```
GET /api/v2/invoices/88213
Authorization: Bearer <valid token for user 1041>
```

The token is valid. The user is authenticated. The invoice belongs to a different customer. The API returns it.

Scanners miss this because from their perspective, a `200 OK` with a well-formed response is a successful request. There is no error, no anomaly, no signature to match. Only a human who knows that user 1041 should not own invoice 88213 can identify the flaw.

**How to test it properly:** create two accounts in different tenants or organisations. Enumerate every object identifier accessible to account A. Attempt each one with account B's token. Any successful response is a finding.

This should be done for every object type, every HTTP method, and both directions. It is tedious and it is where the real findings are.

## Broken function-level authorisation

The sibling flaw. The API restricts which endpoints appear in the UI but does not enforce authorisation on the endpoint itself.

```
DELETE /api/v2/users/1041      → 403 for a standard user
DELETE /api/v2/admin/users/1041 → 200, because nobody checked
```

Test by extracting every endpoint from the API specification, the JavaScript bundle and observed traffic, then calling each with a low-privileged token. Pay particular attention to endpoints that are not referenced by the UI at all — those are frequently the ones with no authorisation check.

Also test HTTP method confusion: an endpoint that correctly rejects `DELETE` may accept `POST` with `X-HTTP-Method-Override: DELETE`.

## Mass assignment

The API binds the request body directly to an internal model, so a client can set fields that were never intended to be writable.

```json
POST /api/v2/users
{ "email": "a@b.com", "name": "Test", "role": "admin", "accountBalance": 999999 }
```

If the backend deserialises straight into the entity, `role` and `accountBalance` are now attacker-controlled.

**How to test:** read the response of a `GET` on the object to learn its full field set, then attempt to write each field back. Also try fields that are not returned but are likely to exist — `isAdmin`, `verified`, `tenantId`, `createdBy`.

**How to fix:** explicit allowlists for writable fields per endpoint. Never bind request bodies directly to persistence models.

## Business logic abuse

The most valuable findings, and entirely invisible to automation because the API is behaving exactly as programmed.

Examples we have found in real assessments:

- A discount code endpoint with no rate limit, allowing unlimited stacking of a single-use code
- A refund flow where the amount was taken from the client request rather than the original transaction
- A multi-step onboarding process where step 3 could be called directly, skipping the identity verification in step 2
- A price field submitted by the client and trusted by the server
- A race condition in a wallet withdrawal allowing double spending under concurrent requests

Testing for these requires understanding what the application is *for*. Map the business workflows, identify every state transition, and then attempt to perform them out of order, in parallel, repeatedly, and with manipulated values.

That last one — concurrency — is under-tested. Sending twenty simultaneous requests to a balance-modifying endpoint finds race conditions that sequential testing never will.

## Excessive data exposure

The API returns the complete object and relies on the client to display only part of it. The mobile app shows a name and photo; the response contains the email address, phone number, date of birth and internal risk score.

Anyone can read an API response. Test by comparing what is rendered against what is returned, for every endpoint.

## Authentication and token handling

- **JWT algorithm confusion** — try `alg: none`, and try switching RS256 to HS256 using the public key as the HMAC secret
- **Token expiry** — is it enforced server-side, or does the client simply stop sending it?
- **Token revocation** — after logout or password change, does the old token still work? Frequently it does
- **Refresh token rotation** — can an old refresh token be reused?
- **Scope enforcement** — does an OAuth token issued for read scope actually get rejected on write endpoints?

## Rate limiting and resource consumption

Test whether limits exist and whether they can be evaded:

- Per-account limits bypassed by rotating accounts
- Per-IP limits bypassed via `X-Forwarded-For`
- Expensive queries — GraphQL nested queries, unbounded page sizes, wildcard searches
- Unbounded file uploads and unzipping

For GraphQL specifically, test query depth and complexity limits. An unbounded nested query is a denial-of-service primitive that requires one request.

## What to give your testers

API testing is dramatically more effective with the right inputs. Provide:

- **The API specification** (OpenAPI/Swagger, GraphQL schema). Black-box discovery wastes days and still misses endpoints
- **Credentials for at least two accounts per role**, in separate tenants — this is what makes BOLA testing possible
- **Documentation of the business workflows** and what each role should be able to do
- **A non-production environment** with realistic data, so destructive tests are safe

An engagement with these inputs finds substantially more than one without, for the same cost.

## Building it into the pipeline

Manual testing catches the logic flaws. Automation still has a place for regression:

- Contract testing to catch endpoints drifting from their specification
- Automated authorisation tests in CI: for every endpoint, assert that a low-privileged token receives a 403
- Dependency and secret scanning on every commit
- Schema-based fuzzing for input handling

The authorisation test suite is the highest-value automation available. Once a BOLA finding is fixed, a test that asserts the fix holds prevents its return — and BOLA regressions are extremely common as codebases grow.

Our [application and API security testing](/services/vapt-penetration-testing) is built around manual authorisation and logic testing rather than scanner output, with proof-of-concept evidence for every finding and a free retest after remediation. [Talk to us](/contact) about scoping an assessment.
