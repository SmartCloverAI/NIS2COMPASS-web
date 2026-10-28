# Reading the Graph

[← Previous: Evidence Graph](README.md) | [Next: Review and Corrections →](review-and-corrections.md)

The Graph screen shows one control at a time, along with the evidence connected to it. This walkthrough uses the demo's Access control view.

[![Access control graph with five green evidence boxes around a central control circle and a purple closed finding diamond](/artifacts/docs/evidence-graph/images/graph.png)](/artifacts/docs/evidence-graph/images/graph.png)

*Actual view of the live alpha with synthetic data, captured 28 October 2026. Access control reports 5 accepted evidence items, 1 finding closed. Solid lines join the central Access control circle to five evidence boxes. Each box has a source node (synthetic-iam or synthetic-idp) and a decisions node. A purple diamond, “Finding, closed”, links to a Remediation node. The side panel describes the selected item, Privileged access retest, Q3.*

## Step by Step

1. **Choose a control** from a tile on the Today coverage map or from the Control menu. The menu shows each control's status, here Access control (accepted).
2. **Start in the centre.** The dark circle is the control itself.
3. **Follow the green boxes.** Each one is an evidence item, such as Quarterly access review. Long names are shortened.
4. **Read the small rounded nodes.** A source node names the system a record came from, here fictional systems called synthetic-iam and synthetic-idp. A decisions node counts the human decisions on that version. Most items show 7. MFA rollout report shows 8; MFA means multi-factor authentication, which asks for more than one kind of proof when someone signs in. [Review and Corrections](review-and-corrections.md) explains why this item has an extra decision.
5. **Click an item** to read about it in the side panel.

## What the Lines Mean

| Line | Legend wording | Status |
| --- | --- | --- |
| Solid | Accepted link | Accepted |
| Dashed | Waiting for decisions | Candidate |
| Dotted | Rejected, needs a corrected version | Rejected |

Every evidence link in this Access control view is solid. A dashed line appears in the training example on the next page. No screenshot in this guide shows a dotted line.

## The Side Panel

For Privileged access retest, Q3, the panel says Alex Preparer proposed it and that all 7 decisions were approved on this exact version. Every journey step is done except Exported, and a note says the export approver can include it in an export package. The panel also shows the control it is for, its source (synthetic-iam) and the file check result, Fingerprint matches.

Accepted here means that named people accepted it into the evidence workflow. It does not mean an outside body accepted anything, and it does not mean the company is compliant.

## Graph or List

The Graph and List buttons switch the same control between a drawing and a list. The drawing makes connections easy to see. A list can be quicker to scan when there are many items.

## Coverage, Not Compliance

The coverage map, and counts such as 4 of 16 controls, only tell you which controls have accepted evidence. A control with accepted evidence can still have gaps. Do not read the demo's 16 controls as a complete list of NIS2 requirements.

> Coverage counts linked records. It is not a compliance score. The counts are dated synthetic demo contents, not measures of project performance.

[← Previous: Evidence Graph](README.md) | [Next: Review and Corrections →](review-and-corrections.md)
