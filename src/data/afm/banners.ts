import type { AfmCompany } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// AFM retail banners — the five consumer-facing companies with a deep research
// report in this pack. Every challenge card below is taken from the "Challenge
// cards" section that closes its company's report: the challenge, who feels it,
// why it persists, what solved looks like, the evidence base and the open
// question are the report's own, and the short `theme` and `summary` lines are
// labels added for the UI.
// ─────────────────────────────────────────────────────────────────────────────

export const BANNERS: AfmCompany[] = [
  // ── Boulanger ────────────────────────────────────────────────────────────
  {
    id: "boulanger",
    name: "Boulanger",
    monogram: "B",
    group: "banner",
    sector: "Consumer electronics",
    preparedFor: "Chief Technology Officer and technology leadership",
    oneLiner:
      "France's leading specialist retailer of household appliances and consumer electronics, founded in 1954 at Lesquin near Lille.",
    scale:
      "≈€4.74bn revenue (2024) · 221–223 stores, ~53 franchised · 9,000–10,000 people in France",
    ownership:
      "Inside United.b — with Electro Dépôt, Krëfel, Hifi International, Recommerce and Reconomia — 88% owned by the AFM, 12% by employee shareholders.",
    pdf: "/documents/Boulanger_CTO_Research_Report.pdf",
    pdfDownloadName: "Boulanger — CTO Research Report.pdf",
    brand: {
      primary: "#EF7D00",
      secondary: "#16244B",
      verified: false,
      promptDescription:
        "Boulanger orange (#EF7D00) for primary actions, headers and key accents, with deep navy (#16244B) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "boulanger",
        company: "Boulanger",
        theme: "AI demand • Platform sequencing vs vendor agents",
        title: "The queue behind the platform",
        summary:
          "Making agents fast to build lowered the barrier to asking — and there is no neutral rule for whose use case goes first.",
        challenge:
          "Business functions across the company want AI in their daily work, and external vendors are approaching each of them directly with a specialised agent. Building a platform that makes new agents fast to create answers the architecture question but makes the demand question sharper, because the barrier to asking has dropped.",
        whoFeelsIt:
          "The technology and data leadership who must sequence the work, the business functions waiting their turn, and the teams whose shadow procurement gets blocked.",
        whyItPersists:
          "The demand is legitimate — each function has a real problem — and the vendor offers are credible. The internal platform is genuinely faster than it was, which raises expectations rather than lowering them. There is no obvious neutral basis for saying which use case goes first once several have plausible value.",
        whatSolvedLooksLike:
          "A stated, defensible sequencing rule that business functions understand and accept, tied to measurable value rather than to who asked loudest. The buy-versus-build line stays stable under pressure instead of being renegotiated case by case.",
        evidenceBase:
          "Marie Cappelaere, Chief Data & AI Officer of Boulanger and United.b, described the origin of the policy at the Connect Lille forum in November 2025: growing internal demand, each function being approached by outside vendors, and the resulting decision to buy universal components and build where Boulanger's own expertise is the differentiator.",
        openQuestion:
          "What is the current rule for choosing the next agent, and has it survived contact with a senior stakeholder who disagreed?",
      },
      {
        number: "C2",
        companyId: "boulanger",
        company: "Boulanger",
        theme: "Investment case • Was the customer journey actually better",
        title: "Proving the agent worked",
        summary:
          "The agent is live and used, but the comparison that would justify the next round of funding — satisfaction and loyalty against the classic journey — does not exist yet.",
        challenge:
          "The conversational agent has been live since the end of September 2025 and is being used, but the measures that would show whether it improved anything for the customer are still being built. Contact volumes and call durations are tracked; satisfaction and loyalty comparisons against the classic journey are stated as intentions.",
        whoFeelsIt:
          "Technology and data leadership defending the investment, customer service managers whose workload it is meant to relieve, and whoever has to decide what gets funded next.",
        whyItPersists:
          "The build moved faster than the instrumentation. Comparing an AI-assisted journey to the classic one requires a clean control, consistent tagging across channels, and agreement on which outcome counts — deflected contacts, faster resolution, or a better experience. Those are different metrics that can move in opposite directions.",
        whatSolvedLooksLike:
          "A stable comparison between the assisted and unassisted journeys on satisfaction and Net Promoter Score as well as volume, so that the next round of investment rests on evidence rather than on enthusiasm and early feedback.",
        evidenceBase:
          "Cappelaere told Républik Retail in November 2025 that the after-sales agent is the most used and generates a high volume of automatically created cases, that the team follows contact volumes, request types and call durations, and that measuring customer satisfaction and Net Promoter Score against the classic journey is a future step. Boulanger handles around six million customer requests a year with 500 dedicated customer relations staff.",
        openQuestion:
          "Which single number would you want to be able to show the executive committee in twelve months, and what is stopping you from producing it today?",
      },
      {
        number: "C3",
        companyId: "boulanger",
        company: "Boulanger",
        theme: "Agent operations • Evaluating and improving AI in production",
        title: "Running what you ship",
        summary:
          "The assistant shipped in months and more agents are queued behind it — and running judgment-bearing software in production is a discipline nobody’s operating model was built for yet.",
        challenge:
          "The conversational AI has been live in the app and on the site since autumn 2025, with a specialised after-sales assistant beside it, a voicebot on the roadmap and extension across the United.b banners announced. It is production software that judges: it answers customers in free language, creates after-sales tickets, reissues invoices. The disciplines that keep the rest of the estate reliable — service levels, probes, canaries, rollback — do not yet have their equivalents for agents. Quality is sampled by humans reading transcripts, drift is discovered when complaints arrive, and every prompt change is a production change.",
        whoFeelsIt:
          "The technology leadership who run what the data organisation ships, at peak load and on metered capacity; the generative-AI team, for whom every prompt edit is a release; customer relations, who inherit whatever quality slips through; and every team about to ship the next agent into the same estate.",
        whyItPersists:
          "The operational canon was built for deterministic systems, where a passing probe means the system works. An agent can pass every technical check and quietly get worse at its actual job. Judging conversation quality at production volume was a human task, and humans do not scale to peak — so the discipline had to wait for the technology that created the problem to make its solution affordable. The companies that shipped earliest feel it first.",
        whatSolvedLooksLike:
          "A system that continuously watches the deployed agents, their telemetry and their anonymised conversations, and evaluates them in the background: response quality, groundedness, tool use, routing, latency, cost per session. When metrics degrade it finds the root cause, proposes a concrete fix, and proves the fix in a shadow deployment on the same live traffic before a human decides whether it ships. The estate gets cheaper, faster and better while staying provably within standards, and each new agent inherits its operations on day one.",
        evidenceBase:
          "Boulanger announced the conversational AI and the specialised after-sales assistant with its app relaunch of 13 November 2025, with the app at around 1.5 million users carrying roughly 20% of digital revenue, twice the year before. Marie Cappelaere, Chief Data & AI Officer of Boulanger and United.b, has described the architecture publicly as specialist agents coordinated by an orchestrator, built in months, with a voicebot planned and extension across the United.b banners intended. Boulanger handles around six million customer requests a year.",
        openQuestion:
          "When a live agent quietly gets worse at its job, how do you find out today — and how long does that take?",
        // The app relaunch, the 1.5m app users, the 20% digital share and the
        // voicebot are all later than the CTO report, so the Widen copy has to
        // carry this card in full.
        evidenceOutsideReport: true,
      },
    ],
  },

  // ── Decathlon ────────────────────────────────────────────────────────────
  {
    id: "decathlon",
    name: "Decathlon",
    monogram: "D",
    group: "banner",
    sector: "Sporting goods",
    preparedFor: "Head of Technology, market level",
    oneLiner:
      "Vertically integrated sporting goods group founded in 1976, designing, manufacturing and selling its own equipment and apparel from Villeneuve-d'Ascq.",
    scale:
      "€16.8bn net sales, €20.7bn GMV (2025) · 1,902 stores in 82 countries · 102,913 people · 20.2% digital",
    ownership:
      "Privately held by the Mulliez family alongside the founding Leclercq family, with 52,491 employee shareholders — around 51% of the workforce.",
    pdf: "/documents/Decathlon_Head_of_Technology_Research_Report.pdf",
    pdfDownloadName: "Decathlon — Head of Technology Research Report.pdf",
    brand: {
      primary: "#3643BA",
      secondary: "#0082C3",
      verified: true,
      promptDescription:
        "Decathlon blue (#3643BA) for primary actions, headers and key accents, with a lighter sport blue (#0082C3) for secondary emphasis",
    },
    challenges: [
      {
        number: "C1",
        companyId: "decathlon",
        company: "Decathlon",
        theme: "Store formats • Concession & partner integration",
        title: "Growth in someone else's building",
        summary:
          "The fastest route to new stores is space — and sometimes systems — that belong to another company, scoped after the deal is done.",
        challenge:
          "The fastest route to new stores is increasingly a concession, a store-in-store or an acquisition — space and sometimes systems that belong to another company. Each arrival is a distinct integration problem, and the commercial deal is typically done before the technical work is scoped.",
        whoFeelsIt:
          "Market technology leadership, store operations, and the expansion teams whose timelines assume the systems will simply be there.",
        whyItPersists:
          "The commercial logic is strong and the speed is real. Decathlon Germany's expansion director put it plainly: locations that classic branch expansion would have reached in four years are available immediately through MediaMarktSaturn. That argument wins, and it should. But no two partner formats present the same technical surface, and there is no standard template for a store that is inside another retailer's estate.",
        whatSolvedLooksLike:
          "A repeatable integration pattern for non-owned formats — point of sale, inventory visibility, customer identity, payment — that can be applied in weeks rather than negotiated each time, and that expansion teams can factor into their timelines before the deal closes.",
        evidenceBase:
          "Decathlon opened a roughly 1,000 square metre concession inside MediaMarkt Perlach in Munich on 26 March 2026 under MediaMarktSaturn's Space-as-a-Service arrangement, with further locations planned; it also operates store-in-stores in Galeria, has expanded Rebike shop-in-shops to over ten of its own stores, and received conditional Spanish approval in July 2026 to acquire 18 Intersport stores.",
        openQuestion:
          "How many distinct store-format integration patterns is your market currently supporting, and which of them would you retire if you could?",
      },
      {
        number: "C2",
        companyId: "decathlon",
        company: "Decathlon",
        theme: "Product data • Marketplace & in-store terminals",
        title: "The catalogue is bigger than the store",
        summary:
          "An in-store terminal reaches several times more products than the shelves hold, on data the store team neither creates nor controls.",
        challenge:
          "A customer standing at an in-store terminal can reach several times more products than are physically on the shelves, most of them from third parties. The quality of that experience depends entirely on product data that the store team neither creates nor controls.",
        whoFeelsIt:
          "Store teams answering questions they cannot verify, market technology leadership owning the terminal experience, and the customer who ordered something that turns out not to be available as described.",
        whyItPersists:
          "Own-brand data comes from Decathlon's own design and manufacturing chain; marketplace data comes from sellers at very different levels of discipline. Bringing them to a common standard means either constraining who can sell or investing continuously in enrichment and validation. Both are expensive, and the assortment keeps growing.",
        whatSolvedLooksLike:
          "Consistent, trustworthy attributes, availability and pricing across own-brand and marketplace items, so a store associate can use the terminal in front of a customer with the same confidence they have picking a product off the shelf.",
        evidenceBase:
          "Decathlon's 100th German store, opened in Nuremberg in late 2025, offers access to 36,000 own-brand products and more than 250,000 marketplace items through in-store digital terminals. Group-wide, marketplaces form part of the 20.2% digital sales share reported for 2025.",
        openQuestion:
          "What proportion of terminal sessions end without a transaction, and do you know whether data quality is the reason?",
      },
    ],
  },

  // ── Kiabi ────────────────────────────────────────────────────────────────
  {
    id: "kiabi",
    name: "Kiabi",
    monogram: "K",
    group: "banner",
    sector: "Value fashion",
    preparedFor: "Chief Information Officer and CIO Office",
    oneLiner:
      "Value-fashion retailer founded in Lille in 1978, designing its collections in-house and selling through company-operated, partner and online channels.",
    scale:
      "€2.5bn ex-VAT (2025), up 8% · ~648 points of contact in 37 countries · ~10,000 people · 25m customers",
    ownership:
      "Privately held within the Association Familiale Mulliez, so no financials are filed on an exchange.",
    pdf: "/documents/Kiabi_CIO_Research_Report.pdf",
    pdfDownloadName: "Kiabi — CIO Research Report.pdf",
    brand: {
      primary: "#E5007D",
      secondary: "#040037",
      verified: false,
      promptDescription:
        "Kiabi magenta-pink (#E5007D) for primary actions, headers and key accents, with a deep indigo (#040037) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "kiabi",
        company: "Kiabi",
        theme: "Fragmented estate • Payments & finance reconciliation",
        title: "Building the view by hand",
        summary:
          "A consolidated picture of activity means pulling from systems built at different times, then assembling it by hand.",
        challenge:
          "Getting a consolidated picture of activity means pulling from several systems that were built at different times for different purposes, then assembling it manually. On payments, that meant two people close to full time on accounting reconciliation, and analysts moving between platforms to answer a single question about transactions.",
        whoFeelsIt:
          "The CIO office, payment and finance teams, and every business function waiting on a number.",
        whyItPersists:
          "The estate accumulated component by component as the business grew, with store-era systems carrying digital-era volumes. Each addition was rational on its own; the fragmentation is the aggregate. Replacing the foundations is a far larger commitment than putting a consolidating layer on top.",
        whatSolvedLooksLike:
          "One entry point where payment, finance and IT teams work from the same transaction data, with error codes and exceptions visible without assembly. Kiabi has now built exactly this for payments through its Purse orchestration layer, and the reconciliation staff have been redeployed to higher-value work.",
        evidenceBase:
          "Xavier Fouré, Head of International Payments, described the legacy back-office, the split data and the reconciliation burden to Républik Retail in June 2026, along with the tender at the end of 2024 and the phased production start from autumn 2025.",
        openQuestion:
          "Where else in the estate does this pattern still hold, and is the answer another orchestration layer or a consolidation programme?",
      },
      {
        number: "C2",
        companyId: "kiabi",
        company: "Kiabi",
        theme: "Analytics latency • Self-serve customer data",
        title: "The answer arrives after the decision",
        summary:
          "Analysis required queueing behind a small analyst team, and conclusions sometimes lost their point before they arrived.",
        challenge:
          "Wanting an analysis meant entering the data analysts' prioritisation queue and coordinating with product and customer-knowledge teams. By the time conclusions came back, they had sometimes lost their point. The information existed; the latency was the problem.",
        whoFeelsIt:
          "CRM and marketing teams, data analysts holding the queue, and business owners making decisions without the evidence they asked for.",
        whyItPersists:
          "Customer data is spread across purchases, omnichannel journeys, in-store behaviour, digital interactions and communication preferences, and interrogating it required specialist skills that sit in a small team. Demand for analysis grows faster than the team can grow.",
        whatSolvedLooksLike:
          "Business teams query their own data directly and get an answer in seconds, then push past analysis into recommendations. Kiabi has been running a beta of an agent against its CRM data; a four-week sales campaign plan was rebuilt in around thirty minutes, and the agent surfaced customer categories the team had not thought to include.",
        evidenceBase:
          "Julie Huguet-Macquart, Group CRM Leader, presented this at the Connect Lille forum on 30 June and 1 July 2026, as reported by Républik Retail. She noted the beta is recent and its commercial impact is not yet measurable, and that access has been extended to customer-knowledge teams.",
        openQuestion:
          "Could the same pattern serve forecasting and replenishment, as was raised from the floor at Connect Lille — and what would have to be true about data governance before that is safe?",
      },
    ],
  },

  // ── Leroy Merlin / ADEO ──────────────────────────────────────────────────
  {
    id: "leroy-merlin",
    name: "Leroy Merlin",
    monogram: "LM",
    group: "banner",
    sector: "Home improvement",
    preparedFor: "Digital, Tech and Cyber Director",
    oneLiner:
      "The flagship banner of ADEO, the French home-improvement group headquartered at Ronchin near Lille and the European leader in its market.",
    scale:
      "ADEO: €32.7bn gross business volume (2025) · ~1,300 stores on four continents · 115,000 people · six banners",
    ownership:
      "Controlled by the Association Familiale Mulliez, with 80,000 employee shareholders — around 70% of the workforce.",
    pdf: "/documents/Leroy_Merlin_Deep_Research_Report.pdf",
    pdfDownloadName: "Leroy Merlin — Deep Research Report.pdf",
    brand: {
      primary: "#78BE20",
      secondary: "#1A1A1A",
      verified: true,
      promptDescription:
        "Leroy Merlin green (#78BE20) for primary actions, headers and key accents, with near-black (#1A1A1A) for text and structure",
    },
    challenges: [
      {
        number: "C1",
        companyId: "leroy-merlin",
        company: "Leroy Merlin",
        theme: "Compliance evidence • Six banners, fifteen countries",
        title: "The same facts, reassembled every time",
        summary:
          "Every audit, regulator and vendor questionnaire wants the same evidence in a different shape, rebuilt from six banners each time.",
        challenge:
          "Every audit, regulator, board question and vendor questionnaire asks for the same underlying evidence in a slightly different shape — control proof, incident history, data-protection assessments, third-party mapping — and each request has to be reassembled from six banners across fifteen countries. The team spends more time chasing, versioning and reformatting facts than judging them.",
        whoFeelsIt:
          "The Digital, Tech and Cyber Director owns the outcome; the governance and risk team, the group data protection office, country technology and security leads, internal audit and local legal teams carry the work.",
        whyItPersists:
          "The federated brand and country model was built for local retail autonomy and speed, not for a single compliance evidence baseline. NIS2 is transposed differently in each member state; CSRD, the AI Act, GDPR and PCI DSS overlap on different asset scopes and reporting cadences. No market-standard single evidence source exists for a group of this shape, so the effort recurs each cycle rather than compounding.",
        whatSolvedLooksLike:
          "A new audit, board question or regulator query is answered from a maintained, versioned evidence base in hours rather than reconstructed over weeks, and country teams stop being interrupted for the same facts several times a quarter.",
        evidenceBase:
          "ADEO operates six banners across roughly fifteen countries with 115,000 employees. NIS2 has been transposed at different speeds and in different forms across member states. CSRD scope and timing moved again under the Omnibus I Directive in force since March 2026, while ADEO remains above the revised thresholds. The group's own technology leadership has publicly identified inconsistent definitions of core business concepts across entities as a live obstacle.",
        openQuestion:
          "When a regulator, auditor or major customer asks for the same class of evidence across brands and countries, how many teams in how many locations does one request touch before you can answer?",
      },
      {
        number: "C2",
        companyId: "leroy-merlin",
        company: "Leroy Merlin",
        theme: "Shadow AI • Inventory & accountability",
        title: "Governing what people build themselves",
        summary:
          "Employees are building their own AI tools faster than any central function can review them — and the AI Act assumes someone knows what exists.",
        challenge:
          "Employees across the group are already building their own AI tools to solve their own problems, faster than any central function can review them. Creating them is easy; maintaining, securing and governing them is not — and the AI Act's deployer obligations assume someone knows what exists.",
        whoFeelsIt:
          "The Digital, Tech and Cyber Director owns the exposure; platform and security teams inherit the maintenance; the people who built the tools carry no formal accountability; and country and banner leadership sit between the two.",
        whyItPersists:
          "The group's stated position is that usage will happen regardless and that the only workable response is a very open framework rather than prohibition — a judgement that is probably correct and that also guarantees proliferation. The tools address genuine irritants that never reach the central roadmap, so the incentive to build locally is real and will strengthen as tooling improves.",
        whatSolvedLooksLike:
          "Locally built tools and agents are visible, attributable and maintainable — someone is named as accountable for each, there is a route for the useful ones to become supported products, and the AI inventory the regulation assumes actually exists rather than being reconstructed on demand.",
        evidenceBase:
          "ADEO's Global Leader Digital Data IA Tech described in June 2026 an employee building their own tool for a cladding problem that was not a technology priority, argued that the only viable approach is a very open framework, and set out the resulting open questions — who is responsible when an agent errs, who maintains locally created solutions, how data consistency is guaranteed — while stating that accountability must remain human. EU AI Act obligations for general-purpose AI have applied since 2 August 2025.",
        openQuestion:
          "If you had to produce a list of every AI tool and automation in use across the six banners tomorrow, where would you start and how complete would it be?",
      },
    ],
  },

  // ── Norauto / Mobivia ────────────────────────────────────────────────────
  {
    id: "norauto",
    name: "Norauto",
    monogram: "N",
    group: "banner",
    sector: "Auto services",
    preparedFor: "Chief Technology Officer, Norauto International",
    oneLiner:
      "Founded near Lille in 1970, Norauto created the auto-centre format — a retail store combined with a multi-brand workshop — and is the flagship banner of Mobivia.",
    scale:
      "Mobivia: ~2,000 centres in 16 countries under 14 brands · €4bn turnover · 23,200 people · ~30m customers a year",
    ownership:
      "Family-owned within the Mulliez sphere, headquartered at Villeneuve-d'Ascq, with employee shareholding at 2.3% of capital.",
    pdf: "/documents/Norauto_Deep_Research_Report.pdf",
    pdfDownloadName: "Norauto — Deep Research Report.pdf",
    brand: {
      primary: "#002B6F",
      secondary: "#FCB731",
      verified: true,
      promptDescription:
        "Norauto midnight blue (#002B6F) for primary actions, headers and key accents, with the brand yellow (#FCB731) for highlights and calls to action",
    },
    challenges: [
      {
        number: "C1",
        companyId: "norauto",
        company: "Norauto",
        theme: "Commerce vs workshop capacity • Vehicle data",
        title: "The promise and the bay",
        summary:
          "What customers can book, what centres can deliver and which parts and technicians are free are reconciled repeatedly, by hand.",
        challenge:
          "Getting a dependable view of what customers can book, what centres can actually deliver, and which parts and certified technicians are genuinely available means comparing information held by different markets, channels and operational owners. The reconciliation happens repeatedly and largely by hand.",
        whoFeelsIt:
          "The CTO owns the outcome; digital teams, centre operations, supply chain, customer service and country management all carry pieces of it, and the customer meets the gap at the counter.",
        whyItPersists:
          "Commerce, workshop execution and supply run at different rhythms with different degrees of local variation. Vehicle identification sits underneath all of it, and an error there propagates into parts, pricing, duration and the work performed before anyone catches it. The recent history of replatforming across roughly 4,000 tills in around 1,200 centres in seven countries is a reminder of how expensive it is to change any part of this chain.",
        whatSolvedLooksLike:
          "Entering a review knowing that customer-facing promises and operational capacity describe the same position, so the discussion is about deciding rather than about whose numbers are current.",
        evidenceBase:
          "Mobivia describes an omnichannel value chain joining online sales, workshops, stores, purchasing, logistics, technical innovation and data services, with 18% of group activity now through digital channels, supplied from six European warehouses and more than 1,200 referenced suppliers. Norauto's French network alone handles around three million entries a year across roughly 410 centres.",
        openQuestion:
          "Which recurring review currently requires the most manual reconciliation between digital, workshop and supply information?",
      },
      {
        number: "C2",
        companyId: "norauto",
        company: "Norauto",
        theme: "Group platforms • Common by default vs deliberately local",
        title: "How much convergence does the group want?",
        summary:
          "Sister brands have taken publicly opposite positions on the same technology, and every shared platform decision reopens the argument.",
        challenge:
          "Sister brands in the same group have taken publicly opposite positions on the same technology, and the group tolerates it. That leaves an international technology function without a settled answer on where common capability is expected and where local difference is protected.",
        whoFeelsIt:
          "The CTO, brand and country leadership, group functions, and every team asked to build something twice or to adopt something they did not choose.",
        whyItPersists:
          "The divergence is not accidental or unresolved — it reflects genuinely different commercial positions that are each working on their own terms. A discounter competing on price and a service network competing on expertise do not need identical technology. But without an explicit convergence principle, every shared platform decision reopens the argument from scratch.",
        whatSolvedLooksLike:
          "A stated rule for what is common by default and what is deliberately local, understood by brand leadership, so that platform decisions are applications of an agreed principle rather than fresh negotiations.",
        evidenceBase:
          "In July 2026 Carter-Cash's digital commerce director stated publicly that Norauto and ATU are doing more and more with AI while Carter-Cash has chosen not to, building a human call centre handling more than 8,000 conversations a day instead, and that Mobivia respects the divergence because it is delivering results. Mobivia operates 14 brands across 16 countries with roughly 2,000 sites.",
        openQuestion:
          "When you propose a common international capability, who has to agree, and how often does that conversation end in an exception?",
      },
    ],
  },
];
