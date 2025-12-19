---
title: "Rigid Workflows vs Agentic Decisions"
date: "2025-02-05"
excerpt: "Why fixed, linear operations break in modern fintech, and how agentic systems adapt across Bitcoin, Lightning and Liquid under clear policy guardrails."
series: "Agentic Finance"
category: "AI Agents"
readTime: "6 min read"
---

# Rigid Workflows vs Agentic Decisions

The linear assembly line is Fintech’s original sin.

For decades, we architected systems as if the world were deterministic: `Validate → Approve → Execute → Book`. This imperative logic works beautifully in a closed database. It fails catastrophically in the adversarial, probabilistic reality of public blockchains.

When fees spike 500% in a block, or a Lightning route collapses due to liquidity shifts, a rigid script simply fails. It throws an exception and screams for a human. In a 24/7 global market, this fragility is a liability we can no longer afford.

The solution is not better scripts. It is a fundamental inversion of control: from **Rigid Workflows** to **Agentic Decisions**.

## The Fallacy of the Happy Path

Traditional payment hubs are built on the "Happy Path"—the assumption that if inputs are valid, the output is guaranteed. They treat Bitcoin and Lightning as dumb pipes.

But the network is a living organism.
- **Mempool density** fluctuates, making static fee logic expensive or stuck.
- **Lightning liquidity** is fluid; a channel viable millisecond ago may now be unbalanced.
- **Liquid Federation** signers may be rotating.

A rigid script hits these walls and breaks. An agent, however, is designed for the unhappy path. It does not follow a sequence; it pursues a **declarative goal** ("Settle 5 BTC to Vendor X by 14:00 with max 0.1% slippage") and autonomously navigates the terrain to achieve it.

## The Agentic Architecture: OODA Loops in Rust

We are moving from `if-this-then-that` logic to continuous **OODA loops** (Observe, Orient, Decide, Act), likely running in high-assurance environments (Rust/TEE).

### 1. Observe (The Sensory Layer)
The agent doesn't just read a database. It actively monitors the physical reality of the chain:
- **Mempool topography:** "Is the next block full? What is the feerate for 90% probability within 2 blocks?"
- **Gossip network:** "Which Lightning nodes are offline? Where is the liquidity trapped?"
- **Liquid peg status:** "Is the bridge congestion clearing?"

### 2. Orient (Contextual State)
It synthesises raw data into actionable intelligence against your specific constraints:
- "Route A is cheaper but relies on a flakey peer."
- "On-chain fees are high, but this invoice expires in 10 minutes."
- "Our hot wallet balance is low; we need to trigger a submarine swap before executing."

### 3. Decide (Policy Engine)
This is the core. Instead of hardcoded logic, the agent queries a **Deterministic Policy Engine** (e.g., OPA or bespoke WASM modules).
- *Input:* "Proposal: Send via Lightning path [A, B, C], fee 20 sats."
- *Policy Check:* "Is fee < 0.5%? Is Node B on the blacklist? Is the cumulative hourly volume under cap?"
- *Result:* `APPROVED` or `REJECTED`.

### 4. Act (Cryptographic Execution)
The agent constructs the PSBT (Partially Signed Bitcoin Transaction) or HTLC onion packet. It signs with a scoped key—or better, coordinates a MuSig2 threshold signature—and broadcasts.

## Case Study: The Liquidity Router

Consider a treasury agent tasked with paying a $50k invoice.

**The Rigid Script:**
Tries to send $50k via Lightning. Fails (no route capacity). Tries on-chain. Fails (fee limit exceeded). *Alerts Ops Team at 3 AM.*

**The Agent:**
1. **Analyses:** $50k is too large for a single atomic path but urgent.
2. **Splits:** Decomposes the payment into five $10k shards.
3. **Routes:** Sends three shards via distinct Lightning paths (MPP) to optimise liquidity usage.
4. **Bridges:** Notices the remaining liquidity is expensive; swaps $20k into L-BTC on Liquid for a confidential settlement with a partner exchange.
5. **Settles:** Verifies pre-images for all Lightning parts and the blinding factor for the Liquid tx.
6. **Books:** Writes a single unified "Payment Complete" event to the ledger.

Zero human intervention. Zero 3 AM pages.

## Governance: The Code is the Compliance Officer

The fear of agents is "rogue AI". The reality is **cryptographic confinement**.

An agent doesn't have the master keys. It operates within a **Macaroon-baked** or **Miniscript-enforced** sandbox. It can propose transactions, but the policy engine (or a hardware security module) must countersign.

This enables a new paradigm: **Compliance-as-Code**.
Every decision the agent makes—why it chose Path A over Path B, why it paid that specific fee—is cryptographically signed and logged. You don't audit the *process* once a year; you audit the *logic* continuously.

## Summary

The shift to agentic finance isn't about AI buzzwords. It's about building systems resilient enough for the volatility of the real world.

Stop writing fragile scripts for a probabilistic future. Build agents that can observe, think, and execute.

