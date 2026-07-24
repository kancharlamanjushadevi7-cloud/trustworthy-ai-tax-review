# Video Walkthrough Script

Hi, I’m Manjusha. This prototype addresses the Trustworthy AI challenge for an AI-powered tax platform.

The main goal was to make AI output understandable and actionable without overwhelming the tax preparer.

The landing screen is an AI review queue. Items are prioritized by risk and confidence, and each item clearly shows whether it is ready to approve, needs review, or requires manual review.

When I open an item, I can see the AI-extracted value, its confidence level, what the AI did, the supporting evidence, the uncertainty, and the recommended next action.

I intentionally avoided showing only a confidence percentage. The interface translates confidence into plain-language guidance, such as “review recommended” or “manual review required.”

The source document panel gives the preparer direct traceability from the return field back to the document, page, and exact section. In a production system this would be connected to OCR and document parsing, but here it is simulated with realistic mock data.

The user remains in control. They can approve, reject, or correct the AI output. When a correction is made, the original value is preserved and the reason is recorded, creating a clear audit trail.

I also included multiple edge cases: a high-confidence item, a name mismatch, a low-quality document, and an unusual year-over-year change.

The frontend interactions are functional. The AI extraction, confidence scores, source documents, and backend persistence are simulated.

Thank you for reviewing my submission.
