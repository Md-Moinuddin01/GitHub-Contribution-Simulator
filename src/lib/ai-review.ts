import type { PullRequest } from "@/types";

export type AiReviewInput = {
  title: string;
  description: string;
  code: string;
  issueTitle?: string;
  expectedSolution?: string;
  changedFiles?: string[];
};

export type AiReviewResult = {
  reviewerName: string;
  decision: "COMMENT" | "REQUEST_CHANGES" | "APPROVE";
  summary: string;
  score: number;
  lineComments: { path: string; line: number; body: string }[];
  checks: { label: string; passed: boolean; detail: string }[];
};

const fallbackChecks = [
  "Issue completion",
  "PR title quality",
  "PR description quality",
  "Naming conventions",
  "Missing tests",
  "Formatting",
  "Logical errors",
];

export async function reviewPullRequest(input: AiReviewInput): Promise<AiReviewResult> {
  const prompt = `You are an open-source maintainer reviewing a beginner pull request.
Issue: ${input.issueTitle ?? "Practice issue"}
Expected solution: ${input.expectedSolution ?? "Small scoped fix"}
PR title: ${input.title}
PR description: ${input.description}
Changed files: ${(input.changedFiles ?? []).join(", ")}
Code:
${input.code.slice(0, 5000)}

Return concise review feedback with a decision.`;

  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
          input: prompt,
        }),
      });
      const json = await response.json();
      const text =
        json.output_text ??
        json.output?.flatMap((item: { content?: { text?: string }[] }) => item.content ?? []).map((item: { text?: string }) => item.text).join("\n");
      if (text) return buildReviewFromText(text, input);
    } catch (error) {
      console.warn("OpenAI review failed, using deterministic simulator review.", error);
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? "gemini-2.5-flash"}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        },
      );
      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return buildReviewFromText(text, input);
    } catch (error) {
      console.warn("Gemini review failed, using deterministic simulator review.", error);
    }
  }

  return deterministicReview(input);
}

function buildReviewFromText(text: string, input: AiReviewInput): AiReviewResult {
  return {
    reviewerName: "AI Maintainer",
    decision: text.toLowerCase().includes("approve") ? "APPROVE" : "REQUEST_CHANGES",
    summary: text.slice(0, 800),
    score: text.toLowerCase().includes("approve") ? 91 : 74,
    lineComments: [
      {
        path: input.changedFiles?.[0] ?? "src/App.tsx",
        line: 3,
        body: "Review the naming and edge-state handling around this change.",
      },
    ],
    checks: fallbackChecks.map((label, index) => ({
      label,
      passed: index < 4 || text.toLowerCase().includes(label.toLowerCase().split(" ")[0]),
      detail: index < 4 ? "Looks solid." : "Consider adding a clearer verification note.",
    })),
  };
}

function deterministicReview(input: AiReviewInput): AiReviewResult {
  const hasGoodTitle = input.title.trim().length >= 12;
  const hasDescription = input.description.trim().length >= 40;
  const hasTests = /test|spec|npm test|verification/i.test(input.description + input.code);
  const hasLoadingOrEmpty = /loading|empty|fallback|error/i.test(input.code + input.description);
  const score = [hasGoodTitle, hasDescription, hasTests, hasLoadingOrEmpty].filter(Boolean).length * 20 + 15;
  const approve = score >= 75;

  return {
    reviewerName: "AI Maintainer",
    decision: approve ? "APPROVE" : "REQUEST_CHANGES",
    summary: approve
      ? "Thanks for your contribution. The solution is scoped, the PR description is clear, and the verification notes are enough to merge."
      : "Thanks for your contribution. The solution is close, but please improve the PR description, add a loading or empty state where relevant, and include a test or manual verification note.",
    score,
    lineComments: approve
      ? []
      : [
          {
            path: input.changedFiles?.[0] ?? "src/App.tsx",
            line: 4,
            body: "Please make this state handling clearer for future contributors.",
          },
        ],
    checks: [
      { label: "Issue completion", passed: hasLoadingOrEmpty || hasDescription, detail: hasDescription ? "Intent is clear." : "Describe the issue impact." },
      { label: "PR title quality", passed: hasGoodTitle, detail: hasGoodTitle ? "Specific and readable." : "Use a more descriptive title." },
      { label: "PR description quality", passed: hasDescription, detail: hasDescription ? "Includes useful context." : "Add summary and verification notes." },
      { label: "Naming conventions", passed: true, detail: "Names are readable enough for this exercise." },
      { label: "Missing tests", passed: hasTests, detail: hasTests ? "Verification included." : "Add npm test output or a small test." },
      { label: "Formatting", passed: true, detail: "No formatting concerns detected." },
      { label: "Logical errors", passed: approve, detail: approve ? "No blocker found." : "Resubmit after tightening the edge state." },
    ],
  };
}

export function reviewStatusFromResult(result: AiReviewResult): PullRequest["status"] {
  if (result.decision === "APPROVE") return "Approved";
  if (result.decision === "REQUEST_CHANGES") return "Changes Requested";
  return "Open";
}
