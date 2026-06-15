---
title: "NIS2COMPASS: Turning Cybersecurity Work Into Verifiable Proof"
subtitle: "SmartClover and AI STM Learning are building a practical evidence layer for NIS2 readiness, funded through the CYberSynchrony FSTP open call."
date: "2026-06-15"
author: "SmartClover SRL"
partner: "AI STM Learning SRL"
hero_image: "images/nis2compass-blog-hero-auditor-evidence-variant-3.png"
---

<div class="article-lead-note" role="note" aria-label="Opening scenario" style="margin: 1.5rem 0 2rem; padding: 1.4rem 1.6rem; border-left: 0.35rem solid #1f7a5a; background: #eef7f2; font-size: 1.3rem; line-height: 1.55;">
<p style="margin: 0;">An auditor can arrive at a manufacturing plant and find a network that appears technically secure: modern firewalls, patched servers, trained staff, and an IT team that has performed the required checks. Under NIS2, that is no longer enough. If the evidence of those checks lives in scattered email threads, disconnected vulnerability spreadsheets, manual scanner exports, and informal status notes, the organization may still fail the compliance test. The decisive question is not only whether the security work happened. The decisive question is whether the organization can prove it in a structured, immutable, and legally meaningful way.</p>
</div>

![NIS2COMPASS diagram showing scattered records becoming human-reviewed, audit-ready proof through an Evidence Graph.](images/nis2compass-blog-hero-auditor-evidence-variant-3.png)

That is the trap NIS2COMPASS is designed to address. NIS2 does not make firewalls, monitoring, incident response, vulnerability handling, training, or governance optional. It also makes the documentation burden more serious. The hard part for many teams is not that no security work exists. The hard part is that the proof is scattered across tools, people, tickets, screenshots, exports, reports, and memories.

NIS2COMPASS treats that proof as a first-class cybersecurity object.

## Why This Matters Now

NIS2 is the European Union's updated cybersecurity framework for important and essential sectors. It expands the scope of regulated sectors, raises expectations around risk management, strengthens incident reporting, and brings management accountability closer to cybersecurity practice. For organizations in manufacturing, healthcare-adjacent activity, digital infrastructure, hosting, cloud, data centers, managed services, public administration, and other critical areas, this changes the tone of cybersecurity work.

The old comfort zone was: "we did the scan," "we patched the server," "we trained the staff," or "we monitored the traffic."

The new question is: "show me the record, show me the link to the obligation, show me who reviewed it, show me when it changed, and show me that the evidence was not silently rewritten afterwards."

That is where a normal spreadsheet starts to break down. It can list findings, but it does not naturally preserve the argument. It rarely explains how a log, a training record, a remediation note, and a governance control connect. During an audit, that missing connection becomes expensive.

## What NIS2COMPASS Is Building

NIS2COMPASS is an 8-month project accepted for grant funding by the CYberSynchrony consortium through the Financial Support to Third Parties instrument, often shortened to FSTP. In plain language, CYberSynchrony is the larger EU-funded project. NIS2COMPASS is one selected project contributing practical methods, tooling, validation, and public-safe knowledge back into that ecosystem.

The central technical idea is the Compliance Evidence Graph.

The Evidence Graph is a structured way to connect cybersecurity artifacts to obligations, controls, owners, timestamps, approvals, remediation actions, and integrity checks. A raw artifact may be a monitoring alert, a vulnerability finding, a test report, a training metric, a policy file, or a remediation record. Instead of leaving that artifact as an isolated file, the graph stores the relationship: this artifact supports this control, relates to this system, was reviewed by this role, and belongs in this evidence pack.

![Flow diagram showing the path from security activity to evidence capture, Evidence Graph, human review, and audit-ready proof.](images/evidence-flow-imagegen.png)

The project does not try to replace every security tool. That would be the wrong ambition. Most organizations already have tools that produce useful signals. The useful question is whether those signals become reviewable evidence.

## The Partnership: SmartClover And AI STM Learning

<aside class="article-pullquote article-pullquote--large" aria-hidden="true" style="margin: 2.5rem 0; padding: 0.2rem 0 0.4rem; border-top: 0.18rem solid #1f7a5a; border-bottom: 0.18rem solid #1f7a5a; color: #123f32; font-size: clamp(2.5rem, 8vw, 5rem); line-height: 0.96; font-weight: 800; letter-spacing: -0.02em;">
<p style="margin: 0.35rem 0;">"... signals become reviewable evidence."</p>
</aside>

NIS2COMPASS works because the roles are deliberately different.

AI STM Learning SRL coordinates the project and leads the compliance/evidence architecture. That means project control, NIS2 mapping, the Evidence Graph, governance logic, audit-ready evidence packs, human review of AI-suggested mappings, and funder-facing delivery evidence.

SmartClover SRL contributes the operational cybersecurity and dissemination side. That means monitoring evidence, threat-intelligence alignment, vulnerability assessment and penetration-test coordination, remediation verification, awareness material, aggregate phishing or training metrics, public-safe technical writing, and community-facing outputs.

Neither role is enough by itself. A graph without real operational evidence becomes an elegant database with no ground truth. Security testing without traceable evidence becomes another folder of disconnected reports. NIS2COMPASS is the attempt to join those two worlds: real cybersecurity activity and structured proof.

![Collaboration diagram showing SmartClover operational evidence, AI STM Evidence Graph governance, and public playbooks and templates.](images/collaboration-flow-imagegen.png)

## What SmartClover Brings To The Project

SmartClover is known publicly for healthcare AI work, especially CerviGuard for cervical-screening workflows and DataGems for synthetic-data research. That may sound far away from NIS2 at first. It is not.

Healthcare AI has forced us to care about traceability, human review, data minimization, local control, evidence, security boundaries, and claim discipline. Cybersecurity evidence has similar constraints. Raw telemetry can expose systems. Vulnerability reports can become attacker roadmaps. Training metrics can become personal data if handled carelessly. Public demos can accidentally reveal private architecture.

So the operational discipline is familiar: keep sensitive data controlled, make claims traceable, keep humans responsible for decisions, and publish only what is safe to publish.

Inside NIS2COMPASS, SmartClover's work is expected to include monitoring and detection evidence, threat-intelligence mappings, safe validation activity, remediation tracking, awareness work, and public dissemination material. Some of the tool families are familiar to security teams: host monitoring, network detection, vulnerability scanners, threat-intelligence formats, and controlled adversary-emulation methods. But the article-worthy point is not the tool list. The point is the chain:

1. security activity happens;
2. evidence is captured;
3. the artifact is normalized and hashed;
4. the Evidence Graph links it to a control or obligation;
5. a human reviewer approves the mapping;
6. an evidence pack can be inspected without hunting through months of messages.

That last step is where compliance becomes less theatrical and more operational.

<blockquote class="article-miniquote" aria-hidden="true" style="margin: 1.6rem 0; padding: 0.8rem 1.2rem; border-left: 0.22rem solid #b8841f; color: #5c4a18; font-size: 1.25rem; line-height: 1.45; font-style: italic;">
<p style="margin: 0;">"... make claims traceable ..."</p>
</blockquote>

## How CYberSynchrony Fits

CYberSynchrony provides the larger frame. Its module families cover monitoring, threat intelligence, resilience validation, awareness, governance, and secure exchange. NIS2COMPASS maps its work into those families instead of inventing a private vocabulary.

The practical mapping looks like this:

- CYBRITE: monitoring and early detection evidence.
- CYBERRA: threat intelligence, indicators, risk scenarios, and response-playbook alignment.
- CYRESCUE: posture assessment, vulnerability validation, breach-simulation style evidence, and remediation verification.
- CYBERWISE: awareness, training, phishing or social-engineering metrics, and human-risk improvement.
- CYBERGOPLUS: governance, NIS2 control mapping, policy alignment, audit evidence, and compliance traceability.
- CROSS-CORE: secure exchange and evidence integrity, if the project receives confirmed interface requirements for sanitized data sharing.

This matters because a funded project should not disappear into a private consulting folder. The reusable parts should come back out: public playbooks, templates, schema examples, methodology notes, and synthetic evidence examples that other teams can learn from without seeing sensitive pilot information.

## The AI Part, Without The Hype

NIS2COMPASS includes AI-assisted mapping, but the design is intentionally restrained.

The useful role for AI here is classification assistance. A local model can help suggest that a monitoring event, vulnerability record, training metric, or remediation note may support a specific NIS2 control area. That can save time because the volume of artifacts can be large and the mapping work is repetitive.

But the AI does not become the compliance officer. It does not make autonomous legal conclusions. A human reviewer must inspect and approve the mapping before it becomes part of the authoritative record.

That boundary matters. It is also more credible. In regulated work, the safest AI systems are usually the ones that are honest about where responsibility stays.

## What Becomes Public

The public side of NIS2COMPASS is important. The project should help more than the direct pilots and partners.

Public outputs may include:

- plain-language explanations of NIS2 readiness work;
- public-safe playbooks;
- reusable evidence templates;
- synthetic example records;
- schema examples;
- workshop material;
- sanitized methodology notes;
- public website content and repository documentation.

The public outputs should help a team understand how to organize evidence, what kinds of records matter, and how monitoring, testing, remediation, training, and governance can be connected.

<aside class="article-pullquote" aria-hidden="true" style="margin: 2.2rem 0; padding: 1rem 1.2rem; border-left: 0.3rem solid #245b89; background: #eef5fb; color: #163d5f; font-size: clamp(2rem, 5.5vw, 3.4rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.01em;">
<p style="margin: 0;">"... a human reviewer must inspect and approve ..."</p>
</aside>

## What Must Stay Private

The boundary is just as important as the publication.

Real vulnerabilities, exploit details, raw monitoring logs, private network architecture, credentials, personal data, pilot-specific weaknesses, signed documents, financial records, and internal funder material do not belong in public dissemination. If a public demo needs realistic material, the right answer is synthetic data or heavily sanitized examples.

That is not secrecy for its own sake. It is basic cybersecurity hygiene. A project about proof should not create new exposure while trying to demonstrate maturity.

## The Practical Result We Want

<blockquote class="article-miniquote" aria-hidden="true" style="margin: 1.6rem 0; padding: 0.8rem 1.2rem; border-left: 0.22rem solid #1f7a5a; color: #123f32; font-size: 1.35rem; line-height: 1.4; font-style: italic;">
<p style="margin: 0;">"... the difference between activity and proof."</p>
</blockquote>

At the end of NIS2COMPASS, the strongest result would not be a glossy statement that "cybersecurity improved." The stronger result would be a reviewable evidence trail:

- what was assessed;
- what was monitored;
- what was found;
- what was fixed;
- what remained open;
- who reviewed it;
- which NIS2 obligation it supports;
- which public lessons can be shared safely.

That is the difference between activity and proof.

For SmartClover, this project also connects two parts of our work that are usually discussed separately: secure healthcare AI delivery and cybersecurity resilience. Both need traceability. Both need disciplined evidence. Both need human review. Both need careful public communication.

NIS2COMPASS gives us a way to turn that discipline into a reusable cybersecurity pattern, together with AI STM Learning and within the CYberSynchrony ecosystem.

## Further Reading

- European Commission: [NIS2 Directive: securing network and information systems](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive)
- European Commission: [NIS2 Directive FAQs](https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs)
- CYberSynchrony: [Open Calls](https://cybersynchrony.eu/open-calls/)
- CYberSynchrony: [Public Deliverables](https://cybersynchrony.eu/public-deliverables/)
- SmartClover: [Healthcare AI with live product proof](https://smartclover.ro/)
- SmartClover: [Products and service capabilities](https://smartclover.ro/products)
