# Findings and Exports

[← Previous: Review and Corrections](review-and-corrections.md) | [Back to start: Evidence Graph](README.md)

Sometimes evidence reveals a problem. This page follows a problem through to a retested fix, then explains how evidence is prepared for sharing.

## From Finding to Retest

The documented workflow handles a problem as a loop:

1. **Finding:** the technical reviewer records a problem against accepted evidence.
2. **Action:** the action owner plans the remediation, meaning the fix.
3. **Treatment evidence:** a record showing what was changed is linked to the fix.
4. **Retest:** the problem is checked again. The technical reviewer approves the link to the remediation, the treatment evidence and the retest. The finding closes only when the retest passes.

[![Access control graph with the purple closed finding selected and a panel describing a retested remediation](/artifacts/docs/evidence-graph/images/finding.png)](/artifacts/docs/evidence-graph/images/finding.png)

*Actual view of the live alpha with synthetic data, captured 28 October 2026. The purple “Finding, closed” diamond is selected in the Access control graph. The panel reads: One synthetic administrator account has no recorded review date. Below that it says: Access control, severity low (synthetic scale), found in Privileged access review, Q3. Under Remediation it lists remediate: retested-passed, and it points to the Findings screen for the full journey.*

The screenshot shows only the end state: a closed finding on its control, with a remediation marked as retested and passed. Details and the full finding journey are on the Findings screen, which this guide does not show. The finding and its fix are synthetic.

## Preparing an Export

In the documented workflow, the export approver prepares a package of exact evidence versions for one named recipient and one stated purpose. As the side panel in [Reading the Graph](reading-the-graph.md) notes, evidence that has joined the graph can be included. The package is written in JSON, which is structured text that both people and software can read. It includes a manifest whose entries give each record's kind, ID and SHA-256 fingerprint. It also has a SHA-256 fingerprint of the package content, so a recipient can check whether that content changed after it was prepared. Like a file fingerprint, it does not prove that the contents are true, complete or approved for sharing.

[![One Exports table row showing a synthetic export in the prepared state with its recipient, fingerprint and preparation time](/artifacts/docs/evidence-graph/images/prepared-export.png)](/artifacts/docs/evidence-graph/images/prepared-export.png)

*Actual view of the live alpha with synthetic data, captured 28 October 2026 and cropped to one row of the Exports table. Export EXP-SYNTH-B04A90949215 is in the prepared state for the synthetic recipient RECIPIENT-SYNTH-INTERFACE. It has a 64-character SHA-256 fingerprint and was prepared on 25 September 2026 at 12:06 UTC. The purpose and the manifest are not visible in this crop.*

> Prepared does not mean sent. A prepared package has not been delivered or accepted by its recipient, and it has not been authorised for public sharing or published. In this alpha, packages stop at prepared and public release is disabled. When the Today screen marks an item as Exported, such as Privileged access review, Q3, it means the item is included in a prepared package.

## Use at Work, and Limits

Someone may ask for proof, for example in a customer questionnaire or when a new manager takes over. You can then point to the exact version that was checked and who approved it. You can also show what is still missing, whether a fix was retested, and what was prepared for whom and why. Every action and every refusal is also written to an audit trail that reads as plain sentences.

> The Evidence Graph records evidence and decisions. It does not judge whether a business meets NIS2, replace legal advice or check that records are true. This synthetic alpha is not connected to real company systems.

## Where Next

- For related practical guidance, see the [evidence pack playbook](/docs/playbooks/evidence-pack-playbook/).
- To practise recognising phishing, try the [Basic self-assessment](/docs/phishing-training/basic-self-assessment/). It is a learning self-check, not evidence of attendance or completed training.

[← Previous: Review and Corrections](review-and-corrections.md) | [Back to start: Evidence Graph](README.md)
