# Review and Corrections

[← Previous: Reading the Graph](reading-the-graph.md) | [Next: Findings and Exports →](findings-and-exports.md)

Evidence joins the graph only after named people make several separate decisions about it. This page explains who decides what, and what happens when a record is wrong.

## Roles and Boundaries

Each fictional person in the demo has a role. Alex prepares evidence, Rita reviews it, Olive is the compliance owner, Theo is the technical reviewer, Ximena approves exports and Ari, the auditor, reads the record.

> The “You are” picker switches between these fictional people without signing out. It is a convenience for the demo, not real identity or access security. No real AI model is connected to this alpha, so no AI decides anything here. The demo includes an AI assistant service identity, which is a non-human account rather than a working AI, and the system refuses it every human decision.

## Seven Kinds of Decision

| Decision | Plain question | Who decides |
| --- | --- | --- |
| Quality | Is the record clear and usable? | Preparer or compliance owner |
| Completeness | Is anything missing? | Preparer or compliance owner |
| Independent review | Has someone other than the preparer checked it? | Reviewer |
| Purpose authorised | May it be used for its stated purpose? | Compliance owner |
| Technical acceptance | Does the record provide enough technical detail for its stated evidence purpose? | Technical reviewer |
| Current version | Is this the version to rely on? | Compliance owner |
| Control mapping | Does it support this control? | Compliance owner |

The control mapping decision is made once for each control the evidence supports, so the total varies. MFA rollout report supports both Access control and Multi-factor authentication, so it has 8 decisions instead of 7. MFA means multi-factor authentication, which asks for more than one kind of proof when someone signs in. Evidence is accepted only when every decision is an approval. Each decision is recorded separately, so you can see who approved what.

Independent review is never self-review. Alex proposed the attendance record below, so its independent review waits for Rita, not Alex.

## Example: Attendance Awaiting Review

[![Cyber hygiene and training graph with one candidate evidence item on a dashed line and seven open decisions listed](/artifacts/docs/evidence-graph/images/pending.png)](/artifacts/docs/evidence-graph/images/pending.png)

*Actual view of the live alpha with synthetic data, captured 28 October 2026. Cyber hygiene and training has 0 accepted evidence items and 1 candidate. A dashed line links Security awareness attendance, at 0 of 7 decisions, to the control. The drawing shortens its source name, and the panel gives it in full as synthetic-doc-store. The panel reads Waiting for Olive, Alex, Rita and Theo and lists the seven open decisions with their owners.*

This record joins the graph only if all seven decisions are approvals. While it waits for decisions, it is drawn with a dashed line, does not count as accepted and has not reached the export step. Even once accepted, an attendance list only shows who was recorded as attending, not what anyone learned.

## Decisions Belong to One Version

Each decision applies to one exact version, meaning the precise file and details that were proposed. A rejection must include a reason, and it keeps that version out of the graph. The preparer then records a corrected version, and every decision on it starts open again. Earlier versions and their decisions stay readable.

## Example: An Accepted Backup Restore Test

[![Business continuity and backup graph with one accepted Backup restore test item and its details panel](/artifacts/docs/evidence-graph/images/backup.png)](/artifacts/docs/evidence-graph/images/backup.png)

*Actual view of the live alpha with synthetic data, captured 28 October 2026. Business continuity and backup, labelled Continuity in the drawing, has 1 accepted evidence item. That item, Backup restore test, is joined by a solid line and has source synthetic-backup and 7 decisions. The panel says Alex Preparer proposed it and all 7 decisions were approved on this exact version. The file check reads Fingerprint matches.*

Here is an imagined example of the documented workflow. Suppose an earlier version recorded which backup was restored but not whether the files opened afterwards. Theo rejects technical acceptance and gives that gap as the reason. Alex then records a corrected version, and all seven decisions have to be made again before it can join the graph.

> The screenshot shows only the current, accepted version. It does not show whether this item ever had an earlier or rejected version. Version history is kept on the Evidence screen.

## What a Fingerprint Proves

A SHA-256 fingerprint is a long code calculated from a file's bytes. Fingerprint matches means that, when this version was validated, the file available at its registered location had the same SHA-256 fingerprint as the value recorded for the proposed version. The panel shows that saved result; opening the panel does not run the check again.

> A matching fingerprint does not prove that the content is true or complete, that a restore really happened or who actually made the file. People still have to judge those questions.

[← Previous: Reading the Graph](reading-the-graph.md) | [Next: Findings and Exports →](findings-and-exports.md)
