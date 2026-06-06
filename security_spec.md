# Security Specifications: Ingredients Truth Scanner

## 1. Data Invariants
- Users can create, read, and delete their own Scans.
- Users can save products in their private user subcollection, which must only be readable and writable by that authenticated user.
- Scans cannot be updated by standard clients after creation to guarantee report integrity.
- Validation functions govern type correctness and enforce strict ID guidelines.

## 2. The "Dirty Dozen" Payloads (Mitigation Map)
We block and verify rejection for:
1. Writing a Scan document with a hijacked `userId`.
2. Accessing scans belonging to other authenticated users via random doc queries.
3. Creating a SavedProduct where the parent profile matches another person.
4. Attempting to bypass validations with empty payloads.
5. Forging a false 100/100 score by altering an existing analysis.
6. Injecting a massive string above 1KB as scan name.
7. Attempting to inject system roles or flags like `isAdmin`.
8. Injecting invalid data types (e.g., array instead of string for `productName`).
9. Overwriting immutable `createdAt` timestamps with future entries.
10. Creating duplicate records with orphaned IDs.
11. Bypassing user validation via mock email parameters.
12. Forging terminal scores across saved collections.

## 3. Recommended Security Rules Configuration
We deploy robust rules validating identity matches and structure patterns.
