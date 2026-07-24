export type ReviewStatus = "Needs review" | "Ready to approve" | "Manual review";
export type Decision = "pending" | "approved" | "rejected" | "corrected";

export type ReviewItem = {
  id: number;
  field: string;
  form: string;
  value: string;
  source: string;
  page: number;
  section: string;
  confidence: number;
  status: ReviewStatus;
  warning: string;
  explanation: string;
  evidence: string[];
  recommendation: string;
  decision: Decision;
  correctedValue?: string;
  correctionReason?: string;
};

export const initialItems: ReviewItem[] = [
  {
    id: 1,
    field: "Federal wages",
    form: "Form 1040 · Line 1a",
    value: "$82,450",
    source: "2025_W2_Acme.pdf",
    page: 1,
    section: "Box 1",
    confidence: 86,
    status: "Needs review",
    warning: "Employee name differs slightly from the taxpayer profile.",
    explanation: "The AI extracted the amount from Box 1 of the W-2 and mapped it to Form 1040 Line 1a.",
    evidence: [
      "Taxpayer ID matches the client profile",
      "Employer EIN matches prior-year records",
      "Document name uses a shortened middle name"
    ],
    recommendation: "Confirm the taxpayer identity, then approve the extracted value.",
    decision: "pending"
  },
  {
    id: 2,
    field: "Federal income tax withheld",
    form: "Form 1040 · Line 25a",
    value: "$12,280",
    source: "2025_W2_Acme.pdf",
    page: 1,
    section: "Box 2",
    confidence: 98,
    status: "Ready to approve",
    warning: "No material issue detected.",
    explanation: "The value was extracted from Box 2 and directly mapped without transformation.",
    evidence: [
      "Clear document image",
      "Box label and amount detected consistently",
      "Value matches payroll summary"
    ],
    recommendation: "Approve the value.",
    decision: "pending"
  },
  {
    id: 3,
    field: "Student loan interest",
    form: "Schedule 1 · Line 21",
    value: "$1,475",
    source: "1098E_MPower.pdf",
    page: 1,
    section: "Box 1",
    confidence: 63,
    status: "Manual review",
    warning: "Low image quality and a partially obscured digit.",
    explanation: "The AI detected a likely interest amount, but one digit has low visual confidence.",
    evidence: [
      "Document type classified as Form 1098-E",
      "Box 1 location identified",
      "Last digit has low OCR certainty"
    ],
    recommendation: "Open the source document and manually verify the amount.",
    decision: "pending"
  },
  {
    id: 4,
    field: "Qualified dividends",
    form: "Form 1040 · Line 3a",
    value: "$940",
    source: "1099DIV_Vanguard.pdf",
    page: 2,
    section: "Box 1b",
    confidence: 94,
    status: "Needs review",
    warning: "Value is valid, but it is 42% higher than the prior year.",
    explanation: "The AI extracted Box 1b and flagged the year-over-year change as unusual.",
    evidence: [
      "Source value is clearly visible",
      "Prior-year value was $662",
      "No duplicate dividend form detected"
    ],
    recommendation: "Verify that no amended or duplicate form exists, then approve.",
    decision: "pending"
  }
];
