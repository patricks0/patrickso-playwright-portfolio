**Test Strategy**
<details>
<summary>UI Strategy</summary>

- UI Tests: POM with property-style via `PageManager`, resilient ARIA selectors, centralized navigation, seeded data where needed, state-based assertions, CI artifacts on failure.

</details>
<details>
<summary>API Strategy</summary>

- API Tests: Playwright request client with env-configured base URL; validate status, headers, and body; include negative cases; keep tests stateless/idempotent.

</details>

[🔼 Back to Top]
