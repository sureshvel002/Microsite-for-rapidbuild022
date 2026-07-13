const DoubleDiamondAI = () => {
  return (
    <div className="w-full bg-background rounded-lg p-6">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary font-display">AI Tools + Rapid Builders</h3>
        <p className="text-sm italic text-muted-foreground">From abstract ideas to working demos in days</p>
      </div>

      {/* Phase Labels */}
      <div className="flex items-start justify-center mb-1 gap-0">
        <div className="flex-1 text-center">
          <p className="text-[10px] text-muted-foreground">── Doing the right things ──</p>
          <div className="flex justify-around">
            <span className="text-xs font-semibold text-primary italic">Sense</span>
            <span className="text-xs font-semibold text-primary italic">Decide</span>
          </div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-[10px] text-muted-foreground">── Doing things right ──</p>
          <div className="flex justify-around">
            <span className="text-xs font-semibold text-primary italic">Frame</span>
            <span className="text-xs font-semibold text-primary italic">Build</span>
          </div>
        </div>
      </div>

      {/* Diamond Diagram */}
      <div className="relative flex items-center justify-center py-2">
        {/* Point A */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground text-right pr-1 leading-tight">
          <span className="font-bold text-foreground">A</span><br/>
          Don't know<br/>Could be
        </div>

        <svg viewBox="0 0 820 290" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
          {/* Diamond 1 - LEARN/WIDEN + DIAGNOSE */}
          <g>
            {/* Top-left triangle (LEARN) */}
            <polygon points="60,130 200,20 200,130" fill="hsl(200, 70%, 50%)" opacity="0.8"/>
            {/* Bottom-left triangle (WIDEN) */}
            <polygon points="60,130 200,240 200,130" fill="hsl(200, 70%, 35%)" opacity="0.9"/>
            {/* Top-right triangle (DIAGNOSE top) */}
            <polygon points="200,20 340,130 200,130" fill="hsl(200, 80%, 40%)" opacity="0.85"/>
            {/* Bottom-right triangle (DIAGNOSE bottom) */}
            <polygon points="200,240 340,130 200,130" fill="hsl(200, 80%, 30%)" opacity="0.9"/>

            {/* Diverging / Converging labels */}
            <text x="115" y="60" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(-38, 115, 60)" opacity="0.9">Diverging</text>
            <text x="115" y="210" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(38, 115, 210)" opacity="0.9">Diverging</text>
            <text x="280" y="60" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(38, 280, 60)" opacity="0.9">Converging</text>
            <text x="280" y="210" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(-38, 280, 210)" opacity="0.9">Converging</text>

            {/* Center labels */}
            <text x="145" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">LEARN</text>
            <text x="185" y="195" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 185, 195)">WIDEN</text>
            <text x="275" y="135" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">DIAGNOSE</text>
          </g>

          {/* Diamond 2 - IDEATE & SCORE + BUILD */}
          <g>
            {/* Top-left triangle */}
            <polygon points="400,130 540,20 540,130" fill="hsl(200, 70%, 50%)" opacity="0.8"/>
            {/* Bottom-left triangle (BRIEF) */}
            <polygon points="400,130 540,240 540,130" fill="hsl(200, 70%, 35%)" opacity="0.9"/>
            {/* Top-right triangle */}
            <polygon points="540,20 680,130 540,130" fill="hsl(200, 80%, 40%)" opacity="0.85"/>
            {/* Bottom-right triangle */}
            <polygon points="540,240 680,130 540,130" fill="hsl(200, 80%, 30%)" opacity="0.9"/>

            {/* Diverging / Converging labels */}
            <text x="455" y="60" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(-38, 455, 60)" opacity="0.9">Diverging</text>
            <text x="455" y="210" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(38, 455, 210)" opacity="0.9">Diverging</text>
            <text x="620" y="60" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(38, 620, 60)" opacity="0.9">Converging</text>
            <text x="620" y="210" fill="white" fontSize="10" fontStyle="italic" fontWeight="600" transform="rotate(-38, 620, 210)" opacity="0.9">Converging</text>

            {/* Center labels */}
            <text x="490" y="128" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">IDEATE</text>
            <text x="490" y="145" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">& SCORE</text>
            <text x="525" y="195" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 525, 195)">BRIEF</text>
            
            {/* BUILD circle */}
            <circle cx="620" cy="130" r="40" fill="hsl(200, 80%, 30%)" stroke="white" strokeWidth="2"/>
            <text x="620" y="125" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">BUILD</text>
            {/* Refresh arrows */}
            <path d="M 605 150 A 20 20 0 0 1 635 150" fill="none" stroke="white" strokeWidth="2"/>
            <polygon points="635,147 640,155 632,155" fill="white"/>
            <path d="M 635 110 A 20 20 0 0 1 605 110" fill="none" stroke="white" strokeWidth="2"/>
            <polygon points="605,113 600,105 608,105" fill="white"/>
          </g>

          {/* Arrow to Show & Scale */}
          <line x1="690" y1="130" x2="750" y2="130" stroke="hsl(200, 70%, 40%)" strokeWidth="2"/>
          <polygon points="750,125 760,130 750,135" fill="hsl(200, 70%, 40%)"/>
          <text x="770" y="125" fill="hsl(200, 70%, 30%)" fontSize="11" fontWeight="bold">Show</text>
          <text x="770" y="140" fill="hsl(200, 70%, 30%)" fontSize="11" fontWeight="bold">& Scale</text>

          {/* Bottom annotations - fully visible */}
          <text x="60" y="260" fill="hsl(200, 30%, 50%)" fontSize="9" fontWeight="600">Question,</text>
          <text x="60" y="271" fill="hsl(200, 30%, 50%)" fontSize="9">Challenge,</text>
          <text x="60" y="282" fill="hsl(200, 30%, 50%)" fontSize="9">Client Brief</text>

          <text x="290" y="260" fill="hsl(200, 30%, 50%)" fontSize="9" fontWeight="600">Unstructured</text>
          <text x="290" y="271" fill="hsl(200, 30%, 50%)" fontSize="9">Research</text>
          <text x="290" y="282" fill="hsl(200, 30%, 50%)" fontSize="9">Findings</text>

          <text x="400" y="260" fill="hsl(200, 30%, 50%)" fontSize="9" fontWeight="600">Final Brief,</text>
          <text x="400" y="271" fill="hsl(200, 30%, 50%)" fontSize="9">HMW Question,</text>
          <text x="400" y="282" fill="hsl(200, 30%, 50%)" fontSize="9">Strategy</text>

          <text x="530" y="260" fill="hsl(200, 30%, 50%)" fontSize="9" fontWeight="600">First Ideas and Visions,</text>
          <text x="530" y="271" fill="hsl(200, 30%, 50%)" fontSize="9">Potential Solutions,</text>
          <text x="530" y="282" fill="hsl(200, 30%, 50%)" fontSize="9">Hypothetical Answers</text>

          <text x="700" y="260" fill="hsl(200, 30%, 50%)" fontSize="9" fontWeight="600">Answers,</text>
          <text x="700" y="271" fill="hsl(200, 30%, 50%)" fontSize="9">Products,</text>
          <text x="700" y="282" fill="hsl(200, 30%, 50%)" fontSize="9">Solutions</text>

          {/* Point B */}
          <text x="688" y="125" fill="hsl(200, 30%, 40%)" fontSize="10" fontWeight="bold">B</text>
          <text x="688" y="145" fill="hsl(200, 30%, 50%)" fontSize="8">Do know</text>
          <text x="688" y="153" fill="hsl(200, 30%, 50%)" fontSize="8">Should be</text>
        </svg>
      </div>

      {/* Bottom tagline */}
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">
          Humans + AI Tools compress the process down to
        </p>
        <p className="text-lg font-bold text-primary">
          4 hours - 4 days{" "}
          <span className="font-normal text-sm text-muted-foreground">
            depending on depth of research and scope
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoubleDiamondAI;
