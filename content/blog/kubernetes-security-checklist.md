---
title: "Kubernetes Security: The Controls That Matter Before the Ones That Don't"
description: "RBAC, admission control, network policy and secrets handling — a prioritised Kubernetes hardening sequence for teams running EKS, AKS, GKE or self-managed clusters."
date: "2026-02-18"
category: "Cloud Security"
tags: ["Kubernetes", "Containers", "RBAC", "DevSecOps"]
---

Kubernetes security guidance tends to arrive as a list of two hundred items with no ordering, which means teams implement the easy ones and never reach the ones that matter.

Here is the sequence we actually recommend, ordered by risk reduction per unit of effort.

## 1. Fix RBAC before anything else

Cluster compromise almost always runs through the API server, and RBAC is what stands in front of it.

**Find the problems:**

- `cluster-admin` bound to anything other than a small number of named human identities
- Wildcard verbs or resources in Roles (`"*"` on `"*"`)
- Permissions to `create` on `pods` in a namespace with a privileged service account — this is container escape by design, because you can mount that service account into a pod you control
- `escalate`, `bind` or `impersonate` verbs granted anywhere they are not deliberate
- Permissions to read `secrets` cluster-wide

That third one deserves emphasis. Namespace-level pod creation is often treated as a low-privilege developer permission. Combined with a privileged service account in the same namespace, it is cluster admin.

**Fix:** enumerate with `kubectl auth can-i --list` per service account, and use an RBAC visualisation tool to find paths. Remove wildcards. Scope service accounts to namespaces, and disable automatic token mounting (`automountServiceAccountToken: false`) unless a workload genuinely calls the API.

## 2. Turn on admission control

Without an admission controller, every hardening rule you write is a suggestion.

Pod Security Admission is built in and is the right starting point. Apply the `restricted` profile in enforce mode to application namespaces, and `baseline` where `restricted` breaks something legitimate — with a documented reason and a plan to close it.

For policy beyond what PSA covers, use a policy engine (Kyverno or OPA Gatekeeper) to enforce:

- No privileged containers, no host namespace sharing, no `hostPath` mounts
- Images only from approved registries, referenced by digest
- Resource requests and limits mandatory
- Required labels for ownership and data classification
- No `latest` tags in production

Run new policies in audit mode first, review what would have been blocked, then enforce. Enforcing on day one in a live cluster is how security teams lose the trust of platform teams.

## 3. Default-deny network policy

Kubernetes networking is flat by default: every pod can reach every other pod, in every namespace. That is the lateral movement problem solved on the attacker's behalf.

Start with a default-deny ingress policy per namespace, then add explicit allows. Ensure your CNI actually enforces network policy — some configurations silently accept policy objects without applying them, which is worse than having none because it creates false confidence.

Test enforcement directly: exec into a pod and attempt a connection that should be denied.

## 4. Secrets: stop pretending base64 is encryption

Kubernetes Secrets are base64-encoded, not encrypted, and are stored in etcd. Anyone with read access to Secrets, or to etcd, has your credentials.

Minimum viable position:

- **Enable encryption at rest** for etcd with a KMS provider (AWS KMS, Azure Key Vault, GCP KMS)
- **Use an external secrets manager** as the source of truth, synced in via External Secrets Operator or CSI driver
- **Never commit secrets to Git**, even in a private repository — use sealed secrets or a GitOps-compatible external reference
- **Scope RBAC** so workloads read only their own secrets
- **Rotate** on a schedule, and after any personnel change

## 5. Supply chain

Container images are the most common vector for introducing vulnerable or malicious code.

- **Scan images in CI**, failing on critical and high severity with a documented exception process
- **Use minimal base images** — distroless or Alpine. Fewer packages means fewer CVEs and a smaller attack surface
- **Pin by digest, not tag.** A tag is mutable; a digest is not
- **Sign images** and verify signatures at admission
- **Generate an SBOM** per image so that when the next widely-exploited library vulnerability appears, you can answer "are we affected?" in minutes rather than days

That last point is the practical payoff. Organisations with SBOMs answered the Log4j question in an afternoon; organisations without spent weeks.

## 6. Runtime detection

Prevention will be incomplete. You need to see what containers actually do.

Runtime tooling (Falco, or your EDR's container support) should alert on:

- Shell spawned inside a container
- Unexpected outbound network connections from a workload
- Writes to sensitive host paths
- Package manager execution at runtime — a strong signal, since production images should never install software
- Attempts to read service account tokens by unexpected processes

Forward these to your SIEM. Container alerts sitting in a separate console are container alerts nobody actions.

## 7. Control plane and node hardening

- **Restrict API server access.** A public API server endpoint should be limited to known CIDRs at minimum; private endpoints are better.
- **Enable audit logging** on the API server and ship it off-cluster. This is your primary forensic record and it is disabled or unshipped in most clusters we assess.
- **Keep nodes patched.** Use managed node groups with automated replacement rather than in-place patching.
- **Disable the metadata service** for pods, or enforce IMDSv2 with a hop limit of 1. A pod reaching the node's instance metadata service can assume the node's cloud role — a very common escape path in EKS and AKS.

## 8. The things that get attention but matter less

Not unimportant, but frequently prioritised above the items above when they should not be:

- Service mesh mTLS. Valuable, but it is not a substitute for network policy or RBAC, and it adds significant operational complexity.
- CIS Benchmark scores as a target. Useful as a checklist, misleading as a metric — a high score with `cluster-admin` handed out freely is meaningless.
- Scanning every image for every CVE severity. Alert fatigue arrives quickly, and criticals get lost in the volume.

## A two-week starting plan

**Week 1:** Audit RBAC and remove wildcards and unnecessary `cluster-admin`. Enable API server audit logging and ship it. Enable Pod Security Admission in audit mode.

**Week 2:** Apply default-deny network policy in one namespace and validate enforcement. Enable etcd encryption. Add image scanning to CI in warn mode. Enforce IMDSv2 with hop limit 1.

That sequence removes the most-used attack paths and creates the visibility needed to do everything else safely.

Our [cloud security practice](/services/cloud-security) covers Kubernetes across EKS, AKS, GKE and self-managed clusters, including RBAC review, admission policy design and runtime detection integrated into our [managed SOC](/services/managed-soc). [Get in touch](/contact) for a cluster assessment.
