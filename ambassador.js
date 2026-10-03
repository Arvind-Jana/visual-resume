/**
 * Virtual Ambassador Engine for Jana Arvind Surya
 * Answers questions strictly grounded in Arvind's verified resume, projects, and links.
 * Maintains complete honesty when questions go beyond verified professional scope.
 */

class VirtualAmbassador {
  constructor(resumeData) {
    this.data = resumeData;
    this.policy = resumeData.ambassadorPolicy;
    this.chatHistory = [];
    this.customApiKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('ambassador_api_key') || '') : '';
    this.llmProvider = typeof localStorage !== 'undefined' ? (localStorage.getItem('ambassador_provider') || 'client_grounded') : 'client_grounded';

  }

  /**
   * Process an incoming recruiter question and return an evidence-backed, grounded response.
   */
  async ask(question) {
    const trimmed = (question || '').trim();
    if (!trimmed) {
      return {
        text: "I'm ready! Ask me anything about Arvind's projects, AI engineering stack, contest achievements, or why he's a match for an AI Application Engineer role.",
        isHonestFallback: false,
        chips: this.getSuggestedChips()
      };
    }

    // Add to history
    this.chatHistory.push({ role: 'user', content: trimmed });

    let response;
    // If user configured an external LLM key, we can call it with strict system grounding.
    // Otherwise (or on fallback), we use our robust client-side semantic grounding engine.
    if (this.llmProvider !== 'client_grounded' && this.customApiKey) {
      try {
        response = await this.queryExternalLLM(trimmed);
      } catch (err) {
        console.warn('External LLM failed, using grounded engine:', err);
        response = this.generateGroundedResponse(trimmed);
      }
    } else {
      // Simulate realistic typing rhythm (200-400ms)
      await new Promise(r => setTimeout(r, 280));
      response = this.generateGroundedResponse(trimmed);
    }

    this.chatHistory.push({ role: 'assistant', content: response.text });
    return response;
  }

  /**
   * Client-Side Semantic Grounding Engine
   * Evaluates query against verified knowledge base and applies strict guardrails.
   */
  generateGroundedResponse(query) {
    const q = query.toLowerCase();

    // 1. Guardrail Check: Personal / Private / Prohibited questions
    const privacyKeywords = [
      'phone', 'mobile', 'call him', 'cell', 'number',
      'address', 'live at', 'street', 'house', 'home location',
      'girlfriend', 'dating', 'marriage', 'religion', 'politics',
      'salary history', 'current compensation', 'bank', 'password',
      'weather', 'president', 'capital of', 'joke', 'movie', 'sports score'
    ];

    for (const kw of privacyKeywords) {
      if (q.includes(kw)) {
        return {
          text: `🛡️ **Honesty & Privacy Notice**: ${this.policy.honestRefusalMessage}`,
          isHonestFallback: true,
          action: 'contact_modal',
          chips: [
            "Why is Arvind a great fit for an AI Engineer role?",
            "What did Arvind build in Turing Trap?",
            "How can I contact Arvind?"
          ]
        };
      }
    }

    // 2. The Big 3 / Why Hire / Target Role Match
    if (
      (q.includes('why') && q.includes('hire')) ||
      q.includes('why choose') ||
      q.includes('why arvind') ||
      q.includes('qualif') ||
      q.includes('fit') ||
      q.includes('target role') ||
      q.includes('three things') ||
      q.includes('3 things') ||
      q.includes('remember') ||
      q.includes('stand out') ||
      q.includes('elevator pitch') ||
      q.includes('summary') ||
      q.includes('about himself') ||
      q.includes('about arvind') ||
      q.includes('who is arvind')
    ) {
      const b3 = this.data.theBigThree;
      return {
        text: `Arvind is specifically targeting the **${this.data.candidate.targetRole}** role. Here are the **3 core pillars** that define his value, backed by verifiable proof:

1. **${b3[0].title}**:
   - *The Claim*: ${b3[0].claim}
   - *Verifiable Proof*: Built **${b3[0].proof.projectTitle}** for the ${b3[0].proof.contest}. Engineered authoritative WebSocket room synchronization, secret AI prompt generation, and procedural Web Audio, achieving a perfect **${b3[0].proof.score}** with **${b3[0].proof.latencyMetric}**.

2. **${b3[1].title}**:
   - *The Claim*: ${b3[1].claim}
   - *Verifiable Proof*: Built the **${b3[1].proof.projectTitle}** for the ${b3[1].proof.contest}. Modeled 2,450+ benchmark points across 6 tech domains with dynamic 5-axis Radar charts, discovering that verified AI upskilling awards a **${b3[1].proof.discoveryMetric}**. Scored a flawless **${b3[1].proof.score}**.

3. **${b3[2].title}**:
   - *The Claim*: ${b3[2].claim}
   - *Verifiable Proof*: B.Tech in Computer Science & Design from Sasi Institute, combined with hands-on AI/ML internships (predictive models, feature engineering) and enterprise SQL data transformation pipelines.

Would you like to drill into the architecture of any of these projects?`,
        isHonestFallback: false,
        chips: [
          "Tell me about Turing Trap",
          "Explain the Google Gemini visualizer",
          "What is Arvind's tech stack?"
        ]
      };
    }

    // 3. Project 1: Turing Trap (OpenAI / WebSockets)
    if (
      q.includes('turing trap') ||
      q.includes('game') ||
      q.includes('impostor') ||
      q.includes('websocket') ||
      q.includes('socket.io') ||
      q.includes('openai') ||
      q.includes('handshake')
    ) {
      const p = this.data.projects.find(item => item.id === 'turing-trap');
      return {
        text: `### 🤖 ${p.title}
*Built for the ${p.affiliation}* | **Score: ${p.scoreBadge}**

**What Arvind Did:**
- Architected an authoritative Node.js/Express/Socket.io backend managing multi-room matchmaking, prompt dispatch, and real-time state synchronization.
- Designed an undercover AI generator that outputs contextually witty human-like responses to quirky dilemmas.
- Built a built-in **"🤖 Add Simulated Friend"** bot runner so evaluators can run full multiplayer deception rounds solo with one click.
- Engineered a zero-dependency procedural audio engine using the native browser **Web Audio API** (buzzers, clock countdowns, fanfares) and canvas particle confetti.

**How It Turned Out (Results & Metrics):**
- **5/5 (20/20)** across all rubric dimensions (Execution, Creativity, Value, and Polish).
- Sub-50ms synchronized room transition latency across desktop and mobile devices.
- Code repository: [GitHub: turing-trap-multiplayer](${p.links.github})`,
        isHonestFallback: false,
        chips: [
          "How did Arvind handle solo bot testing in Turing Trap?",
          "Tell me about the Google Gemini project",
          "Can Arvind handle frontend UI design?"
        ]
      };
    }

    // 4. Project 2: AI Career & Compensation Decision Navigator (Google Gemini)
    if (
      q.includes('gemini') ||
      q.includes('career') ||
      q.includes('compensation') ||
      q.includes('dashboard') ||
      q.includes('visualization') ||
      q.includes('chart') ||
      q.includes('radar')
    ) {
      const p = this.data.projects.find(item => item.id === 'career-navigator');
      return {
        text: `### 📊 ${p.title}
*Built for the ${p.affiliation}* | **Score: ${p.scoreBadge}**

**What Arvind Did:**
- Synthesized 2,450+ compensation benchmarks across 6 tech domains (Stack Overflow Survey 2024-2025, Levels.fyi, U.S. BLS).
- Engineered a zero-dependency single-page interactive application using HTML5, Tailwind CSS, and Chart.js.
- Developed real-time mathematical simulation equations balancing gross pay, local rent, state taxes, remote work flexibility, and automation risk.
- Integrated interactive sliders (Experience 0-10 yrs, AI Upskilling 0-20 hrs/wk, Remote Days 0-5, Monthly Rent $1k-$4.5k) that dynamically update 5-axis Radar charts and metric cards without page reloads.

**Key Outcomes & Empirical Insights:**
- **The +28.4% AI Multiplier**: Verified that 8-10 weekly hours of modern LLM/RAG upskilling awards early-career engineers compensation parity with traditional mid-level devs.
- **The Geography Arbitrage**: Demonstrated that Austin, TX and National Remote positions net +21.8% higher discretionary savings than Tier-1 hubs like SF/NYC.
- **Rubric Performance**: Perfect 5/5 score. Includes client-side instant CSV export.`,
        isHonestFallback: false,
        chips: [
          "Why is Arvind a great fit for an AI Engineer role?",
          "Tell me about the Clay B2B project",
          "What databases and backend tools does Arvind use?"
        ]
      };
    }

    // 5. Project 3: Clay B2B Pipeline
    if (
      q.includes('clay') ||
      q.includes('lead') ||
      q.includes('b2b') ||
      q.includes('prospect') ||
      q.includes('enrichment')
    ) {
      const p = this.data.projects.find(item => item.id === 'clay-b2b-pipeline');
      return {
        text: `### 🎯 ${p.title}
*${p.affiliation}*

**What Arvind Did:**
- Formulated quantitative account qualification formulas combining company headcount growth, tech stack telemetry, and target buyer persona signals.
- Configured automated multi-step data enrichment pipelines in Clay to enrich 25 target enterprise accounts.
- Enforced automated verification and schema validation rules to flag missing attributes and duplicate data.

**Outcomes:**
- Delivered an actionable, verified 25-account target list complete with tier rankings, executive briefings, and clean CSV export ready for CRM sales sequences.`,
        isHonestFallback: false,
        chips: [
          "Tell me about Arvind's internships",
          "What is Arvind's tech stack?",
          "How can I contact Arvind?"
        ]
      };
    }

    // 6. Internships / Experience
    if (
      q.includes('intern') ||
      q.includes('experience') ||
      q.includes('work history') ||
      q.includes('past work') ||
      q.includes('ml intern') ||
      q.includes('android')
    ) {
      return {
        text: `Arvind has completed two targeted virtual internships combining machine learning and enterprise data operations:

1. **AI & ML Intern (Jan 2024 — Mar 2024)**:
   - Implemented supervised and unsupervised learning algorithms including linear regression, decision trees, and baseline neural networks.
   - Performed end-to-end data preprocessing, feature engineering, and model evaluation metrics using Python, Pandas, and Scikit-Learn.
   - Conducted exploratory statistical analysis to support strategic business decisions.

2. **Android Developer & Data Intern (Apr 2024 — Jun 2024)**:
   - Wrote SQL queries and transformations to extract operational data supporting monthly executive reviews.
   - Developed visual reporting dashboards to enhance stakeholder visibility into key performance indicators.
   - Identified data discrepancies and authored corrective validation checks to maintain reporting accuracy.`,
        isHonestFallback: false,
        chips: [
          "What certifications does Arvind have?",
          "What is Arvind's education background?",
          "Can Arvind build full-stack web applications?"
        ]
      };
    }

    // 7. Tech Stack / Skills / Programming Languages
    if (
      q.includes('stack') ||
      q.includes('technolog') ||
      q.includes('skill') ||
      q.includes('language') ||
      q.includes('node') ||
      q.includes('python') ||
      q.includes('sql') ||
      q.includes('javascript')
    ) {
      return {
        text: `### 🛠️ Arvind's Technical Competencies

- **AI & Generative Systems**: OpenAI API, Prompt Engineering, LLMOps concepts, RAG context retrieval, Scikit-Learn, Gemini workflows, synthetic data generation.
- **Full-Stack & Systems**: Node.js, Express.js, WebSockets (Socket.io), JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Python, Web Audio API, Canvas rendering.
- **Data Engineering & Analytics**: SQL (complex joins, aggregations, transformations), Pandas, NumPy, Data Modeling, Feature Engineering, Chart.js.
- **Tools & Platforms**: Git, GitHub, Replit (Core/Pro cloud setup), Render, Railway, VS Code.

Arvind's sweet spot is the intersection of **AI API integration, low-latency backend state machines (Node.js/Socket.io), and polished client-side interactive experiences**.`,
        isHonestFallback: false,
        chips: [
          "What makes Arvind unique compared to other candidates?",
          "Show me the 3 key takeaways",
          "Can I download Arvind's resume?"
        ]
      };
    }

    // 8. Education & Certifications
    if (
      q.includes('education') ||
      q.includes('degree') ||
      q.includes('college') ||
      q.includes('university') ||
      q.includes('sasi') ||
      q.includes('certification') ||
      q.includes('ibm') ||
      q.includes('infosys')
    ) {
      return {
        text: `### 🎓 Education & Verified Credentials

**Education:**
- **B.Tech in Computer Science and Design (CSD)** — Sasi Institute of Technology and Engineering (Sep 2022 — Present, Tadepalligudem, India). Focus: Algorithms, Software Architecture, Web Systems, and User Experience.
- **Intermediate (MPC)** — Tirumala Junior College (GPA: 7.7/10.0, Rajahmundry, India).
- **Secondary School Certificate (SSC)** — Bhashyam English Medium School (GPA: 9.6/10.0, Tanuku, India).

**Verified Certifications:**
- **IBM**: *Getting Started with Data* & *Intro to Data*
- **Infosys Springboard**: *Intro to Data Science*, *Express.js*, *MongoDB Database Management*, and *Java Development*`,
        isHonestFallback: false,
        chips: [
          "Why hire Arvind for an AI Engineer role?",
          "Tell me about Turing Trap",
          "How can I contact Arvind?"
        ]
      };
    }

    // 9. Contact & Next Steps
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('reach') ||
      q.includes('interview') ||
      q.includes('how to hire') ||
      q.includes('ready to hire') ||
      q.includes('connect with') ||
      q.includes('call') ||
      q.includes('linkedin') ||
      q.includes('github')
    ) {
      return {
        text: `Arvind is actively open to **AI Application Engineer** and **Full-Stack AI Developer** roles! You can connect with him through verified channels:

📧 **Email**: [arvindjana05@gmail.com](mailto:arvindjana05@gmail.com)  
🐙 **GitHub**: [github.com/Arvind-Jana](${this.data.candidate.contact.github})  
💼 **LinkedIn**: [linkedin.com/in/arvind-jana](${this.data.candidate.contact.linkedin})  
📄 **Downloadable Resume**: Click the **"Download Resume"** button on this page for a clean, ATS-compliant PDF.

*(Note: Sensitive personal details such as private phone number and street address are omitted for security, but Arvind responds promptly to email inquiries!)*`,
        isHonestFallback: false,
        action: 'contact_modal',
        chips: [
          "What are the 3 key things to remember about Arvind?",
          "Tell me about the Handshake x OpenAI challenge",
          "Download Resume"
        ]
      };
    }

    // 10. General / Unmatched Fallback (Strict Honesty Policy)
    return {
      text: `Thank you for your question! As Arvind's Virtual Ambassador, I am strictly instructed to answer only verified information from his professional resume, project codebases, and public certifications.

I don't have verified records regarding: *"${query}"*.

To ensure total accuracy, I never guess or speculate. However, I can give you detailed facts about:
- Arvind's target role (**${this.data.candidate.targetRole}**)
- The **Big 3** proof points recruiters should remember
- The **Turing Trap** real-time multiplayer AI project (Handshake x OpenAI challenge)
- The **AI Career & Compensation Decision Navigator** (Google Gemini mission)
- Arvind's technical stack (Node.js, WebSockets, Python, SQL, OpenAI, Chart.js)

Feel free to choose a topic below or reach out to Arvind directly at **${this.data.candidate.contact.email}**!`,
      isHonestFallback: true,
      chips: this.getSuggestedChips()
    };
  }

  getSuggestedChips() {
    return [
      "Why is Arvind a great fit for an AI Engineer role?",
      "Tell me about Turing Trap (OpenAI Challenge)",
      "What did Arvind build for Google Gemini?",
      "What is Arvind's tech stack?",
      "How can I get in touch?"
    ];
  }

  /**
   * Optional External LLM Integration (OpenAI or Gemini) if the evaluator supplies an API key.
   */
  async queryExternalLLM(prompt) {
    const systemPrompt = `You are the Virtual Ambassador for Jana Arvind Surya, representing him to tech recruiters.
Target Role: AI Application Engineer / Full-Stack AI Developer.
Strict Rules:
1. Only answer based on Arvind's verified projects:
   - Turing Trap (Handshake x OpenAI challenge, Node.js, Socket.io, real-time multiplayer, 5/5 score)
   - AI Career & Compensation Decision Navigator (Google Gemini challenge, Chart.js, Tailwind, 2,450+ data points, 5/5 score)
   - Clay B2B Account Scoring Pipeline (25 enterprise accounts qualified)
   - AI/ML and Android developer internships, BTech in Computer Science & Design from Sasi Institute.
2. If asked about personal phone number, home street address, salary history, or unrelated trivia, HONESTLY decline and explain that you only represent Arvind's verified professional portfolio, inviting them to email arvindjana05@gmail.com.
3. Be articulate, polite, evidence-backed, and concise.`;

    if (this.llmProvider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.customApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...this.chatHistory.slice(-4),
            { role: 'user', content: prompt }
          ],
          temperature: 0.3
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0]) {
        return {
          text: data.choices[0].message.content,
          isHonestFallback: false,
          chips: this.getSuggestedChips()
        };
      }
      throw new Error('Invalid OpenAI response');
    }

    // Default to client grounded if provider not configured
    return this.generateGroundedResponse(prompt);
  }
}

// Attach to window (browser) or module.exports (Node.js)
if (typeof window !== 'undefined') {
  window.VirtualAmbassador = VirtualAmbassador;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VirtualAmbassador;
}

