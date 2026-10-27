# Sentinel Insight — User Risk Monitoring Dashboard (UEBA prototype)

A SOC-style dashboard prototype for **insider-threat and user-behaviour monitoring (UEBA)**. It shows how an analyst can triage users by risk score, see why an account was flagged, and drill into its login and device history.

> Prototype with simulated data — no real users or logs are included.

## What it shows

| View | Purpose |
|---|---|
| **Overview cards** | Number of monitored users, suspicious and high-risk accounts at a glance |
| **Risk chart** | Distribution of risk scores across the population |
| **User risk table** | Risk score (0–100), status *Normal / Suspicious / High Risk*, device, VPN state, last activity |
| **User detail panel** | Behaviour summary, raised flags, login history and device history for one user |

## Detection scenarios modelled

Each simulated user carries the indicators a SOC analyst would look for:

- Login **outside working hours**
- Login from a **new / unknown device**
- Connection through a **VPN**
- **Large data download** (e.g. 2.3 GB from a database the user does not usually access)
- Access to a **department database unrelated to the user's role**

Risk bands: `0–30` normal · `31–70` suspicious · `71–100` high risk.

## Why I built it

My SOC lab (Wazuh + Suricata) produces alerts per host. This project explores the other side of detection: scoring **identities** instead of machines, and presenting the result so an analyst can decide in a few seconds which account to investigate first.

## Run locally

```sh
git clone https://github.com/hassanekara/sentinel-insight.git
cd sentinel-insight
npm install
npm run dev      # http://localhost:8080
```

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts — UI scaffolded with Lovable, scenarios and risk logic designed by me.

## Next steps

- [ ] Feed the dashboard with real alerts exported from Wazuh (JSON)
- [ ] Map each flag to a MITRE ATT&CK technique
- [ ] Add an analyst action log (acknowledge / escalate / close)

---
Author: **Nouradine Hassane Kara** — cybersecurity student (ESAIP), audit · vulnerability management · SOC
