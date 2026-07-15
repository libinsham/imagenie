/**
 * This project is plain JavaScript (no TypeScript compiler in the build),
 * so these are JSDoc typedefs for editor autocomplete/documentation only —
 * they aren't enforced at build time. If you migrate to TypeScript later,
 * these translate almost directly into `.ts` interfaces.
 *
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string|null} coverImage
 * @property {"DRAFT"|"PUBLISHED"} status
 * @property {string|null} publishedAt
 *
 * @typedef {Object} ContactFormPayload
 * @property {string} fullName
 * @property {string} email
 * @property {string} [company]
 * @property {string} [service]
 * @property {string} message
 *
 * @typedef {Object} PortfolioItem
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} category
 * @property {string} description
 * @property {string|null} coverImage
 */

export {};
