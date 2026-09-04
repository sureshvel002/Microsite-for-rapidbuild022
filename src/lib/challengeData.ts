import type { ChallengeCard } from "@/lib/challengeStorage";

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// GMS (Growth Market Sales) Enterprise Agentic AI Challenge Cards
//
// Twenty-four challenges across six industry domains, four per domain.
// Every card is agentic by construction — work is decomposed across
// specialist agents that call enterprise systems as tools — and every one
// carries an explicit human sign-off gate. No card recommends autonomous
// action on money, clinical care, network control or a customer-facing
// commitment.
//
// Source of truth: the GMS challenge-card brief. Emphasis inside body text
// uses `**bold**` markers, rendered inline by <RichText> in
// ChallengeCards.tsx / Prompts.tsx. `number` is a stable internal id used
// for storage and list badges.
// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

export interface ChallengeTheme {
  id: string;
  label: string;
  /**
   * Condensed label for the filter bar, which holds all seven options on a
   * single line. Kept short enough that the row fits without scrolling on a
   * laptop; the full `label` is shown as the pill's tooltip.
   */
  short: string;
}

/** The six domains, in brief order — drives the theme filter on the cards page. */
export const challengeThemes: ChallengeTheme[] = [
  { id: "banking", label: "Banking & Financial Services", short: "Banking & FS" },
  { id: "energy", label: "Energy & Utilities", short: "Energy" },
  { id: "healthcare", label: "Healthcare", short: "Healthcare" },
  { id: "sales", label: "Sales & Marketing", short: "Sales & Mktg" },
  { id: "retail", label: "Retail", short: "Retail" },
  { id: "hospitality", label: "Hospitality", short: "Hospitality" },
];

export const challenges: ChallengeCard[] = [
  {
    number: "BFS1",
    themeId: "banking",
    theme: "Banking & Financial Services",
    focus: "Financial crime",
    title: "Continuous KYC Refresh Agent",
    summary:
      "40,000 periodic KYC files a quarter, ~80% closing unchanged — and the backlog has never been clear.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Tier 1", kind: "plain" },
      { label: "Autonomous workflow", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "Every customer file must be reopened on a risk-based cycle — historically every two to five years, changed or not. Across 4m relationships that is roughly 40,000 files a quarter, and the backlog has never been clear. A low-risk file takes 40–90 minutes of re-fetching, re-screening and re-keying the same answer; around 80% close unchanged, consuming the capacity the other 20% needs. Ownership changes between review dates go unseen, and the regulator treats an overdue review as a control failure.",
    whyHard: [
      "Entity resolution and registry access across **nine jurisdictions**, joining structured filings to unstructured adverse media.",
      "The critical path is policy, not technology: which files may close with **no human review at all**. Model risk signs that off before a line is written.",
      "It runs unattended, so it has to be right about when it does not know — a false “closed unchanged” is a control failure with a date on it.",
    ],
    whyAgentic: [
      "A scope agent puts a file in play on a cycle date or a behaviour change; refresh agents pull filings, ownership, screening and adverse media and flag **only what moved**.",
      "A behaviour agent tests twelve months of transactions against declared activity, with graph reasoning resolving ownership across jurisdictions.",
      "Coordinated agents write into one case record as sequential steps. Reconciled files close with a recorded rationale, unread; conflicts route to an analyst with the evidence already assembled.",
    ],
    successCriteria: [
      "Backlog held at zero; 60–75% straight-through on low and medium risk.",
      "Material change caught the day it happens, not at the next cycle date.",
      "Overdue-review findings eliminated; analyst time moved onto real divergence.",
    ],
    signOffGate:
      "Re-rating, enhanced due diligence and exit stay human. The analyst's reasoning on each escalation tunes what escalates next.",
  },
  {
    number: "BFS2",
    themeId: "banking",
    theme: "Banking & Financial Services",
    focus: "Customer outcomes",
    title: "Pre-Arrears Support Orchestration Agent",
    summary:
      "Customers in difficulty are reachable for weeks before they miss a payment; the bank reaches them after.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Tier 1", kind: "plain" },
      { label: "Highest conduct exposure", kind: "plain" },
      { label: "FCA contact rules", kind: "plain" },
    ],
    context:
      "Customers in difficulty are reachable for weeks before they miss a payment; the bank usually reaches them after. Around 240,000 accounts show early strain each year. Outreach is a campaign rather than a conversation — one message, one segment, one channel, the bank's timing — and engaged customers repeat themselves to a new person at every contact. Vulnerability surfaces on the third call, and only if the customer raises it. Consumer Duty requires action while FCA contact rules limit it, and both bind every message.",
    whyHard: [
      "Highest conduct exposure in the set. Legal, conduct risk and the vulnerable-customer team design it, because **the failure mode is a harmed customer**.",
      "Channel identity resolution across app, SMS, voice and letter, so affordability travels with the customer instead of being asked again.",
      "A tested rule for when the AI must stop — designed in, not a confidence threshold retrofitted after launch.",
    ],
    whyAgentic: [
      "A strain agent scores pre-arrears signals: salary credit nine days late, spend narrowing to essentials, buffer thinning.",
      "A conversation agent builds affordability through dialogue rather than a form, on the customer's channel and timing, inside FCA contact limits.",
      "A detection agent reads distress and vulnerability across text and voice and **changes routing, not wording**. Cross-channel state keeps it one continuous conversation from app to phone.",
    ],
    successCriteria: [
      "Contact weeks earlier than the missed payment, at engagement rates the campaign never reached.",
      "More arrangements surviving 90 days — tracked as the outcome measure, not contact volume.",
      "Consumer Duty evidenced by outcomes rather than activity counts.",
    ],
    signOffGate:
      "The arrangement is always a human decision. Distress, vulnerability or anything non-standard stops the system and routes to a specialist with the full conversation attached.",
  },
  {
    number: "BFS3",
    themeId: "banking",
    theme: "Banking & Financial Services",
    focus: "Conduct risk",
    title: "Silent Harm Detection Agent",
    summary:
      "Harm is counted only when a customer objects, so the silently harmed population stays unmeasured.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Tier 1", kind: "plain" },
      { label: "Detection engine", kind: "plain" },
      { label: "Board reporting", kind: "plain" },
    ],
    context:
      "Consumer Duty holds the bank to customer outcomes rather than complaint volumes, and the FCA has found firms reporting activity instead. The 68,000 complaints a year across 11m customers are the visible surface; the silently harmed population is unmeasured. Harm is counted only when a customer objects, root causes are logged case by case and never aggregated, and complaint, pricing, fee, service and outcome data sit apart — so “who else does this happen to” has no answer. Every major redress programme began as a pattern seen too late.",
    whyHard: [
      "Feasible on existing data but hard organisationally: **the output is unwelcome and expensive**, and without finance in the room it gets defunded.",
      "The route from finding to funded remediation has to be agreed before switch-on, or the engine produces findings nobody owns.",
      "It must propose patterns nobody wrote a rule for, so unsupervised discovery is unavoidable — and its false positives cost real credibility.",
    ],
    whyAgentic: [
      "The engine runs continuously across the whole base rather than against a queue, joining complaint narratives, transcripts, fee and pricing events, product performance and service failures into one outcome view.",
      "A discovery agent proposes harm patterns from upheld complaints and anomalies; a quantification agent tests each across every account, **counting the cohort and sizing redress**.",
      "A causal agent traces a confirmed pattern back to the product, pricing or process decision behind it, and packages it with the owner named.",
    ],
    successCriteria: [
      "Harm found in months rather than years; remediation costed at thousands of customers, not hundreds of thousands.",
      "Root causes closed at source, with time-to-closure tracked as the measure.",
      "Board reporting that evidences outcomes — the named regulatory gap — instead of complaint counts.",
    ],
    signOffGate:
      "Everything after the finding is human: remediation, provision, disclosure. The engine then checks only whether the cause actually closed.",
  },
  {
    number: "BFS4",
    themeId: "banking",
    theme: "Banking & Financial Services",
    focus: "Treasury",
    title: "Intraday Liquidity Scenario Engine",
    summary:
      "Treasury commits £4bn a day against an overnight position that is stale before it is trusted.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Tier 2", kind: "plain" },
      { label: "No execution path", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "Treasury commits funding intraday against a position built from overnight reports and spreadsheets. Around £4bn moves daily across 60 nostro accounts and nine currencies, and the ratios must hold at the close whatever happened at 14:00. The position is stale before it is trusted, scenario work is manual and therefore rare — quarterly answers for the regulator rather than hourly ones for the desk — relationship teams see large client flows hours before treasury, and the afternoon funding rationale is rarely written down. Not knowing the position is paid for every afternoon, as an unsized buffer.",
    whyHard: [
      "**Latency is the constraint, not modelling** — and the real-time payment and nostro feeds may not exist yet.",
      "Projections must be explainable to ALCO and to the regulator in words, not in feature importances.",
      "ALCO and finance run the same engine on a longer horizon, which is a design constraint from day one rather than a later extension.",
    ],
    whyAgentic: [
      "A fusion agent rebuilds the position continuously from payment, nostro, FX and market feeds, so the desk never works from a number it has outgrown.",
      "A projection agent forecasts the rest of the day from client behaviour patterns rather than yesterday's actuals; an anomaly agent flags divergence **with the closing ratio impact computed inside the flag**.",
      "A scenario agent answers a plain-language what-if: options priced against the close, the binding constraint named, the change explained in a paragraph.",
    ],
    successCriteria: [
      "Buffer sized for real uncertainty rather than ignorance — a direct, measurable funding saving.",
      "Scenario testing from quarterly to intraday; ALCO papers generated from the desk's own engine.",
      "Fewer end-of-day surprises requiring overnight cover.",
    ],
    signOffGate:
      "The funding decision and any trade stay human, executed through existing systems. The engine has no execution path, and the same trail writes the ALCO record.",
  },
  {
    number: "EU1",
    themeId: "energy",
    theme: "Energy & Utilities",
    focus: "Control room",
    title: "Real-Time Grid Contingency Copilot",
    summary:
      "200+ alarms per disturbance and ten minutes to act, with switching plans still assembled by hand.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Tier 2", kind: "plain" },
      { label: "Streaming OT", kind: "plain" },
      { label: "Regulated", kind: "plain" },
    ],
    context:
      "Distributed generation, EV load and inverter-based resources move the operating envelope intra-hour, but switching practice was built for a one-directional grid. A single disturbance throws 200+ alarms and leaves roughly ten minutes to act, while reliability performance is financially incentivised by the regulator to the minute. Switching plans are assembled by hand across SCADA, ADMS, the outage schedule, asset ratings, crew status and weather, judgement sits with a handful of senior operators, and the regulatory event narrative is reconstructed from logs days later.",
    whyHard: [
      "Alarm floods of 200+ per disturbance bury the causal event, and correlation has to run on the live SCADA and ADMS stream rather than a batch window.",
      "A switching option is only admissible if the **incumbent power-flow engine** clears it against thermal and voltage limits — an independently modelled answer will not be accepted in the control room.",
      "Read-only crossing of the OT/IT boundary under NERC CIP or NIS2, with end-to-end latency that fits the ten minutes the operator actually has.",
    ],
    whyAgentic: [
      "Specialist agents split the problem: **alarm correlation**, network-state assembly, constrained option generation, and validation that calls the power-flow engine as a tool.",
      "An orchestrator ranks feasible plans by load-at-risk and restoration time and states the binding constraint in one line the operator can defend.",
      "A narrative agent writes the operator log and regulatory event record from the approved decision trail as the event closes.",
    ],
    successCriteria: [
      "One ranked causal hypothesis within **90 seconds** of the alarm flood; three limit-checked switching options inside the ten-minute window.",
      "Time-to-decision on abnormal events down 30–50%; customer minutes lost down 5–15% where restoration is switching-driven.",
      "Post-event regulatory narrative from days to hours.",
    ],
    signOffGate:
      "No autonomous switching, ever. The agent proposes ranked options; the control room operator approves exactly one, and the approval is the record.",
  },
  {
    number: "EU2",
    themeId: "energy",
    theme: "Energy & Utilities",
    focus: "Storm room",
    title: "Live Storm Reallocation Orchestrator",
    summary:
      "Storm faults arrive faster than the plan can be redrawn, so crews idle while the allocation goes stale.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Tier 2", kind: "plain" },
      { label: "Multi-agent", kind: "plain" },
      { label: "Regulated", kind: "plain" },
    ],
    context:
      "A named storm generates faults faster than the plan can be redrawn. Damage reports, crew completions, road closures and forecast revisions arrive continuously, so an allocation that was optimal at the top of the hour is wrong by the middle of it. With 200,000+ customers off supply and 800+ crews and mutual-aid units in play, the situational picture is stitched by hand from OMS, WFM, damage reports and weather and is stale on arrival. Six to twelve bridge calls run in parallel on partial views, and crews finish early and idle because reassignment depends on a human noticing.",
    whyHard: [
      "Streaming integration across OMS, ADMS, AMI, WFM, GIS and weather, with **storm-mode data contracts agreed before the event**, not during it.",
      "The system has to sustain peak-hour event rates rather than average load, and degrade gracefully in the hours when the network itself is the casualty.",
      "Guaranteed-standards compensation clocks run per customer, so a restoration estimate published at hour two and never revised converts directly into liability.",
    ],
    whyAgentic: [
      "A damage-triage agent scores field photographs, last-gasp meter signals and OMS predictions as they land, keeping repair clusters continuously ranked.",
      "Collaborating allocation agents re-solve crew, mutual-aid, materials, permit and road-access constraints on a rolling cycle and surface **only the deltas that matter** — not a fresh plan every quarter hour.",
      "A forecasting agent revises restoration estimates with confidence bands as each repair closes, and drafts the customer message that goes with the revision.",
    ],
    successCriteria: [
      "A reallocation proposal on the commander's screen within 90 seconds of a crew clearing early or a road reopening.",
      "Restoration on multi-day events 15–30% faster; crew idle time between jobs materially reduced.",
      "Estimate revisions published while still useful, halving avoidable contacts; guaranteed-standards clocks tracked in flight rather than in arrears.",
    ],
    signOffGate:
      "The incident commander approves every reallocation and every published estimate revision. Nothing reaches a customer unreviewed.",
  },
  {
    number: "EU3",
    themeId: "energy",
    theme: "Energy & Utilities",
    focus: "Market window",
    title: "Intraday Balancing & Curtailment Copilot",
    summary:
      "Most curtailment cost is lost not to bad decisions but to decisions nobody had time to revisit.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Tier 3", kind: "plain" },
      { label: "Market-facing", kind: "plain" },
      { label: "Compliance", kind: "plain" },
    ],
    context:
      "A GW-scale portfolio of wind, solar, storage and flexible demand is dispatched into day-ahead, intraday and balancing markets inside network constraints that move sub-hourly. Forecast revisions, price signals and constraint notices arrive continuously and the window to act closes in minutes. Forecasts, nodal constraints, balancing prices, battery state-of-health and the outage plan sit in separate tools on separate refresh cycles, so only the largest positions get a second look before gate closure. Most curtailment cost is lost not to bad decisions but to decisions nobody had time to revisit.",
    whyHard: [
      "Market-facing and financially sensitive: back-testing against historical outcomes, market-abuse review and **hard architectural separation from execution systems** are entry conditions, not follow-ups.",
      "Marginal battery degradation has to be priced into every store-versus-sell option, or the recommendation is arithmetically wrong.",
      "Thousands of intraday decisions a week, each with a window measured in minutes rather than hours.",
    ],
    whyAgentic: [
      "Fusion agents merge generation forecast revisions, nodal constraint and balancing signals, storage state-of-health and the live outage plan into one current picture.",
      "A scenario agent generates and ranks **bid, store, curtail and hold-flexibility** strategies with expected value and downside, and names the binding constraint in plain language inside the window rather than after it.",
      "A capture agent writes every decision and its rationale to a review record, making post-trade learning possible for the first time.",
    ],
    successCriteria: [
      "Four ranked strategies with expected value, downside and degradation priced in, delivered before gate closure.",
      "Realised capture price up 1–4%; measurable reduction in avoidable curtailment.",
      "Maintenance outages shifted into low-value hours; a complete, defensible decision record at the desk review.",
    ],
    signOffGate:
      "The agent holds no trading authority and no execution path. The analyst decides and executes; the architecture makes anything else impossible.",
  },
  {
    number: "EU4",
    themeId: "energy",
    theme: "Energy & Utilities",
    focus: "Customer contact",
    title: "Live Outage Resolution Assistant",
    summary:
      "Tens of thousands of concurrent contacts across six channels, each told something slightly different.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Tier 1", kind: "plain" },
      { label: "Build candidate", kind: "build" },
      { label: "Vulnerable customers", kind: "plain" },
    ],
    context:
      "One major fault generates tens of thousands of concurrent contacts across phone, app, web, SMS, social and the national emergency number, and the correct answer changes every few minutes as the network is reconfigured. Advisors read live operational screens they were never trained to interpret and translate them mid-call. There is no single view of what a customer has already been told, so the second contact contradicts the first. Priority-register customers carry statutory welfare duties with clocks attached, and a wrong restoration estimate converts directly into compensation.",
    whyHard: [
      "Sub-second response at storm-peak contact volume across six channels, each with a different format and, in most utilities, a different team.",
      "**Per-premises truth, not per-incident truth** — supply status and estimated restoration have to resolve for an individual address as the network reconfigures.",
      "Evidenced safety escalation before launch, and heightened privacy controls on vulnerable-customer data.",
    ],
    whyAgentic: [
      "A grounding agent resolves per premises whether supply is off, why, and when it returns, with a confidence-qualified estimate that refreshes on reconfiguration rather than on a batch cycle.",
      "A contact-history agent maintains one record across all six channels; a messaging agent generates channel-appropriate wording from a **single canonical event narrative**.",
      "A triage agent identifies priority-register and vulnerable customers as they make contact, or ahead of it, and raises the welfare task.",
    ],
    successCriteria: [
      "Six channels stating the same true thing at the same moment, with every premises receiving its own estimate.",
      "Avoidable repeat contacts down 20–40%; measurable fall in guaranteed-standards failures.",
      "Welfare response for identified vulnerable customers hours earlier.",
    ],
    signOffGate:
      "Read-only against OMS, ADMS and AMI with no control path. Safety and safeguarding cases escalate to a human immediately and unconditionally — 100% of them, within the first turn.",
  },
  {
    number: "HC1",
    themeId: "healthcare",
    theme: "Healthcare",
    focus: "Revenue cycle",
    title: "Prior Authorization & Denial Appeal Agent",
    summary:
      "30% of 15,000 monthly prior auths are denied first time, and patients wait 11 days for care.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Commercially proven", kind: "plain" },
      { label: "HIPAA", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "A 200-physician group submits 15,000 prior authorization requests a month. Around 30% are denied first time, 14 FTEs work the queue and patients wait 11 days for care. Payer criteria span 50+ policy documents that change often, submissions omit the clinical language the payer requires, and appeals are rewritten from scratch despite roughly 70% pattern overlap — 45 minutes each, for a 52% overturn rate.",
    whyHard: [
      "Payer criteria live across 50+ documents on their own release cycles. A **stale citation is a denial**, so the retrieval corpus has to be versioned and refreshed on release.",
      "The evidence that satisfies a criterion is scattered through the chart in clinical prose, not in structured fields.",
      "Every asserted criterion needs a traceable source passage, because the appeal is read by a reviewer looking for exactly that.",
    ],
    whyAgentic: [
      "A retrieval agent works the payer policy library and returns the **named criteria** for the requested service.",
      "An evidence agent maps chart findings to each criterion one at a time and assembles the packet; a drafting agent writes the appeal against the specific denial reason rather than a template.",
      "A denial-likelihood agent holds weak submissions back for clinician review before they go out, so the queue improves instead of just moving faster.",
    ],
    successCriteria: [
      "First-pass denial rate 30% → 15%; overturn rate 52% → 70%+.",
      "Appeal drafting 45 minutes → under five minutes; days-to-care 11 → four.",
      "Every asserted criterion linked to its source passage in the audit trail.",
    ],
    signOffGate:
      "Nothing is submitted or appealed without certified clinician sign-off — 100%, with a per-criterion audit trail sitting behind the signature.",
  },
  {
    number: "HC2",
    themeId: "healthcare",
    theme: "Healthcare",
    focus: "Hospital operations",
    title: "Patient Flow & Capacity Command Center Agent",
    summary:
      "94% occupancy, 6.2-hour ED boarding and $2.1M a quarter in capacity-driven surgical cancellations.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "HL7 / ADT", kind: "plain" },
      { label: "Adoption-limited", kind: "plain" },
      { label: "Multi-agent", kind: "plain" },
    ],
    context:
      "A 900-bed medical center runs at 94% occupancy. ED boarding averages 6.2 hours in surges and capacity-driven surgical cancellations cost $2.1M a quarter. ADT, ED, OR and staffing data sit in separate systems, discharge timing predictions are wrong by four hours or more, staffing needs eight hours' notice while demand moves in two, bed assignment is decided reactively in the moment, and the capacity huddle has no shared forward view.",
    whyHard: [
      "Integrating ADT, OR and staffing data is **the first real obstacle**, well before any model. The forecast is the easy half.",
      "Value depends entirely on adoption in a live huddle — a projection nobody acts on is worth nothing, so the measure has to include actions taken.",
      "A bed move is a clinical and staffing decision with consequences the data does not see.",
    ],
    whyAgentic: [
      "Forecasting agents project admissions, discharges and arrivals 24–72 hours ahead; a readiness agent scores each patient's discharge readiness from live orders and labs.",
      "An optimizer agent proposes **concrete bed moves and staffing shifts for today** rather than a curve, and states which constraint each one relieves.",
      "A briefing agent writes the shift handover in the huddle's own language, so the recommendation arrives in the format the room already uses.",
    ],
    successCriteria: [
      "ED boarding time down 35%; capacity-driven surgical cancellations down 50%.",
      "Discharge prediction accurate within two hours; overtime cost down 20%.",
      "Recommendations acted on in at least half of capacity huddles — measured alongside forecast accuracy, not instead of it.",
    ],
    signOffGate:
      "The charge nurse and capacity lead approve every move. The agent names actions; it never takes them.",
  },
  {
    number: "HC3",
    themeId: "healthcare",
    theme: "Healthcare",
    focus: "Diagnostics",
    title: "Radiology Worklist Triage & Report Agent",
    summary:
      "1,200 studies a day read first-in-first-out, so clinical urgency is invisible in the queue.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Regulatory scope", kind: "plain" },
      { label: "Cleared models only", kind: "plain" },
      { label: "Audited monthly", kind: "plain" },
    ],
    context:
      "A radiology group reads 1,200+ studies a day with a 14-hour turnaround on non-urgent cases, under 22% annual radiologist turnover. The worklist is first-in-first-out so urgency is invisible, narrative reports bury the actionable point and referring physicians call back on 40% of them, incidental findings have no systematic follow-up register, and severity wording varies between radiologists.",
    whyHard: [
      "Regulatory scope defines the design: triage models must be **cleared for their intended use**, and the system reorders the queue rather than interpreting the study.",
      "Triage has to hold above 95% sensitivity at under 10% false positives, or radiologists stop trusting the ordering and revert to first-in-first-out.",
      "Severity wording varies between readers, so structuring must normalise language without altering clinical meaning.",
    ],
    whyAgentic: [
      "A triage agent runs cleared CV models over DICOM as studies arrive and raises priority for suspected critical cases, with PACS and RIS called as tools.",
      "A structuring agent runs **only on the signed report**, extracting impression, severity and follow-up into a consistent format for the referrer.",
      "A registry agent auto-registers incidental findings into a tracked recall list, closing the loop that currently has no owner.",
    ],
    successCriteria: [
      "Time-to-read for flagged critical cases under 30 minutes.",
      "Triage sensitivity above 95% at under 10% false positives, audited monthly.",
      "Referrer callbacks down 40%; incidental-finding follow-up 45% → 80%.",
    ],
    signOffGate:
      "The radiologist of record signs 100% of reports. The agents change the order of the queue and the shape of a signed report — they never interpret a study.",
  },
  {
    number: "HC4",
    themeId: "healthcare",
    theme: "Healthcare",
    focus: "Clinician workload",
    title: "Ambient Clinical Documentation & Coding Agent",
    summary:
      "600 clinicians each lose close to two hours a day to charting after clinic has closed.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Widely deployed", kind: "plain" },
      { label: "Consent-gated", kind: "plain" },
      { label: "PHI in tenancy", kind: "plain" },
    ],
    context:
      "A 40-site ambulatory network employs 600 clinicians who each spend close to two hours a day charting after clinic, with turnover at 19% a year. After-hours charting is the top-cited burnout driver, notes written hours later lose clinical specificity, billing level is under-supported by the note as written, template notes run long but carry little usable detail, and existing dictation leaves all the structuring work manual.",
    whyHard: [
      "Consent capture is **per visit and non-negotiable**, and PHI must stay inside tenancy end to end.",
      "The draft has to be good enough that editing it is faster than writing it — an edit rate much above 20% and clinicians abandon the tool.",
      "Code suggestions carry billing and audit exposure, so each one needs its supporting passage attached to be usable.",
    ],
    whyAgentic: [
      "A capture agent handles consent-gated clinical speech recognition with speaker diarization across the visit.",
      "A drafting agent produces the note and a coding agent proposes codes, **each quoting the passage that supports it**.",
      "A write-back agent commits to FHIR only after signature, writing the consent record alongside the note.",
    ],
    successCriteria: [
      "Charting time down 45 minutes per clinician per day.",
      "Clinician edit rate on drafts below 20%; coding accuracy up 12 points on the audit sample.",
      "100% documented consent; PHI never leaves tenancy.",
    ],
    signOffGate:
      "Nothing enters the chart unsigned. The unsigned-draft rule and per-visit consent are design requirements, not configuration.",
  },
  {
    number: "SM1",
    themeId: "sales",
    theme: "Sales & Marketing",
    focus: "Forecasting",
    title: "Pipeline Health & Forecast Agent",
    summary:
      "Forecast accuracy sits at 62% and deals stall silently because CRM stage is updated late.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Data already in CRM", kind: "plain" },
      { label: "Explainability-led", kind: "plain" },
      { label: "Read-only CRM", kind: "plain" },
    ],
    context:
      "A B2B software business carries around 2,000 open opportunities a quarter. Forecast accuracy sits at 62% and deals stall silently because CRM stage is updated late. Reps log activity inconsistently so stage lags reality, stalled deals surface in the QBR weeks after going cold, managers coach on instinct rather than ranked deal risk, and forecast misses drive hiring and capacity misallocation.",
    whyHard: [
      "Managers only adopt a score they can **argue with**, so explainability is the real requirement — not accuracy.",
      "Activity metadata is noisy and inconsistently logged, and the signal has to survive that rather than assume it away.",
      "Writing stage changes back into the CRM would corrupt the ground truth the model learns from, so the design has to stay read-only there.",
    ],
    whyAgentic: [
      "A scoring agent runs nightly over CRM history and activity cadence and returns a deal-health band per opportunity.",
      "An explanation agent writes a three-line **“what changed, what next”** brief with the top three contributing reasons named.",
      "A monitoring agent fires when health drops two bands in a week, putting the deal in front of a manager weeks before the QBR would.",
    ],
    successCriteria: [
      "Forecast accuracy 62% → 80%+ within two quarters.",
      "At-risk deals flagged three or more weeks earlier than the QBR.",
      "Weekly manager usage above 70% by day 90; every score shows its top three contributing reasons.",
    ],
    signOffGate:
      "Recommendations go to the manager. The agent never writes stage, amount or close date back into the CRM.",
  },
  {
    number: "SM2",
    themeId: "sales",
    theme: "Sales & Marketing",
    focus: "Content",
    title: "Account-Based Content Personalization Agent",
    summary:
      "Hand-personalised ABM reaches 14% engagement — but across only 20 of 500 named accounts.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "RAG-grounded", kind: "plain" },
      { label: "Legal in the loop", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "An enterprise vendor runs ABM across 500 named accounts in 12 industries. Generic campaigns draw around 2% engagement while hand-personalized ones reach 14% — across only 20 accounts, because personalization is manual. Account pain points are buried in filings and news, sales and marketing work from two different account narratives, legal review adds two to three weeks per asset, and nothing is reused: every campaign starts from a blank page.",
    whyHard: [
      "The win is **compressing review time, not removing review** — anything that ships unapproved destroys the business case on the first incident.",
      "Brand voice and factual accuracy both have to hold across 500 accounts, where a single unsourced statistic is a legal problem.",
      "Source material is heterogeneous — filings, analyst notes, news, past wins — each with different reliability and different citation rules.",
    ],
    whyAgentic: [
      "A research agent runs RAG over filings, analyst notes, news and past wins to build **one account narrative both teams work from**.",
      "A drafting agent writes email, one-pager and landing copy against the brand style guide, in voice, per account.",
      "A claim-check agent flags every unsupported statistic for legal before it reaches a human queue, so review starts from a shorter list.",
    ],
    successCriteria: [
      "Personalized coverage 20 → 500 accounts; engagement 2% → 7%+.",
      "Drafting cycle three weeks → three days.",
      "Claim-check catches 90%+ of unsourced figures.",
    ],
    signOffGate:
      "100% of assets are human-approved before they send. The agent prepares the queue; the marketer clears it.",
  },
  {
    number: "SM3",
    themeId: "sales",
    theme: "Sales & Marketing",
    focus: "Pricing",
    title: "Pricing & Discount Governance Agent",
    summary:
      "Comparable B2B customers receive 8% to 35% off, and margin erosion only surfaces at quarter close.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Sparse data", kind: "plain" },
      { label: "Legal exposure", kind: "plain" },
      { label: "Audit trail", kind: "plain" },
    ],
    context:
      "A global manufacturer sells 50,000 SKUs to 8,000 B2B customers. Comparable customers receive 8% to 35% off and margin erosion only surfaces at quarter close. There is no view of discount patterns by rep, region or segment, price guidance is static and ignores demand and competitors, deal desk approvals are a yes or no with no counter-offer attached, and price sensitivity is unknown at SKU-segment level.",
    whyHard: [
      "SKU-segment historical data is **sparse and uneven**, so elasticity estimates carry wide confidence bands that have to be shown, not hidden.",
      "Differential pricing carries legal exposure, which makes approval governance and audit trail part of the build rather than a later hardening pass.",
      "Reps abandon guidance they cannot defend in front of a customer, so every band needs a stated rationale attached.",
    ],
    whyAgentic: [
      "An elasticity agent returns **floor, target and stretch** price per quote with its confidence stated.",
      "A drafting agent writes the counter-offer rationale from comparable historical deals, so the deal desk answers with a position rather than a refusal.",
      "An anomaly agent flags approvals outside the band and routes them for review before the quarter closes on them.",
    ],
    successCriteria: [
      "Unnecessary discount down three to four points; deal desk decision time 48 hours → four hours.",
      "90% of quotes priced inside the recommended band; reps accept the guidance in over 65% of deals.",
      "100% of out-of-band approvals logged with named approver and stated reason.",
    ],
    signOffGate:
      "Every price is approved by a human. The approval, the band and the reason are written to an immutable audit trail as a deliverable of the build.",
  },
  {
    number: "SM4",
    themeId: "sales",
    theme: "Sales & Marketing",
    focus: "Account growth",
    title: "Expansion & Churn Propensity Agent",
    summary:
      "70% of net-new revenue comes from existing customers, yet expansion is spotted only at quote request.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Streaming features", kind: "plain" },
      { label: "Precision over recall", kind: "plain" },
      { label: "CSM-owned", kind: "plain" },
    ],
    context:
      "A platform business at around $500M ARR earns 70% of net-new revenue from existing customers, yet expansion is spotted only when a customer requests a quote. Usage telemetry never becomes an actionable account signal, support tickets showing growth needs never reach the CSM, playbooks are generic and unaware of account maturity, cross-sell recommendations convert at only 4%, and there is no single view across usage, sentiment and firmographics.",
    whyHard: [
      "The engineering weight sits in the **streaming feature store**, not the model — telemetry, tickets and firmographics have to land in one place at one cadence.",
      "Precision beats recall: a handful of wrong recommendations will stop CSMs opening the tool at all, and they will not come back.",
      "Churn risk and expansion fit are different questions sharing the same features, and must not be collapsed into one score.",
    ],
    whyAgentic: [
      "A feature agent maintains the streaming store over telemetry, tickets and firmographics.",
      "Paired scoring agents rank every account for **churn risk and next-best-product separately**, with an NLP agent reading support tickets for growth and dissatisfaction signals.",
      "A briefing agent assembles the account plan — the signal, the evidence and the suggested play — for CSM review.",
    ],
    successCriteria: [
      "Cross-sell conversion 4% → 10%+; net revenue retention 112% → 120%.",
      "Expansion opportunities surfaced six or more weeks earlier than a quote request.",
      "False-positive rate on recommendations below 20%, reviewed before any expansion of scope.",
    ],
    signOffGate:
      "The CSM owns the outreach. The agent never contacts a customer and never books a play on its own.",
  },
  {
    number: "RT1",
    themeId: "retail",
    theme: "Retail",
    focus: "Customer service",
    title: "Post-Purchase Resolution Agent",
    summary:
      "Representatives open four or five systems to resolve one order issue, then start over on the next contact.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Evidence tier 3/3", kind: "plain" },
      { label: "Mockable APIs", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "Order issue resolution is manual and fragmented. Service representatives open multiple systems to authenticate a customer, retrieve the order, check inventory and manually determine refund or exchange eligibility, then repeat all of it on the next contact. This is the best-evidenced retail agent pattern — Deloitte and Zendesk benchmarks plus live deployments including Lowe's — and it can be demonstrated against mocked OMS and CRM APIs without a full ERP integration.",
    whyHard: [
      "Authentication, order retrieval, inventory check, policy application and fraud screening span four or five systems with different latencies and different failure modes.",
      "Refund eligibility is **policy plus judgement** — goodwill thresholds, loyalty tier and repeat-issue history all move the answer.",
      "A wrong refund is money out the door, so the autonomy threshold has to be configurable per value band and defensible to finance.",
    ],
    whyAgentic: [
      "An identity agent authenticates the customer; a retrieval agent assembles order, shipment and inventory state into one view.",
      "A policy agent applies refund and exchange rules alongside a fraud-screening agent, and an execution agent completes the action **within its configured value band**.",
      "Above the threshold, or on any fraud flag, an escalation agent hands the case to a representative with the full reasoning already attached.",
    ],
    successCriteria: [
      "Low-value, low-risk cases resolved inside a single conversation with no human touch.",
      "Configurable value threshold enforced on 100% of executed refunds and exchanges.",
      "Every escalation arrives carrying authentication result, policy citation and fraud score.",
    ],
    signOffGate:
      "The value threshold is the gate. Above it — and on every fraud flag — a representative approves before any money moves.",
  },
  {
    number: "RT2",
    themeId: "retail",
    theme: "Retail",
    focus: "Risk",
    title: "Returns Eligibility & Loss-Prevention Agent",
    summary:
      "Around 9% of returns are fraudulent, but the risk signals sit in silos owned by different teams.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Evidence tier 2/3", kind: "plain" },
      { label: "Low autonomy first", kind: "plain" },
      { label: "Governance-heavy", kind: "plain" },
    ],
    context:
      "Around 9% of returns are fraudulent, and shrinkage from theft, fraud and inventory discrepancy is analysed in independent silos so the pattern across them is never assembled. Return requests are evaluated case by case against static policy, while risk indicators from POS, returns history, inventory variance and store exception data sit in different tools owned by different teams — and losses are confirmed long after the window to act has closed.",
    whyHard: [
      "Fewer audited agentic deployments exist here than in service resolution, so the evidence base is thinner and the build carries more unknowns.",
      "**The cost asymmetry has to be set explicitly** — false positives insult genuine customers and show up in reviews; false negatives are silent losses.",
      "Risk signals live across POS, returns, inventory variance and store exception systems with no common customer or basket key.",
    ],
    whyAgentic: [
      "Signal agents pull returns history, POS anomalies, inventory variance and store exception data and resolve them onto a common entity.",
      "A risk agent scores the request against policy rules and fraud indicators and **auto-approves the clearly low-risk majority**.",
      "An investigation agent routes anything above the threshold to loss prevention with the contributing signals ranked and named.",
    ],
    successCriteria: [
      "Low-risk returns auto-approved without any increase in verified fraud loss.",
      "Investigator queue quality measured by confirmed-case rate, not by volume.",
      "Every score explainable to the customer-facing team in one sentence.",
    ],
    signOffGate:
      "Zero denials issued without human review in the first release. Autonomy starts low and widens only on measured performance, never on schedule pressure.",
  },
  {
    number: "RT3",
    themeId: "retail",
    theme: "Retail",
    focus: "Supply chain",
    title: "Inventory Exception & Replenishment Agent",
    summary:
      "Replenishment runs on historical sales while the on-hand position itself cannot be trusted.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Phase 2", kind: "plain" },
      { label: "ERP / WMS", kind: "plain" },
      { label: "Bounded autonomy", kind: "plain" },
    ],
    context:
      "Out-of-stocks and overstocks contribute to an estimated $1.7 trillion in annual global loss while inventory accuracy stays low, because replenishment relies on historical sales and manual planning. Supplier disruption is monitored reactively, so risk to availability surfaces after it has already bitten, and the same exception is worked separately by store, DC and procurement teams with no shared view.",
    whyHard: [
      "Requires ERP and WMS integration and a trustworthy on-hand position — which is exactly what is in question. **The data quality problem and the use case are the same problem.**",
      "Store, DC and supplier decisions interact: a reallocation that fixes one location creates the exception at another.",
      "Better sequenced as a phase-two initiative, once a customer-facing agent has established the governance pattern in the estate.",
    ],
    whyAgentic: [
      "A detection agent monitors on-hand against expected position and separates genuine distortion from normal variance.",
      "A supplier-risk agent watches lead-time drift, fill-rate decline and external disruption signals rather than waiting for a missed delivery.",
      "A resolution agent proposes replenishment, reallocation or substitution **with the downstream effect stated**, and executes only inside defined value and quantity limits.",
    ],
    successCriteria: [
      "Exceptions detected and proposed for action the same day, rather than at the next planning cycle.",
      "Measurable improvement in on-shelf availability with no increase in total inventory value.",
      "Alternative options retained alongside every action for post-hoc review.",
    ],
    signOffGate:
      "Anything outside the defined value and quantity limits goes to a named planner with the trade-off spelled out. 100% of out-of-limit actions are human-approved.",
  },
  {
    number: "RT4",
    themeId: "retail",
    theme: "Retail",
    focus: "Store operations",
    title: "Store Associate Knowledge & Operations Copilot",
    summary:
      "Associates cannot memorise thousands of SKUs, and managers spend the day chasing exceptions.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Evidence tier 3/3", kind: "plain" },
      { label: "Voice-first", kind: "plain" },
      { label: "Advisory only", kind: "plain" },
    ],
    context:
      "Associates cannot memorise thousands of SKUs, inventory locations and project guidance details, and managers spend a disproportionate share of the day chasing operational issues across disconnected systems. Voice-enabled associate assistants are in live deployment — Lowe's Mylow Companion runs across 1,700+ stores and Walmart has announced associate AI training worldwide — though reported NPS gains are self-reported and should be read as directional.",
    whyHard: [
      "Store-floor conditions are hostile to the interface: hands full, ambient noise, patchy connectivity and very short attention windows.",
      "Product, planogram, stock and project guidance change constantly and live in different systems on different refresh cycles.",
      "**Associates abandon a tool that is wrong once in a customer's hearing**, so grounding and knowing when to abstain matter more than coverage.",
    ],
    whyAgentic: [
      "A knowledge agent answers product, compatibility and project questions with RAG over the product and guidance corpus, citing the source.",
      "A stock agent resolves live availability and aisle location; a task agent raises and routes the operational exception the associate just walked past.",
      "Voice-first and **explicit about not knowing** — an honest abstention beats a confident wrong answer at the shelf.",
    ],
    successCriteria: [
      "Every answer grounded in a citable source or an explicit “I don't know” — no unsourced product claims.",
      "Measured reduction in manager interruptions and in time to locate stock on the floor.",
      "Associate weekly active usage sustained past day 90, tracked alongside sampled answer accuracy.",
    ],
    signOffGate:
      "Advisory only. Any action beyond raising a task — markdowns, transfers, overrides — goes to the store manager.",
  },
  {
    number: "HS1",
    themeId: "hospitality",
    theme: "Hospitality",
    focus: "Guest experience",
    title: "Guest Messaging & Service-Request Resolution Agent",
    summary:
      "Guest requests arrive across six channels with no clear owner, and delays feed straight into review scores.",
    chips: [
      { label: "Medium", kind: "med" },
      { label: "Evidence tier 3/3", kind: "plain" },
      { label: "Six channels", kind: "plain" },
      { label: "Build candidate", kind: "build" },
    ],
    context:
      "Front desks are understaffed across many properties while guest requests arrive through fragmented channels — SMS, WhatsApp, email, OTA inboxes and messaging apps. Complaints are handled across multiple departments with unclear ownership, manual follow-up and no visibility into resolution progress, and delayed response times feed directly into review scores and lost ancillary revenue. Hilton's Connie, The Cosmopolitan's Rose and Canary AI deployments make this the best-evidenced pattern in hospitality.",
    whyHard: [
      "Six inbound channels with different formats, different latency expectations and, in most properties, different owning teams.",
      "**Ownership crosses housekeeping, engineering, F&B and front office**, so routing is an organisational problem before it is a technical one.",
      "Published revenue and conversion statistics are largely vendor-reported and should be treated as directional when building the case.",
    ],
    whyAgentic: [
      "A conversation agent handles routine inquiries across all channels from one shared context, with PMS and reservation data called as tools.",
      "A routing agent assigns the request to the correct operational team **with an owner and a clock**; a follow-up agent chases to closure and keeps the guest informed.",
      "An upsell agent surfaces relevant offers where the moment genuinely allows it, rather than on every thread.",
    ],
    successCriteria: [
      "First response inside target on 100% of channels, from one shared context per guest.",
      "Every request carries a named owner and a resolution clock from the moment it lands.",
      "Measured reduction in issues still unresolved at checkout.",
    ],
    signOffGate:
      "Complaint escalation and anything financial goes to a human with the full thread attached. Zero compensation, refund or comp issued without staff approval.",
  },
  {
    number: "HS2",
    themeId: "hospitality",
    theme: "Hospitality",
    focus: "Operations",
    title: "Housekeeping & Room-Readiness Orchestration Agent",
    summary:
      "A guaranteed check-in can be at risk without anyone knowing until the guest is standing at the desk.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Evidence tier 2/3", kind: "plain" },
      { label: "PMS-dependent", kind: "plain" },
      { label: "Multi-agent", kind: "plain" },
    ],
    context:
      "Housekeeping carries the highest staffing shortages in hospitality while room cleanliness remains the strongest driver of guest satisfaction. Room status updates are delayed, priorities shift through the day, coordination is manual, workloads are unbalanced and managers have limited visibility — so a guaranteed check-in commitment can be at risk without anyone knowing until the guest is standing at the desk.",
    whyHard: [
      "Needs live PMS and operational data to demonstrate anything meaningful, and publicly documented agentic deployments with measured outcomes remain limited.",
      "Priorities move continuously — early arrivals, late checkouts, VIP flags, maintenance holds — so **a plan produced at shift start is wrong by mid-morning**.",
      "Staffing is the binding constraint and it is human: reallocation has fairness and fatigue consequences a scheduler does not see.",
    ],
    whyAgentic: [
      "A prediction agent projects room readiness from current status, historical clean times and attendant location.",
      "A prioritisation agent continuously re-ranks the board against arrivals, VIP flags and guaranteed check-in commitments.",
      "A risk agent alerts the manager when a guaranteed check-in is about to be missed, **with recovery options already named** rather than just a red flag.",
    ],
    successCriteria: [
      "Guaranteed check-in risks flagged with recovery options at least 60 minutes before the commitment.",
      "Measurable reduction in room turnaround time and in guest wait at check-in.",
      "Workload balance across attendants tracked and reported, not assumed.",
    ],
    signOffGate:
      "The manager approves every reallocation. The agent proposes attendant moves; it does not reassign people on its own.",
  },
  {
    number: "HS3",
    themeId: "hospitality",
    theme: "Hospitality",
    focus: "Revenue",
    title: "Revenue Management Execution Agent",
    summary:
      "Pricing stays reactive and historical while competitor rates, local events and demand move daily.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Evidence tier 2.5/3", kind: "plain" },
      { label: "Bounded execution", kind: "plain" },
      { label: "Guardrails are the product", kind: "plain" },
    ],
    context:
      "Rising labour costs are compressing margins and increasing the need for pricing precision across hotel portfolios. Pricing decisions remain reactive and historical-data dependent while the market moves on competitor rates, local events and demand shifts. Momentum exists across Marriott, IHG, Radisson and Lighthouse, but autonomous pricing is still an emerging capability and lacks large-scale published outcomes.",
    whyHard: [
      "Autonomous rate changes have direct revenue consequences and **no undo** — the guardrails are the product, not a safety wrapper around it.",
      "Demand signal quality varies sharply by property, season and market, so a model tuned on a city-centre asset will not transfer to a resort.",
      "Published, audited outcomes for agentic pricing execution are thin, so the case has to be built on back-tested performance rather than reference clients.",
    ],
    whyAgentic: [
      "A demand agent fuses competitor rates, local event calendars, pace and booking-curve position into a continuously updated view.",
      "A pricing agent recommends and, **inside pre-agreed guardrails**, executes rate changes across channels — moving past decision support into bounded execution.",
      "A logging agent records every executed change with its trigger and rationale, so the revenue manager can reconstruct any decision.",
    ],
    successCriteria: [
      "Back-tested uplift demonstrated before any live execution authority is granted.",
      "100% of executed changes inside the agreed guardrail band, with a complete audit trail.",
      "Measurable RevPAR improvement against a held-out control set of properties.",
    ],
    signOffGate:
      "Anything outside the guardrail band, and any change above a set magnitude, is held for the revenue manager. Execution authority is earned, not configured on day one.",
  },
  {
    number: "HS4",
    themeId: "hospitality",
    theme: "Hospitality",
    focus: "Loyalty",
    title: "Guest Identity & Personalization Agent",
    summary:
      "Guest data is fragmented across PMS, CRM and loyalty, so personalization depends on staff memory.",
    chips: [
      { label: "Hard", kind: "hard" },
      { label: "Evidence tier 2/3", kind: "plain" },
      { label: "Identity resolution", kind: "plain" },
      { label: "Consent-scoped", kind: "plain" },
    ],
    context:
      "Guest data is fragmented across PMS, CRM, loyalty and brand systems, producing duplicate profiles and incomplete context. Preferences are not continuously updated, insights are hard to reach at the moment of service, and personalization depends on staff memory. Industry leaders openly acknowledge the problem and are investing heavily in it, though quantified success stories remain limited — which makes a focused proof of concept easy to justify strategically.",
    whyHard: [
      "Identity resolution across PMS, CRM, loyalty and brand systems **with no reliable common key**, across properties that may not share a data model.",
      "Preference data is privacy-sensitive and subject to consent that varies by jurisdiction and by brand.",
      "The unified view is only worth building if it reaches the staff member — or the next agent — at the moment of service, in under a second.",
    ],
    whyAgentic: [
      "A resolution agent matches and merges guest identities across systems in real time, with confidence stated and low-confidence merges held rather than guessed.",
      "A preference agent maintains an evolving profile from stay history, requests, complaints and interactions, **respecting consent scope per record**.",
      "A serving agent exposes the unified view to staff and to other agents at the point of service.",
    ],
    successCriteria: [
      "Duplicate profile rate reduced measurably, with every auto-merge above a stated confidence threshold.",
      "Unified guest view returned in under one second at the point of service.",
      "Consent scope enforced on 100% of preference reads.",
    ],
    signOffGate:
      "Merges below the confidence threshold, and any use outside consent scope, require human review. The agent holds a record open rather than committing a wrong join.",
  },
];
