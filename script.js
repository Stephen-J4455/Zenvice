const STORAGE_KEY = "zenvice_app_v4";
const FIREBASE_CONFIG_KEY = "zenvice_firebase_config_auth";

const fallbackContent = {
  homeSplitCards: [
    { title: "For Job Seekers", text: "Browse roles, check skill level, and apply with portfolio integration.", action: "Browse Jobs", nav: "jobs" },
    { title: "For Employers", text: "Post jobs and filter by verified Zenvice-trained talent and external applicants.", action: "Open Hire Dashboard", nav: "hire", danger: true }
  ],
  tracks: [
    { id: "t1", name: "Tech (Web, Python, UI/UX)", type: "Guided Track", mentor: "Mentor-led", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" },
    { id: "t2", name: "Business Growth Track", type: "Project-based", mentor: "Mentor-led", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
    { id: "t3", name: "Creative Brand Track", type: "Guided Track", mentor: "Mentor-led", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" }
  ],
  mentors: [
    { name: "Ada N.", role: "Frontend Mentor", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80" },
    { name: "Kunle O.", role: "Backend Mentor", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80" },
    { name: "Musa Y.", role: "Product Mentor", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80" }
  ],
  curriculum: [
    { title: "Phase 1: Foundations", text: "Core web, collaboration, and tooling.", meta: "4 weeks" },
    { title: "Phase 2: Guided Builds", text: "Mentor feedback + delivery checkpoints.", meta: "6 weeks" },
    { title: "Phase 3: Real Work", text: "Team-based project execution and review.", meta: "8 weeks" },
    { title: "Phase 4: Hiring Prep", text: "Portfolio, interviews, and role matching.", meta: "2 weeks" }
  ],
  jobs: [
    { id: "j1", title: "Frontend Developer", company: "Payflow", level: "entry", location: "Remote", note: "Portfolio integration enabled", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" },
    { id: "j2", title: "UI Engineer", company: "CredPal", level: "mid", location: "Lagos", note: "Strong product UI experience", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80" },
    { id: "j3", title: "Full-Stack Engineer", company: "Kora", level: "senior", location: "Hybrid", note: "Node.js + modern frontend stack", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" }
  ],
  hirePills: [
    { title: "Verified Zenvice Talent (Recommended)", text: "Filter by training score, project output, and team behavior." },
    { title: "External Applicants", text: "Broaden your hiring pool with additional profiles." }
  ],
  talents: [
    { name: "Amaka Obi", role: "Frontend Engineer", source: "Zenvice-trained", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80" },
    { name: "Daniel Yusuf", role: "Product Designer", source: "Zenvice-trained", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=700&q=80" },
    { name: "Nora James", role: "Backend Engineer", source: "External applicant", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80" }
  ],
  projects: [
    { id: "p1", title: "Team Commerce Dashboard", desc: "Built by trainees with analytics and access control.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
    { id: "p2", title: "Health Booking Platform", desc: "Case-study-driven delivery from discovery to launch.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" },
    { id: "p3", title: "EdTech Learning System", desc: "Documentation-rich build with collaborative team history.", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80" }
  ],
  docs: [
    { title: "Architecture Notes", text: "System decisions and module boundaries." },
    { title: "API Reference", text: "Endpoints, contracts, and integration guides." },
    { title: "Deployment Playbook", text: "CI/CD flow, rollback and quality gates." },
    { title: "Team Roles", text: "Ownership map for project contributors." }
  ],
  stories: [
    { quote: "I moved from trainee to full-time frontend role in 4 months.", author: "Ada • Trainee" },
    { quote: "We hired two Zenvice-trained developers and ramp-up was fast.", author: "Talent Lead • Employer" },
    { quote: "The project team documentation made hiring decisions easy.", author: "CTO • Startup" }
  ],
  stats: [
    { label: "Trainees", value: "12,000+" },
    { label: "Job Placements", value: "3,100+" },
    { label: "Active Companies", value: "420+" },
    { label: "Projects Delivered", value: "980+" }
  ],
  footer: {
    intro: "From learning to earning with guided execution, mentorship, and real work experience.",
    platform: ["Tracks", "Jobs", "Hire", "Projects", "Profile"],
    company: ["About", "Careers", "Contact", "Terms", "Privacy"],
    contact: ["hello@zenvice.io", "Accra • Ghana • Remote", "+233 800 000 0000"]
  }
};

const clone = (obj) => JSON.parse(JSON.stringify(obj));
let content = clone(fallbackContent);
let state = loadState();
let firebaseCtx = null;
let revealObserver;

const sidebar = document.getElementById("sidebar");
const views = Array.from(document.querySelectorAll(".view"));
const links = Array.from(document.querySelectorAll(".menu-link"));
const toast = document.getElementById("toast");
const authChip = document.getElementById("authChip");

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { profile: { name: "Your Name", role: "Role", skill: "Skill" }, savedJobs: [] };
  try { return JSON.parse(raw); } catch { return { profile: { name: "Your Name", role: "Role", skill: "Skill" }, savedJobs: [] }; }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
}

function setView(viewId) {
  const target = views.some((v) => v.id === viewId) ? viewId : "home";
  document.body.classList.toggle("auth-view-active", target === "login" || target === "signup");
  views.forEach((v) => v.classList.toggle("active", v.id === target));
  links.forEach((l) => l.classList.toggle("active", l.dataset.view === target));
  requestAnimationFrame(applyScrollReveal);
}

function routeFromHash() {
  setView((location.hash || "#home").replace("#", ""));
}

function cardItem(title, text, image, extra = "") {
  return `
    <article class="card entity-card">
      ${image ? `<img src="${image}" alt="${title}">` : ""}
      <h3>${title}</h3>
      <p>${text}</p>
      ${extra}
    </article>`;
}

function renderHome(filter = "") {
  const term = filter.toLowerCase();
  document.getElementById("homeTrackGrid").innerHTML = content.tracks
    .filter((item) => item.name.toLowerCase().includes(term))
    .map((item) => cardItem(item.name, `${item.type} • ${item.mentor}`, item.image, `<button class="btn" data-nav="learn">Continue</button>`))
    .join("");

  document.getElementById("homeSplitCards").innerHTML = content.homeSplitCards
    .map((item) => `<article class="card"><h4>${item.title}</h4><p>${item.text}</p><button class="btn ${item.danger ? "danger" : ""}" data-nav="${item.nav}">${item.action}</button></article>`)
    .join("");

  document.getElementById("homeProjectGrid").innerHTML = content.projects
    .filter((p) => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term))
    .map((p) => cardItem(p.title, p.desc, p.image, `<div class="meta"><button class="btn" data-project-doc="${p.id}">View Docs</button><button class="btn danger" data-project-hire="${p.id}">Hire Team</button></div>`))
    .join("");

  document.getElementById("storyGrid").innerHTML = content.stories
    .map((s) => `<article class="card"><p>"${s.quote}"</p><strong>${s.author}</strong></article>`)
    .join("");

  document.getElementById("statsGrid").innerHTML = content.stats
    .map((s) => `<article class="card"><h3>${s.value}</h3><p>${s.label}</p></article>`)
    .join("");
}

function renderLearn(filter = "") {
  const term = filter.toLowerCase();
  document.getElementById("learnGrid").innerHTML = content.tracks
    .filter((t) => t.name.toLowerCase().includes(term))
    .map((t) => cardItem(t.name, `${t.type} • ${t.mentor}`, t.image))
    .join("");

  document.getElementById("mentorGrid").innerHTML = content.mentors
    .filter((m) => m.name.toLowerCase().includes(term) || m.role.toLowerCase().includes(term))
    .map((m) => cardItem(m.name, m.role, m.image))
    .join("");

  document.getElementById("curriculumGrid").innerHTML = content.curriculum
    .map((c) => `<article class="card"><h4>${c.title}</h4><p>${c.text}</p><small>${c.meta}</small></article>`)
    .join("");
}

function renderJobs(filter = "") {
  const term = filter.toLowerCase();
  const level = document.getElementById("jobLevel").value;
  const filtered = content.jobs.filter((j) => {
    const levelMatch = level === "all" || j.level === level;
    const termMatch = j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term) || j.note.toLowerCase().includes(term);
    return levelMatch && termMatch;
  });

  document.getElementById("jobGrid").innerHTML = filtered
    .map((j) => cardItem(`${j.title} • ${j.company}`, `${j.location} • ${j.level.toUpperCase()} • ${j.note}`, j.image, `<button class="btn primary" data-save-job="${j.id}">Save Job</button>`))
    .join("");

  if (!state.savedJobs.length) {
    document.getElementById("savedJobsGrid").innerHTML = `<article class="card"><p>No saved jobs yet.</p></article>`;
    return;
  }
  document.getElementById("savedJobsGrid").innerHTML = state.savedJobs
    .map((j) => `<article class="card"><h4>${j.title}</h4><p>${j.company} • ${j.location}</p></article>`)
    .join("");
}

function renderHire(filter = "") {
  const term = filter.toLowerCase();
  document.getElementById("hirePills").innerHTML = content.hirePills
    .map((h) => `<article class="card"><h4>${h.title}</h4><p>${h.text}</p></article>`)
    .join("");
  document.getElementById("talentGrid").innerHTML = content.talents
    .filter((t) => t.name.toLowerCase().includes(term) || t.role.toLowerCase().includes(term))
    .map((t) => cardItem(t.name, `${t.role} • ${t.source}`, t.image, `<button class="btn danger">Contact</button>`))
    .join("");
}

function renderProjects(filter = "") {
  const term = filter.toLowerCase();
  document.getElementById("projectGrid").innerHTML = content.projects
    .filter((p) => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term))
    .map((p) => cardItem(p.title, p.desc, p.image, `<div class="meta"><button class="btn" data-project-doc="${p.id}">View Docs</button><button class="btn danger" data-project-hire="${p.id}">Hire Team</button></div>`))
    .join("");
  document.getElementById("docsGrid").innerHTML = content.docs
    .map((d) => `<article class="card"><h4>${d.title}</h4><p>${d.text}</p></article>`)
    .join("");
}

function renderProfile() {
  document.getElementById("profileName").textContent = state.profile.name || "Your Name";
  document.getElementById("profileRole").textContent = state.profile.role || "Role";
  document.getElementById("profileSkill").textContent = state.profile.skill || "Skill";
  document.getElementById("nameInput").value = state.profile.name || "";
  document.getElementById("roleInput").value = state.profile.role || "";
  document.getElementById("skillInput").value = state.profile.skill || "";
}

function renderFooter() {
  const footer = content.footer;
  const resourceLinks = ["Help Center", "Community", "Mentor Program", "Partnerships", "Status"];
  const legalLinks = ["Terms", "Privacy", "Cookies", "Security", "Accessibility"];
  const trustStats = [
    { label: "Active learners", value: "12k+" },
    { label: "Hiring partners", value: "420+" },
    { label: "Projects delivered", value: "980+" }
  ];
  document.getElementById("megaFooter").innerHTML = `
    <div class="footer-cta">
      <div>
        <p class="footer-kicker">ZENVICE NETWORK</p>
        <h3>From learning to earning, in one connected platform.</h3>
        <p>${footer.intro}</p>
      </div>
      <div class="footer-trust">
        ${trustStats.map((item) => `<article><strong>${item.value}</strong><span>${item.label}</span></article>`).join("")}
      </div>
    </div>
    <div class="footer-grid">
      <section class="footer-col-wide">
        <h4>Zenvice</h4>
        <p>Build skills with mentors, complete real projects, and get matched to companies actively hiring.</p>
        <div class="socials">
          <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <p class="footer-mini">Support: Mon - Sat, 8:00 AM - 7:00 PM (WAT)</p>
      </section>
      <section>
        <h4>Platform</h4>
        ${footer.platform.map((x) => `<a href="#">${x}</a>`).join("")}
      </section>
      <section>
        <h4>Company</h4>
        ${footer.company.map((x) => `<a href="#">${x}</a>`).join("")}
      </section>
      <section>
        <h4>Resources</h4>
        ${resourceLinks.map((x) => `<a href="#">${x}</a>`).join("")}
      </section>
      <section>
        <h4>Contact & Offices</h4>
        ${footer.contact.map((x) => `<p>${x}</p>`).join("")}
        <p>Accra, Ghana</p>
      </section>
      <section>
        <h4>Legal & Trust</h4>
        ${legalLinks.map((x) => `<a href="#">${x}</a>`).join("")}
      </section>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Zenvice. All rights reserved.</p>
      <p>Built for learners, professionals, and hiring teams.</p>
    </div>
  `;
}

function applyScrollReveal() {
  if (revealObserver) revealObserver.disconnect();
  const activeView = document.querySelector(".view.active");
  if (!activeView) return;
  const items = activeView.querySelectorAll(".card, .section-head");
  items.forEach((item) => item.classList.add("reveal"));
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  items.forEach((item) => revealObserver.observe(item));
}

function renderAll(filter = "") {
  renderHome(filter);
  renderLearn(filter);
  renderJobs(filter);
  renderHire(filter);
  renderProjects(filter);
  renderProfile();
  renderFooter();
  requestAnimationFrame(applyScrollReveal);
}

async function loadContent() {
  try {
    const response = await fetch("./content.json");
    if (!response.ok) return;
    const remote = await response.json();
    content = { ...content, ...remote };
  } catch {
    // Keep fallback content
  }
}

async function getFirebaseAuthContext(config) {
  if (firebaseCtx) return firebaseCtx;
  const [{ initializeApp }, { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword }] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js")
  ]);
  const app = initializeApp(config);
  const auth = getAuth(app);
  firebaseCtx = { auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword };
  return firebaseCtx;
}

function setAuthUI(user) {
  authChip.textContent = user ? user.email || "Signed in" : "Guest";
  document.getElementById("profileAuthHint").textContent = user ? "Authenticated with Firebase" : "Sign in to save across sessions";
}

async function connectAuthIfConfigProvided() {
  const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
  if (!raw) return null;
  try {
    const ctx = await getFirebaseAuthContext(JSON.parse(raw));
    ctx.onAuthStateChanged(ctx.auth, (user) => setAuthUI(user));
    return ctx;
  } catch {
    return null;
  }
}

document.getElementById("viewRoot").addEventListener("click", (event) => {
  const navBtn = event.target.closest("[data-nav]");
  if (navBtn) {
    location.hash = `#${navBtn.dataset.nav}`;
    return;
  }
  const saveBtn = event.target.closest("[data-save-job]");
  if (saveBtn) {
    const job = content.jobs.find((item) => item.id === saveBtn.dataset.saveJob);
    const exists = state.savedJobs.some((item) => item.id === job.id);
    if (!exists) {
      state.savedJobs.unshift(job);
      saveState();
      renderJobs(document.getElementById("globalSearch").value.trim());
      showToast("Job saved");
    } else {
      showToast("Job already saved");
    }
    return;
  }
  const docBtn = event.target.closest("[data-project-doc]");
  if (docBtn) showToast("Documentation opened");
  const hireBtn = event.target.closest("[data-project-hire]");
  if (hireBtn) showToast("Hiring request sent");
});

document.getElementById("profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.profile = {
    name: document.getElementById("nameInput").value.trim(),
    role: document.getElementById("roleInput").value.trim(),
    skill: document.getElementById("skillInput").value.trim()
  };
  saveState();
  renderProfile();
  document.getElementById("profileMsg").textContent = "Profile saved.";
  showToast("Profile updated");
});

document.getElementById("globalSearch").addEventListener("input", (event) => {
  renderAll(event.target.value.trim());
});

document.getElementById("jobLevel").addEventListener("change", () => {
  renderJobs(document.getElementById("globalSearch").value.trim());
});

document.getElementById("clearSavedJobs").addEventListener("click", () => {
  state.savedJobs = [];
  saveState();
  renderJobs(document.getElementById("globalSearch").value.trim());
  showToast("Saved jobs cleared");
});

document.getElementById("toggleSidebar").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

links.forEach((link) => link.addEventListener("click", () => sidebar.classList.remove("open")));
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("#sidebar") || target.closest("#toggleSidebar")) return;
  sidebar.classList.remove("open");
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const configRaw = localStorage.getItem(FIREBASE_CONFIG_KEY);
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");
  if (!configRaw) {
    msg.textContent = "Firebase auth config is not set for this build.";
    return;
  }
  try {
    const config = JSON.parse(configRaw);
    const ctx = await getFirebaseAuthContext(config);
    await ctx.signInWithEmailAndPassword(ctx.auth, email, password);
    msg.textContent = "Login successful.";
    showToast("Logged in");
  } catch {
    msg.textContent = "Login failed. Check config/email/password.";
  }
});

document.getElementById("signupBtn").addEventListener("click", async () => {
  const configRaw = localStorage.getItem(FIREBASE_CONFIG_KEY);
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPassword").value;
  const pass2 = document.getElementById("signupPassword2").value;
  const msg = document.getElementById("signupMsg");
  if (pass !== pass2) {
    msg.textContent = "Passwords do not match.";
    return;
  }
  if (!configRaw) {
    msg.textContent = "Firebase auth config is not set for this build.";
    return;
  }
  try {
    const config = JSON.parse(configRaw);
    const ctx = await getFirebaseAuthContext(config);
    await ctx.createUserWithEmailAndPassword(ctx.auth, email, pass);
    msg.textContent = "Account created successfully.";
    showToast("Signup successful");
  } catch {
    msg.textContent = "Signup failed. Verify config or password strength.";
  }
});

window.addEventListener("hashchange", routeFromHash);

(async function bootstrap() {
  await loadContent();
  const ctx = await connectAuthIfConfigProvided();
  if (ctx) ctx.onAuthStateChanged(ctx.auth, (user) => setAuthUI(user));
  if (!location.hash) location.hash = "#home";
  routeFromHash();
  renderAll();
})();
