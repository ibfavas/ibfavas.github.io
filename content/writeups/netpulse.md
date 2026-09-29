+++
title = "⚡ NetPulse: Real-Time Network Telemetry HUD"
date = 2026-09-28T10:00:00+05:30
draft = false
description = "NetPulse is a zero-dependency Go network diagnostic HUD for Linux. A Bubble Tea TUI aggregates gateway latency, a multi-cluster DNS latency matrix, interface throughput, and backbone telemetry into one keyboard-driven tactical dashboard."
+++

## 🔎 Why NetPulse

Debugging a network issue on Linux usually means juggling half a dozen windows: `ping` for the gateway, `mtr` for the path, `dig` for DNS, `nload` for throughput. Each one answers a different question, and none of them talk to each other.

NetPulse collapses all of that into a single terminal HUD. It is written in Go with the Charmbracelet Bubble Tea framework, runs its collectors concurrently via non-blocking goroutines, and renders everything as a cyberpunk tactical dashboard — zero interface lag even during packet drops or connection failure loops.

<div align="center">
  <img src="/ui-assets/netpulse_demo.gif" alt="NetPulse terminal HUD demo" loading="lazy" decoding="async">
</div>

---

## 🧠 Interface Modules

### ▰▰ MODULE: GATEWAY_CORE

Continuously monitors the local default gateway (auto-parsed from system routing paths). Live Braille-based latency sparklines map local link reliability at a glance, with unprivileged packet fallback when running without root capabilities.

### ▰▰ SUBSYSTEM: DNS_MATRIX

Real-time resolution benchmarking across multiple DNS clusters — system resolver, Cloudflare, Google, Quad9, OpenDNS. The context-aware input engine lets you append custom upstream resolvers on the fly and watch them race.

### ▰▰ SENSOR: LOCAL_HARDWARE & NODE: WAN_TELEMETRY

Parses low-level Linux networking layers for real-time interface throughput (`RX`/`TX` delta streams), plus automated BGP ASN mapping, WAN validation, and ISP provider identification.

### ▰▰ SYSTEM: EXTERNAL_TRANSIT

High-density tabular metrics for critical backbones: current RTT, minimum, maximum, average, packet loss, and jitter — computed concurrently. Supports an interactive full-screen MTR mode tracing individual network hops.

### ▰▰ SUBSYSTEM: TELEMETRY_EVENT_LOG

A scrolling operational ring buffer console that hooks diagnostic notifications, alert thresholds, and user inputs dynamically.

---

## 🕹️ Keyboard Matrix

| Key | Action |
|---|---|
| `Tab` | Cycle module focus |
| `A` | Add host (DNS server or WAN target, context-aware) |
| `X` | Delete host |
| `R` | Rename host |
| `Enter` / `T` | Full-screen MTR mode |
| `+` / `-` | Scale tick rate (`250ms` – `5s`) |
| `Esc` | Freeze viewport on an anomaly |
| `Q` / `Ctrl+C` | Clean shutdown |

---

## ⚙️ Design Notes

- **Concurrency first:** every collector is an independent goroutine; a stalled DNS resolver never blocks gateway telemetry.
- **Raw ICMP with fallback:** uses raw sockets when privileged, degrades gracefully to unprivileged mode.
- **Zero dependencies:** ships as a single Go binary — no runtime, no agent, no config files.

## 🛠️ Installation

Requirement: `Go 1.21+`

```bash
git clone https://github.com/ibfavas/netpulse.git
cd netpulse
go build -o netpulse .
./netpulse
```

---

## ✅ Takeaway

NetPulse is the tool I reach for when a network problem is vague — *"the internet feels slow"* — and I need every layer of the path visible at once. One binary, one screen, every signal. ⚡
