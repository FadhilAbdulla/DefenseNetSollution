---
title: "PHP to Shell: How Web Shells Get In and How to Stop Them"
description: "How attackers turn PHP flaws into server access, what to look for, and the server settings that break the chain from upload or injection to a working web shell."
date: "2026-11-24"
category: "Offensive Security"
tags: ["PHP", "Web Shell", "Remote Code Execution", "Hardening"]
---

A web shell is a script on your server that runs an attacker's instructions over ordinary web requests. PHP is a common host because a single file in the right folder executes as soon as it is requested.

This is a defender's guide. It explains the route without supplying payloads.

## The routes in

| Route | What fails |
| --- | --- |
| File upload | Executable files accepted or stored in a served folder |
| File inclusion | A user-controlled path reaches an include statement |
| Command or code injection | Input reaches a shell or evaluation function |
| Unsafe deserialisation | Untrusted data becomes objects with side effects |
| Vulnerable PHP runtime | [CVE-2024-4577](/resources/cve/cve-2024-4577/), [CVE-2019-11043](/resources/cve/cve-2019-11043/) |
| Left-over tools | [CVE-2017-9841](/resources/cve/cve-2017-9841/) in an exposed vendor folder |
| Stolen CMS login | Theme or plugin editor used to write code |

## From first file to full control

After the first execution, attackers typically identify the account and host, read configuration files for database and cloud credentials, plant extra copies, then attempt privilege escalation or lateral movement. Removing the first file rarely ends it.

## Break the chain

### Uploads

- Store outside the web root and serve through a handler
- Generate names yourself, and allow a short list of types
- Re-encode images rather than trusting their extension
- Disable script execution in upload folders

In Nginx, for an uploads path:

```
location ^~ /uploads/ {
    location ~ \.php { return 403; }
}
```

### Runtime

- Run a supported PHP version, with PHP-FPM pools under separate low-privilege users
- Make code read-only to the web user, with writable paths kept apart
- Disable process functions the application does not need through `disable_functions`. It reduces risk but has known bypasses, so it is not a boundary
- Set `expose_php = Off` and `display_errors = Off`

### Network and deployment

- Default-deny outbound traffic from web servers
- Deploy immutable builds, so unexpected files stand out
- Keep `.env`, `vendor` and `.git` out of the web root

## Hunt for an existing shell

1. Compare deployed files with the release. Differences beat signature matching.
2. List recent PHP files in writable folders, remembering that timestamps can be forged:

```
find /var/www -type f -name '*.php' -mtime -14 -ls
```

3. Find POST requests to files that normally receive none, or to a URL with one visitor.
4. Alert when a web server process starts a shell, downloader or compiler.
5. Check scheduled tasks, server configuration and auto-prepend settings for persistence.

## If you find one

Do not delete it first. Isolate the server, preserve memory, disk and logs, work out the entry route, rebuild from a clean source and rotate every secret the application could read. Reinstalling without closing the route invites a second visit.

Web application firewalls slow this down and help with urgent cover, but cannot replace these settings. If you suspect a live shell, contact our [incident response team](/services/incident-response/).
