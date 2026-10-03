import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_resume_pdf(output_path):
    # Standard 1-page compact layout with 0.4 in margins
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor('#0f172a')     # Slate 900
    accent_color = colors.HexColor('#0284c7')      # Sky 600
    text_color = colors.HexColor('#334155')        # Slate 700
    subtext_color = colors.HexColor('#475569')     # Slate 600
    border_color = colors.HexColor('#cbd5e1')      # Slate 300

    name_style = ParagraphStyle(
        'ResumeName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=primary_color
    )

    role_style = ParagraphStyle(
        'ResumeRole',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=accent_color
    )

    contact_style = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=subtext_color
    )

    section_heading = ParagraphStyle(
        'ResumeSection',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=primary_color,
        spaceBefore=7,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'ResumeBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.8,
        alignment=TA_JUSTIFY,
        textColor=text_color
    )

    bullet_style = ParagraphStyle(
        'ResumeBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.8,
        alignment=TA_LEFT,
        textColor=text_color,
        leftIndent=10
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=11,
        textColor=primary_color
    )

    item_date = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        alignment=TA_LEFT,
        textColor=subtext_color
    )

    item_sub = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=accent_color
    )

    privacy_style = ParagraphStyle(
        'PrivacyFoot',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=8.5,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#64748b')
    )

    story = []

    # 1. HEADER
    story.append(Paragraph("JANA ARVIND SURYA", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("AI APPLICATION ENGINEER & FULL-STACK DEVELOPER", role_style))
    story.append(Spacer(1, 3))
    contact_text = (
        "India (Open to Remote & Relocation) &nbsp;|&nbsp; "
        "<b>Email:</b> arvindjana05@gmail.com &nbsp;|&nbsp; "
        "<b>GitHub:</b> github.com/Arvind-Jana &nbsp;|&nbsp; "
        "<b>LinkedIn:</b> linkedin.com/in/arvind-jana"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=5, spaceBefore=2))

    # 2. PROFESSIONAL SUMMARY
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))
    summary_text = (
        "Detail-oriented <b>AI Application Engineer & Full-Stack Developer</b> with hands-on expertise building "
        "production-ready generative AI systems, real-time WebSocket backends (Node.js/Socket.io), and multivariate interactive "
        "data visualizations. Proven track record winning competitive technical challenges (<b>Handshake x OpenAI Challenge</b> "
        "and <b>Google Gemini Mission</b>, both scoring <b>5/5</b>) by transforming complex machine learning models, benchmark "
        "datasets, and real-time state machines into high-impact user experiences."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. THE BIG THREE HIGHLIGHTS
    story.append(Paragraph("KEY TECHNICAL PILLARS (THE BIG 3)", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))
    story.append(Paragraph(
        "• <b>Full-Stack Real-Time AI Systems:</b> Built <i>Turing Trap</i> (Node.js/Socket.io) with authoritative room state, secret AI text generation, 30-sec voting countdowns, and Web Audio. Scored <b>5/5 across all 4 contest rubric criteria</b> with &lt;50ms latency.",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Translating Complex Data into Products:</b> Engineered the <i>AI Career Decision Navigator</i> for Google Gemini; modeled 2,450+ benchmark points across 6 tech domains with dynamic 5-axis Radar charts, proving a <b>+28.4% AI compensation multiplier</b> (Score: <b>5/5</b>).",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Rigorous CS Core & High Velocity:</b> B.Tech in Computer Science & Design; virtual internships in AI/ML (supervised modeling, feature engineering) and Android/SQL ETL pipelines; certified by <b>IBM</b> and <b>Infosys Springboard</b>.",
        bullet_style
    ))
    story.append(Spacer(1, 4))

    # 4. FEATURED PROJECTS
    story.append(Paragraph("FEATURED PROJECTS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))

    # Project 1: Turing Trap
    t1 = Table([
        [Paragraph("<b>Turing Trap: Real-Time Multiplayer AI Impostor Game</b>", item_title),
         Paragraph("Sep 2024 — Present", item_date)]
    ], colWidths=[420, 128])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Paragraph("Handshake AI Skills Studio X OpenAI Challenge (Contest Rubric: 20/20 — 100%)", item_sub))
    story.append(Paragraph("• Architected authoritative WebSocket game engine in Node.js/Socket.io with synchronized room state transitions (&lt;50ms latency).", bullet_style))
    story.append(Paragraph("• Integrated undercover AI response generation to anonymously challenge players to differentiate LLM text from human wit.", bullet_style))
    story.append(Paragraph("• Engineered an autonomous 'Simulated Friend' bot engine enabling solo evaluators to test full deception rounds with 1 click.", bullet_style))
    story.append(Paragraph("• Synthesized procedural Web Audio API sound effects (buzzer, fanfare) with zero external audio file dependencies.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: AI Career Navigator
    t2 = Table([
        [Paragraph("<b>AI Career & Compensation Decision Navigator</b>", item_title),
         Paragraph("2024", item_date)]
    ], colWidths=[420, 128])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Paragraph("Handshake AI Skills Studio X Google Gemini Mission (Contest Rubric: 20/20 — 100%)", item_sub))
    story.append(Paragraph("• Synthesized 2,450+ benchmark points across 6 tech domains (Stack Overflow 2024-2025, Levels.fyi, U.S. BLS).", bullet_style))
    story.append(Paragraph("• Formulated econometric trade-off models proving 8–10 weekly hours of AI upskilling yield a +28.4% salary lift for junior developers.", bullet_style))
    story.append(Paragraph("• Engineered single-page HTML5/Tailwind/Chart.js app featuring interactive sliders and responsive 5-axis Radar charts.", bullet_style))
    story.append(Paragraph("• Implemented zero-latency client-side CSV dataset export for offline analytical exploration.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3: Clay
    t3 = Table([
        [Paragraph("<b>Intelligent B2B Account Scoring & Pipeline</b>", item_title),
         Paragraph("2024", item_date)]
    ], colWidths=[420, 128])
    t3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t3)
    story.append(Paragraph("Clay Data Enrichment & Sales Intelligence Project", item_sub))
    story.append(Paragraph("• Built qualification scoring algorithms combining company headcount velocity, tech telemetry, and decision-maker roles.", bullet_style))
    story.append(Paragraph("• Automated multi-step enrichment workflows qualifying 25 enterprise accounts with structured executive briefing reports.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. EXPERIENCE & INTERNSHIPS
    story.append(Paragraph("PROFESSIONAL EXPERIENCE & INTERNSHIPS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))

    # Intern 1
    te1 = Table([
        [Paragraph("<b>AI & ML Intern</b> — Virtual Internship", item_title),
         Paragraph("Jan 2024 — Mar 2024", item_date)]
    ], colWidths=[420, 128])
    te1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(te1)
    story.append(Paragraph("• Implemented supervised and unsupervised models (linear regression, decision trees, baseline neural networks) in Python.", bullet_style))
    story.append(Paragraph("• Executed end-to-end data preprocessing, feature engineering, and model evaluation metrics using Pandas and Scikit-Learn.", bullet_style))
    story.append(Spacer(1, 2))

    # Intern 2
    te2 = Table([
        [Paragraph("<b>Android Developer & Data Intern</b> — Virtual Internship", item_title),
         Paragraph("Apr 2024 — Jun 2024", item_date)]
    ], colWidths=[420, 128])
    te2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(te2)
    story.append(Paragraph("• Executed SQL extraction and transformations to prepare performance datasets for monthly executive reviews.", bullet_style))
    story.append(Paragraph("• Identified data discrepancies and implemented verification queries, streamlining monthly report turnaround times.", bullet_style))
    story.append(Spacer(1, 4))

    # 6. TECHNICAL SKILLS
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))
    skills_table_data = [
        [Paragraph("<b>AI & LLMs:</b>", item_title), Paragraph("OpenAI API, Google Gemini, Prompt Engineering, RAG Concepts, LLMOps, Scikit-Learn", body_style)],
        [Paragraph("<b>Full-Stack & Systems:</b>", item_title), Paragraph("Node.js, Express.js, Socket.io, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Python, Web Audio API", body_style)],
        [Paragraph("<b>Data & Analytics:</b>", item_title), Paragraph("SQL (Queries, Joins, Aggregations), Pandas, NumPy, Data Modeling, Chart.js, MongoDB", body_style)],
        [Paragraph("<b>Tools & Platforms:</b>", item_title), Paragraph("Git, GitHub, Replit Cloud Deployment, Render, Railway, VS Code", body_style)],
    ]
    st = Table(skills_table_data, colWidths=[120, 428])
    st.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(st)
    story.append(Spacer(1, 4))

    # 7. EDUCATION & CERTIFICATIONS
    story.append(Paragraph("EDUCATION & VERIFIED CREDENTIALS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=border_color, spaceAfter=4, spaceBefore=1))

    ted = Table([
        [Paragraph("<b>B.Tech in Computer Science and Design (CSD)</b> — Sasi Institute of Technology and Eng.", item_title),
         Paragraph("2022 — Present", item_date)]
    ], colWidths=[420, 128])
    ted.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(ted)
    story.append(Paragraph("• <b>Certifications:</b> IBM (<i>Getting Started with Data</i>, <i>Intro to Data</i>); Infosys Springboard (<i>Data Science</i>, <i>Express.js</i>, <i>MongoDB</i>, <i>Java</i>)", bullet_style))
    story.append(Spacer(1, 5))

    # PRIVACY FOOTER
    story.append(Paragraph("🔒 <i>Privacy Protected: Personal phone and residential address omitted. Direct contact welcomed via arvindjana05@gmail.com or LinkedIn.</i>", privacy_style))

    doc.build(story)
    print(f"Successfully generated PDF: {output_path}")

if __name__ == '__main__':
    local_pdf = os.path.join(os.path.dirname(__file__), 'Jana_Arvind_Surya_Resume.pdf')
    downloads_pdf = r'c:\Users\arvin\Downloads\Jana_Arvind_Surya_Resume.pdf'
    projects_pdf = r'c:\Users\arvin\Downloads\Projects\Jana_Arvind_Surya_Resume.pdf'

    build_resume_pdf(local_pdf)
    shutil.copyfile(local_pdf, downloads_pdf)
    shutil.copyfile(local_pdf, projects_pdf)
    print(f"Copied to: {downloads_pdf}")
    print(f"Copied to: {projects_pdf}")
