# John Boos Intelligent Specifier — Antigravity Demo Bundle

## What this bundle is
This is a private concept-demo specification for an intelligent commercial-kitchen product selector inspired by the public John Boos catalog and KCL-hosted model library.

The goal is to let a prospect type or select requirements such as:

> I need a three-compartment sink for a busy restaurant. I have 90 inches of wall space, I want an 18-inch drainboard on both sides, and I need 16 gauge stainless.

The application turns that request into structured requirements, finds compatible product records, ranks them deterministically, explains the result, and provides a clean path to technical assets / KCL / RFQ.

## Critical constraint
**Build this demo without requiring any private John Boos access.**

The app must work with:
- local JSON/CSV data bundled in the repo;
- publicly available product facts captured in the dataset;
- neutral SVG product schematics generated from dimensions;
- optional external source links;
- no live scraping;
- no KCL credentials;
- no ERP/PIM/CRM connection;
- no distributor feed;
- no pricing API;
- no LLM API key required.

## First instruction to Antigravity
Open `ANTIGRAVITY_MASTER_PROMPT.md` and treat it as the primary build brief. Then read the documents in numerical order.

## Demo focus
Build the strongest flow around **3-compartment sinks**, because this public sample has enough real dimensional/configuration variation to demonstrate decision logic. Also include Work Tables and Filler Tables as secondary browsable categories so the prototype feels like a platform, not a single calculator.

## Desired outcome
A polished desktop-first responsive demo that can be shown to John Boos or a similar manufacturer as:

**Intent → guided requirements → deterministic matching → visual comparison → recommendation → technical asset / RFQ handoff**

The app should feel like a real commercial product tool, not a chatbot wrapped around a product search.
