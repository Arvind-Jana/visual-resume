/**
 * Visual Resume & Virtual Ambassador UI Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Ambassador Engine
  const ambassador = new VirtualAmbassador(RESUME_DATA);

  // 2. DOM Elements
  const toggleBtn = document.getElementById('ambassador-toggle-btn');
  const openNavBtn = document.getElementById('open-ambassador-btn');
  const heroTrigger = document.getElementById('hero-chat-trigger');
  const closeBtn = document.getElementById('close-ambassador-btn');
  const clearBtn = document.getElementById('clear-chat-btn');
  const windowEl = document.getElementById('ambassador-window');
  const messagesContainer = document.getElementById('ambassador-messages');
  const chipsContainer = document.getElementById('ambassador-chips');
  const chatForm = document.getElementById('ambassador-form');
  const chatInput = document.getElementById('ambassador-input');

  let isInitialized = false;

  // 3. Open/Close Drawer Handlers
  function openAmbassador() {
    windowEl.classList.remove('hidden');
    if (!isInitialized) {
      initWelcomeMessage();
      isInitialized = true;
    }
    chatInput.focus();
  }

  function closeAmbassador() {
    windowEl.classList.add('hidden');
  }

  function toggleAmbassador() {
    if (windowEl.classList.contains('hidden')) {
      openAmbassador();
    } else {
      closeAmbassador();
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleAmbassador);
  if (openNavBtn) openNavBtn.addEventListener('click', openAmbassador);
  if (heroTrigger) heroTrigger.addEventListener('click', openAmbassador);
  if (closeBtn) closeBtn.addEventListener('click', closeAmbassador);

  // 4. Reset Conversation
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      ambassador.chatHistory = [];
      initWelcomeMessage();
    });
  }

  // 5. Initial Welcome Message
  function initWelcomeMessage() {
    const welcomeText = `👋 Hello! I am **Jana Arvind Surya's Virtual Ambassador**.

I answer questions on Arvind's behalf, **strictly grounded in his verified resume, competition projects, and codebases**. 

I can explain:
- Why Arvind is an exceptional match for an **${RESUME_DATA.candidate.targetRole}** role
- The **Big 3** proof points you should remember
- The architecture behind his **5/5 contest-winning projects** (*Turing Trap* & *Google Gemini Navigator*)
- His technical stack (Node.js, WebSockets, Python, SQL, OpenAI, Chart.js)

*(Note: In accordance with privacy safeguards, I do not store or disclose private phone numbers or home addresses.)*`;

    appendMessage('assistant', welcomeText, false);
    renderChips(ambassador.getSuggestedChips());
  }

  // 6. Simple Markdown Formatter for Chat Bubbles
  function formatMarkdown(text) {
    if (!text) return '';
    let html = text
      // Headings
      .replace(/^### (.*$)/gim, '<strong style="color: #38bdf8; font-size: 13.5px; display: block; margin-bottom: 4px;">$1</strong>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italics
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #38bdf8; text-decoration: underline;">$1</a>')
      // Bullet items
      .replace(/^\s*-\s+(.*$)/gim, '<div style="margin-left: 8px; margin-bottom: 3px;">• $1</div>')
      // Numbered items
      .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<div style="margin-left: 8px; margin-bottom: 4px;"><strong>$1.</strong> $2</div>')
      // Line breaks
      .replace(/\n\n/g, '<div style="height: 8px;"></div>')
      .replace(/\n/g, '<br>');
    return html;
  }

  // 7. Append Message to Stream
  function appendMessage(sender, text, isGuardrail = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message-bubble');

    if (sender === 'user') {
      msgDiv.classList.add('msg-user');
      msgDiv.textContent = text;
    } else {
      msgDiv.classList.add('msg-assistant');
      if (isGuardrail) {
        msgDiv.classList.add('msg-guardrail');
      }
      msgDiv.innerHTML = formatMarkdown(text);
    }

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 8. Render Suggestion Chips
  function renderChips(chips) {
    chipsContainer.innerHTML = '';
    if (!chips || chips.length === 0) return;

    chips.forEach(chipText => {
      const btn = document.createElement('button');
      btn.classList.add('chip-btn');
      btn.textContent = chipText;
      btn.addEventListener('click', () => {
        handleUserQuestion(chipText);
      });
      chipsContainer.appendChild(btn);
    });
  }

  // 9. Handle User Question
  async function handleUserQuestion(question) {
    if (!question || !question.trim()) return;

    // Show user message
    appendMessage('user', question.trim());
    chatInput.value = '';

    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message-bubble', 'msg-assistant');
    typingIndicator.innerHTML = '<em style="color: #94a3b8;">Ambassador is searching verified resume records...</em>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
      const response = await ambassador.ask(question);
      messagesContainer.removeChild(typingIndicator);
      appendMessage('assistant', response.text, response.isHonestFallback);
      if (response.chips) {
        renderChips(response.chips);
      }
    } catch (err) {
      messagesContainer.removeChild(typingIndicator);
      appendMessage('assistant', "I encountered an error retrieving that information. Please try again or email Arvind at arvindjana05@gmail.com.", true);
    }
  }

  // 10. Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = chatInput.value;
    handleUserQuestion(q);
  });

  // 11. Global Shortcut: Ask Ambassador About Specific Project
  window.askAmbassadorAbout = function(promptText) {
    openAmbassador();
    handleUserQuestion(promptText);
  };
});
