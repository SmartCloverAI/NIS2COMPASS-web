# Eight CYberSynchrony Tools Selected For NIS2COMPASS

NIS2COMPASS has selected eight tools across the six CYberSynchrony modules. Modules are functional groupings; tools are the specific components chosen for the project.

> Selection note: 28 October 2026. Selection identifies intended use. It does not establish deployment, integration, execution, completion, funder acceptance or NIS2 compliance. The portfolio is not a claim that every tool is already running in both pilots.

## Two Workstreams

The two main pilots have a staged portfolio: baseline assessment and evidence review, authorised assessment work, then later monitoring and evidence consolidation. The tools below support different parts of that sequence, subject to their specific conditions.

Three additional organisations take part in an SME-focused light-touch workstream. SME means small or medium-sized enterprise. Planned work covers review of information the organisations provide, practical priorities and awareness work. TrustSENSE, Attack Surface Assessment and Cyber Security Posture Assessment are relevant only where applicable and separately authorised.

> Participation by three additional organisations does not establish that the project's SME-support target has been met. Their light-touch scope does not extend to intrusive testing or continuous monitoring. Participation alone does not authorise technical collection, uploads or staff-facing simulations: each needs explicit activity-specific approval, approved data handling and safeguards.

## The Selected Eight

### 1. CYRESCUE: Cyber Security Posture Assessment (CSPA)

CSPA takes an authorised inventory of equipment and software and helps an analyst relate it to defensive techniques. It supports baseline and evidence review. The expected output is an analyst-checked assessment of inventory matches, with the context needed to interpret them.

> CSPA does not connect to hosts or require their credentials. A human checks the matches. This selection makes no promise of an automatic export.

### 2. CYRESCUE: Purple Team Assessment (PTA)

PTA organises, scores and reports evidence from authorised assessment work. It supports the main pilots' assessment and evidence review. Expected outputs are reviewed assessment records and reports.

> PTA does not execute attacks. Its records do not constitute automatic security certification, and selecting it does not authorise an assessment activity.

### 3. CYBERRA: Defensive Cyber Operations (DCO) Response Playbooks

DCO provides read-only guidance that relates Wazuh alerts to response playbooks. A playbook describes possible response steps. In the later monitoring stage, the expected output is guidance for an analyst to review when deciding how to respond.

> Pilot use requires an approved working data connection. An analyst makes response decisions; DCO does not automatically contain an incident.

### 4. CYBRITE: Anomaly Detector IDS

IDS means intrusion detection system. The Anomaly Detector analyses network activity for unusual patterns, using Suricata network-event records. Its expected output is a set of leads for an analyst to examine during monitoring.

> An approved working feed is required. Wazuh input is not interchangeable with the documented Suricata input. An unusual pattern is not proof of an attack.

### 5. CROSS-CORE: Blockchain Integrity Validator

The Blockchain Integrity Validator is selected for a conditional evaluation using synthetic, or made-up, evidence only. It is relevant to evidence consolidation. The expected output is an integrity-check result indicating whether the tested file's bytes have changed.

> Evaluation remains conditional on confirmed interface and documentation. Integrity does not establish truth, completeness, lawful collection or compliance. No raw pilot evidence is to be placed on a blockchain.

### 6. CYBERWISE: TrustSENSE

TrustSENSE supports a team-consensus assessment of artificial intelligence trustworthiness and readiness. Participants discuss the assessment together. The expected output is a group assessment, relevant to baseline review where applicable.

> TrustSENSE is not a phishing simulator, an individual staff-ranking tool or proof of NIS2 maturity. Keep its findings separate from training completion and phishing outcomes.

### 7. CYBERGOPLUS: Attack Surface Assessment (ASA)

ASA compares an authorised software inventory with known vulnerability information. It supports baseline assessment and review of possible weaknesses. Its expected output is a set of possible matches for an analyst to verify.

> ASA is inventory-based analysis, not a live network scanner. A possible match does not establish that an organisation has an exploitable vulnerability.

### 8. CYBERGOPLUS: Policy Tools

Policy Tools provides templates and guidance for adapting organisational responsibilities and procedures. It supports governance work alongside assessment. The expected output is a reviewed local policy suited to the organisation.

> A written policy alone does not establish that a control is operating effectively.

## Supporting Components And Public References

Wazuh and Suricata are NIS2COMPASS-operated supporting open-source components. They are not ninth and tenth selected CYberSynchrony tools. Their distinct input roles matter: Wazuh alerts support DCO response guidance, while Suricata records supply the Anomaly Detector's documented input.

The separate [upstream reference directory](/tools/) retains Apache Caldera, MISP, Wazuh, Suricata and WEKA, with Snyk listed separately as an account-backed reference. Those listings are research material, not an alternative final selection.

> Upstream licence references do not establish licences for these eight selected tools. Provider platform documentation does not establish that the platform is publicly downloadable software.

Continue with the [six-module overview](../cybersynchrony-alignment.md), [CYberSynchrony public sources](README.md), [awareness approach](../phishing-awareness/project-approach.md) or [October project update](../progress/2026-10-project-update.md).
