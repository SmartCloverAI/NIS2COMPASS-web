# CYBRITE

CYBRITE focuses on monitoring, anomaly detection, and incident-response support. It combines host, system, and network signals so analysts can notice activity that deserves investigation.

## What This Means For NIS2COMPASS

NIS2COMPASS uses the CYBRITE role to organize public monitoring-evidence methods: what a sanitized event record should contain, how it can be reviewed, and how a security signal can be linked to follow-up work without publishing raw telemetry or private sensor placement.

## Public Open-Source References

<!-- tool-ref:wazuh -->

**[Wazuh](https://wazuh.com/)** is an open-source security platform for collecting and correlating endpoint and system events. Public CYberSynchrony monitoring material describes Wazuh together with other monitoring components. The Wazuh server uses GPL-2.0; companion components have their own licences.

<!-- tool-ref:suricata -->

**[Suricata](https://suricata.io/)** is an open-source network threat-detection engine maintained by the Open Information Security Foundation. It can inspect network traffic and produce alerts, but real deployment requires authorization, privacy review, and careful rules and retention choices.

<!-- tool-ref:weka -->

**[WEKA](https://ml.cms.waikato.ac.nz/weka/)** is an open-source machine-learning workbench. Public CYberSynchrony framework and monitoring deliverables discuss it for anomaly-analysis research. NIS2COMPASS does not claim model accuracy, production use, or automated decision authority; any result must remain reviewable by a person.

## Related Public Resources

- [Monitoring evidence playbook](../../playbooks/monitoring-evidence-playbook.md)
- [Sanitized monitoring-event schema](/artifacts/docs/schemas/monitoring-event-sanitized.schema.json)
- [Synthetic monitoring events](/artifacts/docs/examples/synthetic-monitoring-events.jsonl)

## Public CYberSynchrony Sources

- [CYberSynchrony concept and methodology](https://cybersynchrony.eu/concept-and-methodology/)
- [D4.1: Integrated Cybersecurity Monitoring Suite](https://cybersynchrony.eu/wp-content/uploads/2025/10/CYberSynchrony_D4.1_Integrated-Cybersecurity-Monitoring-Suite-v1_V1.0_for_Submission_Final.pdf)

Last reviewed: 22 July 2026.
