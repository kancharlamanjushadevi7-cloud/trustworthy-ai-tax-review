# GreenLedger AI Tax Review

## Overview

GreenLedger AI Tax Review is a frontend prototype designed for the Trustworthy AI challenge.

The application demonstrates how AI can assist tax professionals by extracting information from tax documents while keeping humans in control of every important decision.

Instead of asking users to blindly trust AI, the interface explains:

- What the AI did
- Why it made a recommendation
- What evidence supports the recommendation
- What uncertainty exists
- What action the reviewer should take
- How users can correct the AI while maintaining a complete audit trail

---

## Problem

Tax professionals spend significant time manually reviewing AI-extracted information from tax documents.

The challenge is to build an interface that increases confidence in AI decisions without hiding uncertainty.

---

## Solution

The application provides a human-in-the-loop review workflow where reviewers can:

- Review AI extracted values
- View confidence scores
- Understand AI reasoning
- Inspect supporting evidence
- View document traceability
- Review uncertainty
- Correct AI outputs
- Approve or reject recommendations
- Maintain an audit history

---

## Key Features

### AI Recommendation

Provides the AI's suggested action together with confidence information.

### Explainability

Shows what the AI did and why it reached its recommendation.

### Evidence

Displays supporting evidence from the source document.

### Traceability

Links extracted values back to the exact document location.

### Human Review

Allows reviewers to approve, reject, or correct AI outputs.

### Audit History

Records reviewer actions to maintain transparency.

---

## Tech Stack

- React
- TypeScript
- CSS
- Vite
- Vercel

---

## Mock Data

This prototype uses simulated tax documents and AI outputs.

No backend or production AI model is connected.

---

## Future Improvements

- Live OCR integration
- Amazon Bedrock/OpenAI integration
- Real PDF rendering
- Multi-document review
- User authentication
- Reviewer collaboration
- Analytics dashboard

---

## Live Demo

Vercel Deployment

## Repository

GitHub Repository
