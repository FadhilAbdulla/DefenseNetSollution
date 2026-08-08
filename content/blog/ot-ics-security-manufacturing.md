---
title: "OT Security for Manufacturers: Visibility Before Controls"
description: "IT security practices break on the factory floor. A realistic approach to securing OT and ICS environments — passive visibility, Purdue-model segmentation and safe monitoring."
date: "2025-12-17"
category: "Threat Intelligence"
tags: ["OT Security", "ICS", "Manufacturing", "Segmentation"]
---

Applying IT security practice directly to operational technology is how security teams get banned from the plant. Patch on Tuesday, scan the network, force a reboot — each of those is routine in IT and potentially a safety incident in OT.

Securing manufacturing environments requires a different sequence, and it starts with something most organisations have never done: knowing what is actually on the network.

## Why OT is different

**Availability outranks confidentiality.** In IT, the classic priority is confidentiality, integrity, availability. In OT it inverts completely. A production line stopping costs measurable money per minute, and in some processes an unplanned stop is a safety event.

**Lifecycles are measured in decades.** A PLC installed in 2004 is doing its job correctly and will remain in service. Windows XP-based HMIs are not an oversight; they are the vendor-supported configuration for a machine with a twenty-five year design life.

**Patching may void warranty or certification.** Vendor-validated configurations frequently cannot be modified without losing support or breaking safety certification.

**Protocols have no security model.** Modbus, DNP3, PROFINET and their relatives were designed for isolated, trusted networks. There is no authentication. A device that can send a command will be obeyed.

**Active scanning can cause outages.** A standard vulnerability scan against a PLC can crash it. This is not theoretical — it is a recurring cause of unplanned downtime when IT security tooling is pointed at OT ranges.

## Start with passive visibility

You cannot secure what you cannot see, and in most plants nobody has an accurate inventory. Machines were added by integrators over twenty years, engineering laptops come and go, and vendor remote access was configured once and never reviewed.

**Use passive monitoring**, not active scanning. A span or tap port feeding a protocol-aware sensor identifies devices, firmware versions, communication patterns and protocols without sending a single packet onto the control network.

What this typically reveals, and it is consistent across assessments:

- Devices nobody knew existed, including forgotten test equipment still connected
- Direct internet connectivity from within supposedly air-gapped segments — usually a cellular modem installed by a vendor for remote support
- Engineering workstations dual-homed between the corporate network and the control network, defeating every segmentation control in one hop
- Flat networks where a compromised HMI can reach every PLC in the plant
- Remote access tools installed by integrators with shared credentials

The dual-homed engineering workstation is the single most common serious finding, and it is usually the intended attack path in any realistic OT compromise scenario.

## Segment along the Purdue model

The Purdue Enterprise Reference Architecture gives a workable segmentation structure:

- **Level 4/5** — enterprise IT, ERP, email
- **Level 3.5** — the industrial DMZ
- **Level 3** — site operations, historians, engineering workstations
- **Level 2** — supervisory control, HMIs, SCADA
- **Level 1** — controllers, PLCs, RTUs
- **Level 0** — physical process, sensors, actuators

The critical boundary is **Level 3.5**, the industrial DMZ. No traffic should pass directly between enterprise IT and the control network. Data that IT needs — production figures, historian data — is replicated into the DMZ and read from there.

This single boundary, properly enforced, prevents the most common OT compromise scenario: ransomware entering through corporate email and spreading into production because the networks were flat.

**Practical sequence:**

1. Establish the IT/OT boundary at Level 3.5 with a firewall that understands industrial protocols
2. Remove all direct routes, including the ones added "temporarily" for a project
3. Eliminate dual-homed hosts. Engineering workstations sit on one network; access the other through a jump host in the DMZ
4. Segment between cells or production lines so a compromise in one does not reach another
5. Only then consider finer-grained segmentation

## Fix remote access

Vendor remote access is how a large share of OT incidents begin. The typical state: a vendor has a VPN account with broad network access, shared among their engineers, with credentials unchanged since installation, and no logging of what was done.

**Target state:**

- All vendor access through a broker or jump host in the industrial DMZ, never directly to control devices
- Individual named accounts, no sharing
- Multi-factor authentication
- Access enabled only for the duration of a scheduled maintenance window, on request
- Full session recording, retained
- An access review every quarter that removes vendors no longer engaged

## Monitor without touching

Detection in OT is largely about recognising deviation from an extremely stable baseline. Industrial networks are far more predictable than IT networks — the same devices exchange the same messages in the same patterns, continuously.

That makes anomaly detection unusually effective. Alert on:

- New devices appearing on the control network
- Engineering protocol commands (programme download, configuration change) outside a maintenance window
- Communication between devices that have never communicated before
- Any traffic crossing the IT/OT boundary outside approved flows
- Controller mode changes — a PLC moving from RUN to PROGRAM
- Firmware upload attempts

That last set matters most. A programme download to a PLC at 02:00 on a Sunday is either an emergency your team knows about, or an incident.

All of this can be collected passively and forwarded to the same SIEM that handles IT — provided the OT context is preserved so that analysts understand what they are looking at.

## Compensating controls where patching is impossible

Accept that many devices will never be patched. Reduce their exposure instead:

- **Network isolation** so vulnerable devices are unreachable from anywhere an attacker realistically lands
- **Application allowlisting** on Windows-based HMIs and engineering workstations. These machines run a fixed set of applications forever, which makes allowlisting far more practical than in IT
- **Removable media controls**, since USB remains a genuine vector in air-gapped environments
- **Read-only historians** exposed to IT, rather than direct database access
- **Physical security** on control cabinets and network equipment

## Incident response planning for OT

An OT incident response plan differs from IT in ways that must be worked out in advance, not during:

- **Who authorises a production stop?** This is an operations decision with financial and safety implications, not a security decision
- **What is the manual fallback?** Can the process run without the control system, and for how long
- **Safety first.** Some containment actions are unsafe mid-process. The plan must be written with process engineers, not for them
- **Recovery.** Do you have known-good backups of PLC programmes and HMI configurations? Most plants do not, and reconstructing a controller programme from scratch takes days

Tabletop this with operations, engineering and safety in the room. The first time these questions are asked should not be during an incident.

## A realistic first year

**Quarter 1:** Passive visibility deployment. Build the asset inventory. Document actual traffic flows.

**Quarter 2:** Establish the Level 3.5 boundary. Remove direct IT/OT routes and dual-homed hosts.

**Quarter 3:** Rebuild vendor remote access through a brokered, logged, time-limited model.

**Quarter 4:** Deploy OT-aware monitoring into the SOC. Run a joint IT/OT tabletop exercise.

That sequence changes the risk profile substantially without a single change to a controller.

Our [managed SOC](/services/managed-soc) supports OT telemetry alongside IT, and our team works with manufacturers across Kerala and the wider region on segmentation and visibility programmes. [Get in touch](/contact) if you need an assessment that will not stop your line.
