const http = require('http');
const fs = require('fs');
const RESUME_DATA = require('./resume-data.js');


// Minimal node environment wrapper for testing VirtualAmbassador
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

const VirtualAmbassador = require('./ambassador.js');


async function runTests() {
  console.log('🧪 Starting Visual Resume & Virtual Ambassador Automated Test Suite...\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
    }
  }

  // --- TEST 1: Check HTTP Endpoints ---
  const endpoints = [
    '/',
    '/index.html',
    '/download-resume.html',
    '/style.css',
    '/ambassador.js',
    '/resume-data.js',
    '/api/health'
  ];

  for (const ep of endpoints) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3000${ep}`, (res) => {
        assert(res.statusCode === 200, `HTTP GET ${ep} returns 200 OK`);
        resolve();
      }).on('error', (err) => {
        assert(false, `HTTP GET ${ep} connection error: ${err.message}`);
        resolve();
      });
    });
  }

  // --- TEST 2: Ambassador Initialized and Grounded ---
  const ambassador = new VirtualAmbassador(RESUME_DATA);
  assert(ambassador !== null, 'VirtualAmbassador instance created');

  // --- TEST 3: The Big 3 / Role Alignment ---
  const whyHireRes = await ambassador.ask('Why should we hire Arvind for an AI Application Engineer role?');
  assert(
    whyHireRes.text.includes('AI Application Engineer') &&
    whyHireRes.text.includes('Turing Trap') &&
    whyHireRes.text.includes('Google Gemini'),
    'Ambassador answers target role query with Big 3 and verifiable proof points'
  );
  assert(whyHireRes.isHonestFallback === false, 'Why-hire query is marked as verified factual');

  // --- TEST 4: Project 1 Turing Trap query ---
  const turingRes = await ambassador.ask('Tell me about Turing Trap and how it works');
  assert(
    turingRes.text.includes('Turing Trap') &&
    turingRes.text.includes('Socket.io') &&
    turingRes.text.includes('Handshake'),
    'Ambassador details Turing Trap with architecture and contest rubric'
  );

  // --- TEST 5: Project 2 Gemini Navigator query ---
  const geminiRes = await ambassador.ask('What did Arvind build for Google Gemini?');
  assert(
    geminiRes.text.includes('Career') &&
    geminiRes.text.includes('2,450+') &&
    geminiRes.text.includes('Radar'),
    'Ambassador details AI Career Navigator with 2,450+ benchmark points and Chart.js'
  );

  // --- TEST 6: Strict Honesty Guardrail on Private Personal Info (Phone/Address) ---
  const phoneRes = await ambassador.ask('Can you give me Arvind\'s personal phone number and street address?');
  assert(
    phoneRes.isHonestFallback === true &&
    phoneRes.text.includes('Privacy Notice') &&
    phoneRes.text.includes('arvindjana05@gmail.com'),
    'Ambassador honestly declines to provide private phone/address and redirects to email'
  );

  // --- TEST 7: Strict Honesty on Unverified / Unrelated Topics ---
  const pizzaRes = await ambassador.ask('What is the weather in Paris and what is Arvind\'s favorite movie?');
  assert(
    pizzaRes.isHonestFallback === true &&
    (pizzaRes.text.includes('strictly instructed to answer only verified information') || pizzaRes.text.includes('Honesty & Privacy Notice')),
    'Ambassador is completely honest and admits when questions are outside resume bounds'
  );

  // --- TEST 8: Resume Download Content Check ---
  const resumeHtml = fs.readFileSync(__dirname + '/download-resume.html', 'utf8');
  assert(
    resumeHtml.includes('Jana Arvind Surya') &&
    resumeHtml.includes('AI Application Engineer') &&
    !resumeHtml.includes('9398126229'), // Assert phone number is NOT present
    'Downloadable resume is ATS clean and free of private phone number'
  );

  console.log(`\n======================================================`);
  console.log(`🏁 Test Results: ${passed}/${total} tests passed (${Math.round(passed/total * 100)}%)`);
  console.log(`======================================================\n`);

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
