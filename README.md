# GreenLedger AI Review

A working frontend prototype for the **Trustworthy AI** challenge in the AI Engineer case study.

## What this prototype demonstrates

- AI-extracted tax values with confidence levels
- Clear explanations of what the AI did
- Source evidence and document traceability
- Human approval, rejection, and correction workflows
- Preserved audit history
- Multiple edge cases, including high confidence, medium confidence, and manual review

## What is real

- The full React interface
- Filtering and queue selection
- Approve and reject actions
- Correction workflow
- Source document panel
- Review progress updates
- Client-side state changes

## What is simulated

- Tax documents
- OCR and document extraction
- AI confidence scores
- AI explanations and recommendations
- Backend persistence and authentication

The case study explicitly allows mocked data and simulated AI output. The design focuses on transparency, uncertainty, evidence, and human control.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this project to GitHub.
2. Sign in to Vercel.
3. Click **Add New → Project**.
4. Import the GitHub repository.
5. Keep the default Vite settings.
6. Click **Deploy**.

## Suggested video walkthrough

1. Explain the review queue and confidence-based prioritization.
2. Open the medium-confidence wage item.
3. Show the AI explanation, evidence, warning, and recommendation.
4. Open the source document and explain traceability.
5. Approve one item.
6. Edit another item and explain the audit trail.
7. Show the low-confidence manual-review case.
8. Close by explaining what is functional and what is simulated.
