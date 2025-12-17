---
title: "FintraOS Part 2: The Financial Graph & Event Sourcing"
date: "2025-08-15"
excerpt: "Why we killed CRUD. A deep dive into the Event Sourcing architecture that powers the Financial Graph."
category: "Engineering"
readTime: "18 min read"
---

### Series Context

Building on Part 1’s Operating System thesis, this article defines the Financial Graph and its event-sourced foundation. The scope spans current accounts, credit cards, brokerages, retirement wrappers (ISAs, SIPPs, 401(k)s), crypto wallets, loans, and mortgages.

### The Database Architecture of Finance

Most databases have amnesia. They know what is true *right now*, but they have no idea how they got there.

In 99% of web applications, this is fine. If you update your profile bio on a social network, the old bio is overwritten. The database remembers the *current state* and forgets the history. This is the **CRUD** model (Create, Read, Update, Delete), and it powers the entire internet.

But in finance, amnesia is a crime.

If a user's balance drops from $1,000 to $500, the system cannot just "update" the number. It must prove *why* it changed. Was it a withdrawal? A fee? A market crash? A hack? If your database only stores the current balance, you have lost the evidence. You cannot audit, you cannot reverse, and you cannot explain.

We realized that for a financial operating system, CRUD was not just insufficient - it was dangerous. So we killed it.

### The FintraOS Approach: Immutable History via Event Sourcing

FintraOS is built on a radically different architecture: **Event Sourcing**.

In our system, we **never** delete data. We **never** overwrite a record. Instead, we store a permanent, immutable log of *events*. The database is not a store of current state; it is a store of history.

#### The Event Log
The "Current Balance" is not a number stored in a column. It is a value *derived* by replaying the history of events:

*   **Event 1 (T-0):** `AccountCreated { account_id: "acc_123", initial_balance: 0 }`
*   **Event 2 (T-1):** `Deposit { amount: 100, source: "payroll" }`
*   **Event 3 (T-2):** `Withdrawal { amount: 50, merchant: "Starbucks" }`

To determine the balance, the system calculates: $0 + $100 - $50 = $50. While this may sound computationally expensive, the use of **Postgres Hypertables** and intelligent **Snapshotting** allows us to perform these derivations in microseconds.

### Deep Dive: The Hypertable Schema

We do not use a standard SQL table structure. We utilise a **Postgres Hypertable** (powered by TimescaleDB) to partition our event log by time. This ensures high ingestion rates and efficient querying of time-series data.

```sql
CREATE TABLE events (
    event_id UUID PRIMARY KEY,
    aggregate_id UUID NOT NULL, -- The Account or User ID
    aggregate_type VARCHAR(50) NOT NULL, -- 'ACCOUNT', 'PROFILE'
    event_type VARCHAR(50) NOT NULL, -- 'TransactionCreated', 'BalanceUpdated'
    version BIGINT NOT NULL, -- Optimistic Concurrency Control
    payload JSONB NOT NULL, -- The actual data (Encrypted at rest)
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

This schema allows FintraOS to ingest millions of events per second while maintaining strict ordering guarantees for every single account aggregate.

### Events Beyond Transactions: Multi-Asset Examples

Event Sourcing applies cleanly to securities and retirement domains:
- `TradeExecuted { venue, symbol, side, quantity, price, fees }`
- `PositionUpdated { account_id, symbol, quantity, avg_cost }`
- `DividendReceived { symbol, amount, withholding_tax }`
- `CorporateActionApplied { type: SPLIT, ratio, effective_date }`
- `TaxLotCreated { lot_id, symbol, quantity, cost_basis, acquisition_date }`

Across multiple custodians, the log enables deterministic reconciliation of holdings, P&L, and exposures for the user’s unified portfolio view.

### The Three Superpowers of Event Sourcing

This architecture grants FintraOS capabilities that are impossible in CRUD-based systems:

#### 1. Time Travel (The "Wayback Machine" for Finance)
Because every state change is stored, we can query the system for the state of an entity at *any specific point in time*.
*   *Query:* "What was the user's liquidity at 4:02 PM last Tuesday?"
*   *Action:* The system replays the event stream up to that exact timestamp.
*   *Use Case:* This is critical for underwriting (analysing historical volatility), auditing (proving compliance at a specific moment), and debugging.

#### 2. Perfect Auditability & Correction
If a bug occurs, we do not "fix" the database row directly, as that would destroy the evidence of the error. Instead, we issue a `CorrectionEvent`.
*   **Event 4 (Error):** `Withdrawal { amount: 50 }` (Duplicate processing)
*   **Event 5 (Fix):** `Correction { ref_event: 4, amount: +50, reason: "Duplicate processing" }`

The history of the mistake and the subsequent fix is preserved forever. This transparency builds trust with auditors and regulators.

#### 3. Hypothetical Scenarios ("What If" Engines)
We can "fork" the event stream, similar to a Git branch, to run simulations.
*   *Scenario:* "What if this user hadn't bought that car three months ago?"
*   *Action:* We fork the stream at T-minus-3-months, filter out the "Car Purchase" event, and replay the subsequent history.
*   *Result:* We can project the user's finances into an alternate future. This powers the **Vault** module's simulation engine, allowing wealth managers to demonstrate the long-term impact of financial decisions to their clients.

### Why This Matters for Wealth

This isn't just database theory. It is the foundation of **Next-Gen Advisory**.

If you want to build a robo-advisor that truly understands a user, you cannot just look at a static snapshot of their net worth. You need to understand the *velocity* of their wealth. You need to know if they panicked and sold during the 2020 crash. You need to replay their financial life to understand their psychology.

Event Sourcing gives you that context. It turns a flat database into a rich, navigable biography of the user's financial life.

### CQRS: Separating Reads from Writes

To ensure high performance, we employ the **CQRS (Command Query Responsibility Segregation)** pattern.

1.  **The Write Side (Core):** Optimised for high-throughput ingestion. It appends events to the immutable log. Its primary concern is consistency and speed of writing.
2.  **The Read Side (Views):** Optimised for instant access. We use "Projectors" that listen to the event stream in real-time and update read-optimised views in Redis (for caching) or standard SQL tables (for complex querying).

This architecture provides the best of both worlds: the unshakeable integrity of a blockchain-like ledger with the sub-millisecond read speeds of a high-performance cache.

### Next

Now we have a perfect memory of the past. But what about the future? In Part 3, we'll look at how we build a brain on top of this nervous system - one that doesn't just record transactions, but anticipates them. We'll explore our Bi-Modal Intelligence Architecture and how it handles everything from portfolio rebalancing to retirement planning.
