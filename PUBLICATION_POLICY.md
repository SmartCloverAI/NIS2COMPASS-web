# Publication Policy

NIS2COMPASS publishes educational and public-safe material. The default rule is simple: if a file could help identify, attack, embarrass, or expose a pilot organization or person, it does not belong in the public repository.

Content development for the public repository and website is performed by SmartClover SRL.

Copyright belongs to AI STM Learning SRL and SmartClover SRL, as the NIS2COMPASS consortium partners.

## Allowed

- Project overview material.
- Glossary and beginner explanations.
- Public taxonomy.
- Public-safe playbooks.
- Empty templates.
- Synthetic examples.
- Sanitized schema snippets.
- Public event summaries.
- Sanitized public progress notes that avoid private milestone, payment, pilot, and security-result details.
- Public-source explanations of the six CYberSynchrony modules.
- Independently available tool references with source, licence, relationship, and verification links.
- Partner publications with publisher attribution and canonical links.
- Website source.

## Not Allowed

- Real vulnerabilities or exploit details.
- Pilot architecture.
- Raw logs or raw alerts.
- Credentials, tokens, keys, or private endpoints.
- Personal data.
- Internal payment, contracting, or support-letter material.
- Funder communication unless explicitly approved for publication.
- Tool selection, access, entitlement, deployment, integration, or pilot-use claims unless each claim has been cleared for public release.
- Unverified funding-programme wording or unapproved funding marks.

## Release Checklist

Before publication, confirm:

1. The content is useful to the public.
2. The content is synthetic, sanitized, or already public.
3. Acronyms are explained.
4. No pilot-sensitive data is present.
5. No personal data is present.
6. No exploit path or raw finding is present.
7. A reviewer has approved publication.
8. Every factual project-status claim is backed by a public source or an explicitly cleared internal source.
9. Tool references distinguish upstream research links from confirmed CYberSynchrony components and from NIS2COMPASS implementation status.
10. Partner articles preserve the publisher name and canonical URL.
11. `./start-website.sh check` passes.
12. The signed Sub-grant Agreement Article 10 or a later written CYberSynchrony direction authorizes the funding sentence, disclaimer, and required marks, and a public-safe direction reference is recorded.
13. `./start-website.sh release-check` passes.
14. The operator has explicitly approved promotion and public release.

## Preview And Release States

The website configuration at `site/src/config/publication.json` is the release control. A review candidate must use `release_state: preview` and `noindex: true`. Preview builds must display a visible warning and must not silently invent or select unapproved funding-programme wording.

Only the main operator may change the site to `release_state: published`. That change requires the applicable signed Article 10 instruction or later written CYberSynchrony direction for the funding visibility package, successful automated checks, completed review, explicit public-release approval, and public-safe values for `funding_direction_reference` and `operator_release_approval_reference` in the publication configuration.

The public checks scan repository documentation, deployment examples, structured source data, rendered HTML, and downloadable text artifacts. The private consortium release process must additionally run its confidential deny-list scan; confidential pilot and vendor names must never be embedded in public validator code.
