# Evidence Graph

The Evidence Graph is the part of NIS2COMPASS that keeps track of a business's security records and the people who checked each one. This section explains the idea in plain language and uses screenshots to walk through the live alpha.

> This is an early alpha that uses only synthetic, made-up data. It is not a production service and shows no real pilot results. It gives no compliance verdict, no certification and no legal advice.

## Four Ideas to Start With

- **NIS2** is a set of EU cybersecurity rules. Whether they apply to a particular business is a legal question that this guide does not answer.
- **A control** is a security measure or check, such as reviewing who has administrator access to company systems.
- **Evidence** is a record showing what was done, such as the signed-off result of that review.
- **A graph** here means connected records, not a chart or a score. Lines show which control a record supports, where it came from and who approved it.

## A Simple Example

Each quarter, an office manager checks which staff accounts have administrator rights and removes the ones that are no longer needed. Months later a customer asks for proof. The shared folder holds three copies of the spreadsheet, named final, final2 and checked, and nobody is sure which one was reviewed.

The Evidence Graph keeps that review linked to its control and records the details around it, so you can see:

- where the evidence came from, its **source**;
- which exact **version** was checked;
- who made each human **decision** about it;
- which controls still have no evidence;
- whether a **remediation**, meaning a fix, was **retested** after a **finding**, which is a recorded problem;
- what an **export** may share, with whom and for what purpose.

## The Today Screen

[![Today screen of the Evidence Graph alpha with three summary cards, eight evidence journey rows and a coverage map of 16 controls](/artifacts/docs/evidence-graph/images/today.png)](/artifacts/docs/evidence-graph/images/today.png)

*Actual view of the live alpha, captured 29 October 2026, showing synthetic tenant A. A note says that nothing here is a compliance verdict. The cards read: 4 of 16 controls have accepted evidence; 8 evidence items in the graph, 2 candidates waiting; no open findings, 1 closed. Journey rows track items from Source to Exported, and the coverage map marks each control as accepted, candidate or none yet.*

Each journey row has six steps: Source, File, Proposed, Decisions, In graph and Exported. Security awareness attendance has stopped at Decisions 0 of 7. Incident runbook notes is at 6 of 7 and waits only for Theo, so it is easy to see what is missing. All numbers are dated demo contents. They do not measure project performance or NIS2 coverage.

## Trying the Live Alpha

The live alpha is at [evidence.nis2compass.eu](https://evidence.nis2compass.eu/). You need a consortium account to sign in, and this guide does not give access. You can read this public screenshot guide without signing in. Its images are selected synthetic views, not a public data export. The underlying evidence files and records stay inside the controlled alpha and are not published here.

## Guided Route

1. [Reading the Graph](reading-the-graph.md): find your way around one control.
2. [Review and Corrections](review-and-corrections.md): who decides what, and what happens when evidence is wrong.
3. [Findings and Exports](findings-and-exports.md): fixes, retests and preparing a package to share.

[Next: Reading the Graph →](reading-the-graph.md)
