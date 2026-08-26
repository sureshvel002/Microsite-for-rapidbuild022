import type { AfmCompany } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// AFM ecosystem — the shared-capability and technology companies around the
// banners: a data alliance, a pooled IT talent vehicle, two software companies
// and an indirect-purchasing network. Cards are taken from the "Challenge
// cards" section of each company's report, as with the banners.
//
// Brand colours here are approximations chosen to read as each company
// (`verified: false`); drop in the official hex when you have it.
// ─────────────────────────────────────────────────────────────────────────────

export const ECOSYSTEM: AfmCompany[] = [
  // ── Valiuz ───────────────────────────────────────────────────────────────
  {
    id: "valiuz",
    name: "Valiuz",
    monogram: "V",
    group: "ecosystem",
    sector: "Retail data & media",
    preparedFor: "Head of Generative AI",
    oneLiner:
      "The data alliance and retail media sales house of the AFM, created in 2019: member retailers pool customer and transaction data, and Valiuz builds audience, measurement and advertising products on top of it.",
    scale:
      "18 AFM banners plus 7 Mousquetaires banners · 30m unique active customers · >10,000 points of sale in six countries · 360 staff",
    ownership:
      "AFM data alliance headquartered in Lille; merged operationally with Infinity on 1 January 2026, with reorganised governance published on 19 January 2026.",
    pdf: "/documents/Valiuz_Deep_Research_Report.pdf",
    pdfDownloadName: "Valiuz — Deep Research Report.pdf",
    brand: {
      primary: "#7C3AED",
      secondary: "#1E1B4B",
      verified: false,
      promptDescription:
        "Valiuz violet (#7C3AED) for primary actions, headers and key accents, with deep indigo (#1E1B4B) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "valiuz",
        company: "Valiuz",
        theme: "AI permissibility • Member data & consent",
        title: "Proving a use case is allowed",
        summary:
          "Every new AI use case against member data has its permission case rebuilt from scratch, and the ground under it keeps moving.",
        challenge:
          "Every time a new AI use case is put in front of member data, the case that it is permitted has to be reassembled. The reasoning exists — someone worked out something similar six months ago — but it sits across legal reviews, impact assessment drafts, member contracts and email threads, and gets rebuilt rather than retrieved. By the time the answer arrives, the question has changed.",
        whoFeelsIt:
          "The Head of Generative AI most directly. Also the data protection officer and legal team fielding the same questions repeatedly, the data teams waiting to build, and the member retailers' own privacy functions who have to countersign.",
        whyItPersists:
          "The evidence needed to clear a use case is generated as a byproduct of separate processes — contracting, impact assessment, security review, member negotiation — and is never assembled into anything reusable, because no single team owns the assembled view. And the ground moves: the CNIL's cross-domain consent guidance is expected during 2026, AI Act transparency duties began on 2 August 2026, and the December 2025 loyalty decision reset what informed consent means at enrolment. Any assembled answer has a short shelf life, which discourages assembling one at all.",
        whatSolvedLooksLike:
          "A new use case gets a defensible provisional answer in an afternoon rather than a fortnight, because the last twenty answers and the reasoning behind them are findable. Legal spends its time on genuinely novel questions instead of re-deriving positions it has already taken.",
        evidenceBase:
          "CNIL deliberation SAN-2025-017 of 30 December 2025, made public 22 January 2026: €3.5m for transmitting loyalty identifiers to a social network without valid consent, with findings including the absence of an impact assessment, across a loyalty base of around 10.5 million French members and with sixteen other European authorities participating. The CNIL's 2026 work programme planning cross-domain consent guidance. AI Act Article 50 transparency duties applying from 2 August 2026. The CNIL's commercial-activity framework expressly excluding third-party-sourced profiling, so no safe harbour exists. Survey evidence that 63% of organisations now require human validation of AI outputs, up from 22% a year earlier, and that 76% of data leaders say governance does not keep pace with employee AI use.",
        openQuestion:
          "When you want to clear a new AI use case against member data, where does the answer actually come from today, and how long does it take?",
      },
      {
        number: "C2",
        companyId: "valiuz",
        company: "Valiuz",
        theme: "Portfolio visibility • Six countries, twenty-plus banners",
        title: "Nobody knows what has already been tried",
        summary:
          "There is no current picture of what exists, what worked and what was abandoned — the answer comes from going and asking people.",
        challenge:
          "People are building with AI across six countries and more than twenty banners, and there is no current picture of what exists, what worked, what was abandoned and why. When a member retailer asks whether something has been solved, or an executive asks what to fund next, the answer comes from going and asking people.",
        whoFeelsIt:
          "The Head of Generative AI, who owns the portfolio view and has to defend it upward. Also the country and banner teams who cannot see each other's work, and the executives asking for a prioritised list that is current rather than three months old.",
        whyItPersists:
          "The organisation changed shape in eight months — a merger effective 1 January 2026, a new member group, a new governance structure published 19 January — and the seams between the merged entities run straight through where a shared record would need to live. The incentive is also asymmetric: building something is visible and rewarded, writing down what was tried and abandoned is neither, so the record of failures, which is the more valuable half, never gets made.",
        whatSolvedLooksLike:
          "Before a team starts building, they can see in minutes whether someone in another country already tried it and what happened. The quarterly prioritisation conversation starts from a current list rather than from three weeks of asking around.",
        evidenceBase:
          "Valiuz and Infinity merged operationally on 1 January 2026 with 360 staff across six countries, with reorganised governance published 19 January 2026. ADEO, a Valiuz member banner, runs weekly cross-country progress reviews against a mapping of all use cases that is updated and shared — direct evidence that a comparable French retail group found this problem worth solving structurally. Survey evidence that 65% of leaders cite difficulty scaling use cases as a barrier to return, up from 33% the previous quarter; that 42% of businesses scrapped most AI initiatives with 46% of proofs of concept abandoned before production; and that no more than 10% of organisations are scaling agents in any single function. Valiuz's own chief technical officer stated in October 2025 that roughly half the workforce was already using AI.",
        openQuestion:
          "If someone asked you today for the current list of AI use cases across all countries and banners, with their status, how would you produce it?",
      },
    ],
  },

  // ── Okara ────────────────────────────────────────────────────────────────
  {
    id: "okara",
    name: "Okara",
    monogram: "O",
    group: "ecosystem",
    sector: "IT talent & consulting",
    preparedFor: "Chief Executive Officer and Président",
    oneLiner:
      "The pooled IT talent capability for the AFM network — consulting, technical assistance, project management and the provision of experts to companies across the family's businesses.",
    scale:
      "Scoped at around a hundred companies and 70,000 people · operational from 27 June 2025 · based at Euralille, Lille",
    ownership:
      "A shelf company (NEWPALLUR 3 SAS, SIREN 933 593 493) activated for the purpose on 27 June 2025; the link to the Mulliez sphere runs through its président rather than through a holding line.",
    pdf: "/documents/Okara_Deep_Research_Report.pdf",
    pdfDownloadName: "Okara — Deep Research Report.pdf",
    brand: {
      primary: "#0D9488",
      secondary: "#0F172A",
      verified: false,
      promptDescription:
        "Okara teal (#0D9488) for primary actions, headers and key accents, with deep slate (#0F172A) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "okara",
        company: "Okara",
        theme: "Demand signal • Network pipeline & sourcing",
        title: "Finding the work before the brief",
        summary:
          "Okara serves around a hundred autonomous companies, and nothing tells it what any of them is about to need.",
        challenge:
          "Okara is meant to be the pooled IT talent capability for around a hundred companies, but there is no list anywhere of what those companies are about to need. A project surfaces when someone happens to mention it, or when a formal brief has already landed somewhere else and it is too late to shape it. Every week the picture of network demand is pieced together from conversations, and it is knowingly incomplete.",
        whoFeelsIt:
          "The chief executive first, because pipeline is his number. Then the recruiters, sourcing against demand nobody has confirmed; then the consultants, whose next mission depends on a signal that arrives late; then the client-side IT managers who go outside for capacity that already existed inside the network.",
        whyItPersists:
          "The AFM's president told the Assemblée nationale that the AFM is not a group in the legal sense and that its companies have strong autonomy, and subsidiarity is a stated organising principle. There is therefore no group procurement, no shared demand register and no obligation on any company to disclose what it is planning. Okara's own scoping of the reachable network sits well below the AFM's stated size, which suggests this is already understood.",
        whatSolvedLooksLike:
          "On Monday the chief executive can see what is coming across the companies he serves while it is still an intention rather than a tender, and can tell his recruiters what to look for six weeks out. Consultants finishing a mission hear about the next one before the current one ends rather than after.",
        evidenceBase:
          "The AFM president's statement to the commission d'enquête on 7 May 2025 and his figures of 130 companies and more than 620,000 employees; the AFM's stated subsidiarity principle; the gap between Okara's scoping of around a hundred companies and 70,000 people and the AFM's own figures; enterprise sales cycles close to a year with double-digit stakeholder counts; and recruitment research showing three-quarters of candidates abandoning a recruiter over slow process or poor communication, against substantially higher loyalty where the next assignment is known before the current one ends.",
        openQuestion:
          "When a company in the network decides it needs a data engineer, how does Okara find out today, and how long after the decision?",
      },
      {
        number: "C2",
        companyId: "okara",
        company: "Okara",
        theme: "Vendor onboarding • Per-entity compliance evidence",
        title: "Proving the same things, again",
        summary:
          "Each buyer in the network runs its own onboarding and wants the same evidence in its own format — none of it wins a mission, all of it can delay one.",
        challenge:
          "Every company Okara sells into runs its own vendor onboarding, and each wants broadly the same things in its own format: vigilance attestations, insurance, security answers, data-protection annexes, ESG questionnaires, evidence of who directs the work. The same questions get answered for the tenth buyer, then the attestations expire and they get answered again. None of it wins a mission; all of it can stop one starting.",
        whoFeelsIt:
          "The chief executive, because on a team this size the compliance file is his desk. The recruiters and core support team, who assemble packs instead of talking to people. The consultant, whose start date slips while a document is chased. And the client's own procurement and security functions, re-verifying a supplier their sister company already cleared.",
        whyItPersists:
          "The obligations are real and they are per entity, not per network. Article L8222-1 requires each client to collect an attestation de vigilance every six months for any contract above €5,000. NIS2's article 21(2)(d) makes in-scope clients secure their own direct suppliers, and that flows through contracts regardless of France's transposition delay. Each client's vigilance plan reaches its established suppliers separately. Because the companies are legally autonomous, nothing lets one company's clearance count for another, so the work scales with the number of buyers rather than the volume of business.",
        whatSolvedLooksLike:
          "A first mission at a company Okara has never billed before starts in days rather than weeks, because the evidence already exists in a form the buyer accepts and nobody rebuilds it. The six-monthly refresh happens without anyone noticing.",
        evidenceBase:
          "Articles L8222-1 and L8222-2 with the €5,000 threshold, six-monthly attestations and joint and several liability; NIS2 article 21(2)(d) supplier-security flow-down, with France still untransposed as of August 2026 and referred to the Court of Justice on 8 July 2026; GDPR articles 28 and 32; the CSRD value-chain cap and statutory right to decline under Directive (EU) 2026/470; measured recruitment administration of roughly eighteen hours per vacancy with manual data entry named as the leading barrier; and the overlap between the transfer-pricing margin file and the labour-law technical-specificity evidence.",
        openQuestion:
          "How many separate client onboarding files does Okara maintain today, and who refreshes them when they expire?",
      },
    ],
  },

  // ── Myriade ──────────────────────────────────────────────────────────────
  {
    id: "myriade",
    name: "Myriade",
    monogram: "M",
    group: "ecosystem",
    sector: "Enterprise software",
    preparedFor: "Founder and Chief Executive Officer",
    oneLiner:
      "A Lille enterprise software company selling an AI-native data intelligence platform that connects to a raw warehouse and produces a documented intelligence layer.",
    scale:
      "~12 people · around a dozen large accounts generating 3,500+ analyses a month · one-year commercial history on a three-year build",
    ownership:
      "Independent, incorporated April 2025; founded by Benjamin Derville with David Alinat named as co-founder in public records.",
    pdf: "/documents/Myriade_Deep_Research_Report.pdf",
    pdfDownloadName: "Myriade — Deep Research Report.pdf",
    brand: {
      primary: "#0EA5E9",
      secondary: "#0B1220",
      verified: false,
      promptDescription:
        "Myriade sky blue (#0EA5E9) for primary actions, headers and key accents, with near-black navy (#0B1220) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "myriade",
        company: "Myriade",
        theme: "Pre-sales proof • Warehouse access & assurance",
        title: "Proving the seventy-two hours",
        summary:
          "The fastest part of the product sits behind the slowest part of the sale: every prospect wants the 72-hour claim proven on their own data.",
        challenge:
          "The central commercial claim is that Myriade connects to a raw warehouse and produces a documented, reliable intelligence layer in under 72 hours, where alternatives need months of manual preparation. Every serious enterprise prospect wants that demonstrated on their own data, and each demonstration is bespoke — a new warehouse, a new schema, new naming conventions, new gaps.",
        whoFeelsIt:
          "The founder and CEO, because at this size he is the primary seller and the technical credibility in the room. Also engineering, pulled into pre-sales; the prospect's data team, who must grant access before anything can be proven; and the customer's security function, who must clear that access first.",
        whyItPersists:
          "The claim is differentiating precisely because it is hard to believe, so it cannot be asserted — it has to be shown. But showing it requires the access that the enterprise assurance process gates, which means the fastest part of the product sits behind the slowest part of the sale. The better the claim performs, the more prospects want it proven.",
        whatSolvedLooksLike:
          "The proof runs from a standard starting position rather than being reassembled per prospect, the access needed to run it is cleared by an assurance pack that already exists, and what was learned from the last dozen warehouses makes the next one faster rather than starting from zero.",
        evidenceBase:
          "Myriade's May 2026 first-year release states connection directly to raw enterprise warehouses producing a documented, reliable intelligence layer in under 72 hours, against competitors requiring months of manual preparation, with no retention of or training on customer data. It reports around a dozen large accounts generating more than 3,500 analyses a month, data teams recovering one to two days a week, and infrastructure cost reductions of 27% to 40%. Publicly named integrations span six distinct starting positions.",
        openQuestion:
          "For the last five prospects, how much elapsed time sat between first contact and being able to run against their data, and what was the gating step?",
      },
      {
        number: "C2",
        companyId: "myriade",
        company: "Myriade",
        theme: "Assurance evidence • Security, privacy & architecture",
        title: "Answering enterprise diligence repeatedly",
        summary:
          "Twelve people answer the same enterprise diligence questions in a slightly different form for every buyer.",
        challenge:
          "Answers on security, privacy, data handling, architecture, product limits and evidence have to be assembled for each customer. The work is rarely new, the source material is spread across different places, and each buyer asks for it in a slightly different form.",
        whoFeelsIt:
          "The founder and CEO, since on a team of roughly twelve the assurance file is his desk. Also engineering, asked to confirm technical statements; and the customer's own procurement and security functions, re-verifying claims that another buyer has already cleared.",
        whyItPersists:
          "Enterprise questions cut across functions while a small team has limited capacity to maintain a continuously trusted evidence base, and the facts move as the product, model providers and regulatory expectations change. NIS2 supplier-security duties reach small vendors through client contracts regardless of France's transposition delay, and GDPR processor obligations require documented arrangements rather than assurances. Several of Myriade's differentiating claims are the kind buyers evidence rather than accept, and the company's own openness benchmark is labelled self-assessed pending documentation.",
        whatSolvedLooksLike:
          "A customer question is answered confidently without the founder becoming the research coordinator, and the team spends its time on what is genuinely new rather than reassembling what it already knows. The claims that differentiate the product are documented well enough that they survive scrutiny without a call.",
        evidenceBase:
          "Myriade's public security posture includes installation at the client, read-only mode, limited data preview, no data retention or training on customer data, exportable customer-owned context, and zero-knowledge encryption described as forthcoming — each a statement an enterprise buyer will want evidenced. GDPR articles 24 to 28 govern controller and processor arrangements. The AI Act's Article 50 transparency obligations applied from 2 August 2026. CNIL guidance on AI systems using personal data stresses purpose definition, data minimisation, output controls and monitoring for drift.",
        openQuestion:
          "Which recurring customer diligence questions still require you personally to reconstruct the answer?",
      },
    ],
  },

  // ── Skillberg ────────────────────────────────────────────────────────────
  {
    id: "skillberg",
    name: "Skillberg",
    monogram: "S",
    group: "ecosystem",
    sector: "Skills intelligence",
    preparedFor: "Chief Executive Officer",
    oneLiner:
      "A Lille company building what it calls the European skills graph — prerequisite-ordered skill trees that compute the shortest path from a learner's position to a target skill.",
    scale:
      "158,000 canonical skills across eight reference systems · seven people, no outsourcing · two commercial surfaces: infrastructure and Intelligence services",
    ownership:
      "Independent; the legal entity is MV PROG SASU, registered in Lille on 22 February 2024 and incubated at EuraTechnologies, with Martin Vielvoye as president.",
    pdf: "/documents/Skillberg_Deep_Research_Report.pdf",
    pdfDownloadName: "Skillberg — Deep Research Report.pdf",
    brand: {
      primary: "#CA8A04",
      secondary: "#1C1917",
      verified: false,
      promptDescription:
        "Skillberg gold (#CA8A04) for primary actions, headers and key accents, with warm near-black (#1C1917) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "skillberg",
        company: "Skillberg",
        theme: "Attention allocation • Platform vs services",
        title: "Infrastructure and services, same seven people",
        summary:
          "Two businesses run from one seven-person team, and every hour of bespoke work is an hour not spent making the next one less bespoke.",
        challenge:
          "The company sells two things from one team. The API, connector and managed graph access are infrastructure that only pays if it becomes repeatable and largely self-serve. Skillberg Intelligence is diagnostic, mapping and roadmap work that pays now, teaches the team what customers actually need, and consumes the same research and engineering attention the infrastructure requires.",
        whoFeelsIt:
          "The chief executive, who allocates the attention and is personally involved in both. The engineering and research team, whose weeks get claimed by whichever is more urgent. And customers on the infrastructure side, whose roadmap items wait behind delivery work.",
        whyItPersists:
          "Both are correct at this stage. Services revenue funds the graph and produces market learning no amount of desk research would, and at seven people a services engagement is genuinely the fastest route to understanding a new sector. But every hour of bespoke work is an hour not spent making the next customer need less bespoke work, and the tension does not resolve itself — it has to be decided, repeatedly.",
        whatSolvedLooksLike:
          "A stated rule about what Intelligence engagements are for, so each one is accepted or declined against a purpose rather than against capacity, and so what is learned in delivery reliably becomes graph or product rather than staying in the engagement.",
        evidenceBase:
          "Skillberg publicly presents two commercial surfaces — infrastructure through a REST API and managed graph access, and Skillberg Intelligence applying the graph to customer workforce questions through diagnostic, mapping, analysis and roadmap work. The company presents a seven-person France-based team with no outsourcing of code, graph or research work. Its stated vertical ambition extends from HR into health, public sector and finance, each with different workflows, regulation and data structures. Comparable players have taken the same path at very different scale, one acquiring consulting capability in 2025 specifically to move customers from skills strategy to execution.",
        openQuestion:
          "Of the Intelligence engagements delivered so far, how many produced something that made it into the graph or the API, and how many stayed with the customer?",
      },
      {
        number: "C2",
        companyId: "skillberg",
        company: "Skillberg",
        theme: "Claim currency • Explainability & regulatory fit",
        title: "Keeping the claims current",
        summary:
          "Explainability, sovereignty and regulatory claims are the whole differentiation — and the evidence under them moves on its own schedule.",
        challenge:
          "Statements about explainability, data practices, sovereignty, market position and regulatory fit have to remain accurate as the underlying evidence moves. Regulations change, competitors reposition, the graph grows, and customer diligence returns to the same topics — so the same facts get re-established repeatedly, and the public wording drifts out of step with the evidence behind it.",
        whoFeelsIt:
          "The chief executive, who makes the public claims and is the technical authority behind them. Also engineering and research, asked to confirm technical statements; commercial colleagues, whose material derives from those statements; and prospective customers' compliance functions, who test them.",
        whyItPersists:
          "The sources change independently and none of them announce themselves. The EU AI Act timetable moved twice in 2026 — enforcement powers from 2 August, and Annex III employment obligations deferred to 2 December 2027 — while CNIL guidance, eight reference taxonomies and competitor positioning all move on separate schedules. For a company whose entire differentiation is explainability and regulatory credibility, a stale claim is not a copywriting problem.",
        whatSolvedLooksLike:
          "Repeated customer, partner and public questions are answered with confidence that the wording is current and supported, and someone other than the chief executive owns the currency of the public claims. The regulatory position on the website is right because it is maintained, not because it was correct when written.",
        evidenceBase:
          "Skillberg's current public regulatory wording is not fully aligned with the European Commission's current timeline for Annex III employment rules. The company positions explainability, European hosting, European models and cross-standard interoperability as its differentiators, each of which is a testable claim. The graph is stated at 158,000 canonical skills across eight reference systems from a May 2026 snapshot with monthly updates, so the headline figures themselves have a shelf life. CNIL guidance covers automated candidate sorting and evaluation, AI training data provenance, and Article 22 human-oversight safeguards. A much larger competitor has pursued ISO/IEC 42001-related certification to evidence equivalent claims.",
        openQuestion:
          "Which external claim or recurring diligence question is hardest for you personally to keep current and defensible?",
      },
    ],
  },

  // ── SRS — Synergies Run and Share ────────────────────────────────────────
  {
    id: "srs",
    name: "SRS",
    monogram: "SRS",
    group: "ecosystem",
    sector: "Indirect purchasing",
    preparedFor: "IT Procurement Lead, Head of Data, AI and Digital",
    oneLiner:
      "Synergies Run and Share — a grouping of companies drawn mainly from retail distribution that pools indirect (non-merchandise) purchasing and exchanges good practice between banners.",
    scale:
      "20+ shareholder groups · 50 synergy working groups across nine activity families · >€1bn of indirect purchasing a year across 50+ themes",
    ownership:
      "A member-owned grouping, not a retailer and not a conventional procurement outsourcer: it describes its own role as an interface between member groups and suppliers.",
    pdf: "/documents/SRS_Deep_Research_Report.pdf",
    pdfDownloadName: "SRS (Synergies Run and Share) — Deep Research Report.pdf",
    brand: {
      primary: "#0369A1",
      secondary: "#0C2231",
      verified: false,
      promptDescription:
        "SRS deep ocean blue (#0369A1) for primary actions, headers and key accents, with dark navy (#0C2231) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "srs",
        company: "SRS",
        theme: "Sourcing • Bid normalisation & comparison",
        title: "Compare bids without chasing",
        summary:
          "Supplier responses arrive in incomparable shapes, and normalising them sits between receiving the answers and making the decision.",
        challenge:
          "Supplier responses need to be compared quickly, but the information rarely arrives in a genuinely comparable form. The tender, the vendor documents, the commercial assumptions and the follow-up emails all have to be checked before anyone can explain why one offer is stronger than another — and that normalisation work sits between receiving the responses and making the decision.",
        whoFeelsIt:
          "The IT procurement lead and the procurement team directly; requestors, finance, legal and digital teams waiting on the outcome; and the participating suppliers, who answer near-identical questions in near-identical ways for different members.",
        whyItPersists:
          "Tenders collect commercial, technical, security and service information that suppliers produce in different formats and at different levels of detail, and no single party controls the shape of the response. In a network the problem compounds, because the same supplier may be evaluated separately by several members against slightly different criteria.",
        whatSolvedLooksLike:
          "The team reaches a defensible comparison without spending large parts of the day normalising documents or chasing missing answers, and stakeholder questions are answered from the same evidence that produced the decision rather than from a reconstruction of it.",
        evidenceBase:
          "SRS's own 2026 recruitment material lists tender drafting and comparative analysis of offers as recurring project activity, alongside solution benchmarking and testing. Carrefour states in its 2025 universal registration document that it uses generative AI in purchasing to identify renegotiation opportunities and compare tenders. Deloitte's 2025 CPO survey identifies siloed working and execution capability among the leading barriers to procurement value.",
        openQuestion:
          "How much of a typical technology sourcing cycle is spent turning supplier responses into a comparable view before the actual decision can be made?",
      },
      {
        number: "C2",
        companyId: "srs",
        company: "SRS",
        theme: "Supplier evidence • Network-wide reuse",
        title: "Stop rechecking supplier evidence",
        summary:
          "The same supplier facts get reconfirmed across the network because one function's complete record does not satisfy another's control.",
        challenge:
          "The same supplier facts get confirmed repeatedly — who the supplier is, what they provide, which evidence is current, what risks have been assessed, what still needs chasing. The work is often less about making the decision than about proving the information behind it is still valid.",
        whoFeelsIt:
          "The procurement and data leadership who own the outcome; risk, legal, finance and sustainability functions each applying their own control; and member-organisation buyers who may be re-collecting evidence someone else in the network already holds.",
        whyItPersists:
          "Supplier evidence is collected for different purposes at different refresh rates, so one function's complete record does not satisfy another's control. The regulatory picture reinforces it: NIS2 supplier-security duties reach suppliers through client contracts regardless of France's transposition delay, and sustainability evidence requirements continue even after simplification — though the new value-chain cap now limits what can be demanded of suppliers under 1,000 employees and gives them a statutory right to decline, which is itself a piece of information the network needs to hold consistently.",
        whatSolvedLooksLike:
          "The team knows which supplier information is already trustworthy and current before asking for it again. Routine checks take less time, exceptions are visible enough that attention goes to the suppliers that genuinely need review, and the network's aggregate knowledge of a supplier is worth more than any single member's.",
        evidenceBase:
          "SRS spans more than 50 indirect-purchasing themes across nine activity families and describes its role as an interface with suppliers on behalf of member groups. Professional body material through 2025 and 2026 emphasises continuous supplier risk visibility, data hygiene and human oversight. Decathlon describes critical-supplier risk criteria and external ESG assessment; Kingfisher describes supplier engagement surveys, risk-based ethical assessments and formal supplier data-protection controls. The Omnibus I Directive's value-chain cap, and the revised ESRS adopted on 3 July 2026, change what may be asked of smaller suppliers.",
        openQuestion:
          "Which supplier information gets requested or revalidated most often, even though someone in the network has probably already collected it?",
      },
    ],
  },
];
