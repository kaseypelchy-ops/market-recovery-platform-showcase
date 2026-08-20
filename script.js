const markets = [
  {
    id: "pine",
    name: "Northstar Region, PA",
    score: 72.4,
    tier: "Critical",
    subscribers: 4218,
    longChange: -16.8,
    recentNet: -38,
    recentSales: 71,
    recentChurn: 109,
    recoverable: 61.2,
    driver: "competition",
    focus: "Competitive response",
    rank: 1,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Competitive churn and an accelerating long-term decline make this market a high-priority investigation target.",
    reasons: ["Long-term subscriber decline remains material", "Recent acquisition is not replacing disconnects", "Competition is the dominant recoverable churn signal"],
    changes: { "Short": -1.2, "Medium": -4.7, "Long": -9.4, "Extended": -16.8 },
    trend: [5068,5039,4995,4962,4930,4888,4861,4810,4782,4748,4702,4665,4630,4588,4559,4518,4481,4440,4395,4357,4319,4284,4251,4218],
    churn: { competition: 34, service: 21, product: 12, price: 15, billing: 8, move: 6, unavoidable: 4 },
    signals: { "Trajectory": 88, "Momentum": 68, "Acquisition balance": 82, "Churn pressure": 91, "Absolute impact": 72, "Recoverability": 80 }
  },
  {
    id: "riverton",
    name: "Copper Ridge Region, TX",
    score: 58.7,
    tier: "High",
    subscribers: 2876,
    longChange: -9.5,
    recentNet: -21,
    recentSales: 54,
    recentChurn: 75,
    recoverable: 49.8,
    driver: "service",
    focus: "Service retention",
    rank: 3,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Service-related churn is the clearest recoverable signal, while recent acquisition remains negative.",
    reasons: ["Service is the dominant recoverable churn driver", "Recent net acquisition remains negative", "Short-term decline has not stabilized"],
    changes: { "Short": -0.8, "Medium": -2.9, "Long": -5.4, "Extended": -9.5 },
    trend: [3178,3169,3155,3138,3121,3114,3094,3087,3073,3056,3048,3029,3010,2997,2986,2972,2960,2948,2939,2925,2913,2898,2889,2876],
    churn: { competition: 20, service: 31, product: 11, price: 14, billing: 9, move: 10, unavoidable: 5 },
    signals: { "Trajectory": 57, "Momentum": 46, "Acquisition balance": 69, "Churn pressure": 87, "Absolute impact": 55, "Recoverability": 66 }
  },
  {
    id: "lake",
    name: "Bluewater Region, NC",
    score: 41.6,
    tier: "Moderate",
    subscribers: 5320,
    longChange: -4.2,
    recentNet: -11,
    recentSales: 92,
    recentChurn: 103,
    recoverable: 44.1,
    driver: "price",
    focus: "Pricing retention",
    rank: 8,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Price pressure is the leading recoverable signal, but the overall decline is more moderate than higher-ranked markets.",
    reasons: ["Price-related churn leads recoverable categories", "Recent acquisition is slightly negative", "Long-term decline is present but not severe"],
    changes: { "Short": -0.3, "Medium": -1.2, "Long": -2.4, "Extended": -4.2 },
    trend: [5554,5549,5541,5528,5521,5508,5502,5487,5479,5469,5458,5444,5437,5428,5416,5409,5398,5388,5379,5368,5357,5349,5337,5320],
    churn: { competition: 18, service: 17, product: 13, price: 27, billing: 9, move: 10, unavoidable: 6 },
    signals: { "Trajectory": 32, "Momentum": 24, "Acquisition balance": 48, "Churn pressure": 77, "Absolute impact": 46, "Recoverability": 59 }
  },
  {
    id: "summit",
    name: "Summit Ridge Region, NV",
    score: 47.9,
    tier: "Moderate",
    subscribers: 1189,
    longChange: null,
    recentNet: -13,
    recentSales: 26,
    recentChurn: 39,
    recoverable: 53.4,
    driver: "product",
    focus: "Product / speed",
    rank: 6,
    eligible: true,
    quality: "Limited history",
    lifecycle: "New market",
    recommendation: "This new market is actionable with limited history because current-period evidence is sufficiently complete while long-history components remain unavailable.",
    reasons: ["Limited-history lifecycle rule is active", "Product-related churn is elevated", "Recent acquisition is negative"],
    changes: { "Short": -0.9, "Medium": -3.8, "Long": null, "Extended": null },
    trend: [null,null,null,null,null,null,null,null,null,null,1284,1272,1269,1255,1247,1238,1232,1226,1214,1209,1203,1198,1193,1189],
    churn: { competition: 17, service: 19, product: 29, price: 12, billing: 8, move: 9, unavoidable: 6 },
    signals: { "Trajectory": 0, "Momentum": 58, "Acquisition balance": 74, "Churn pressure": 71, "Absolute impact": 0, "Recoverability": 72 }
  },
  {
    id: "cedar",
    name: "Cedar Vale Region, KY",
    score: 67.1,
    tier: "High",
    subscribers: 0,
    longChange: -100,
    recentNet: 0,
    recentSales: 0,
    recentChurn: 0,
    recoverable: 0,
    driver: "administrative",
    focus: "Historical only",
    rank: null,
    eligible: false,
    quality: "Historical record",
    lifecycle: "No longer served",
    recommendation: "The market remains available for historical investigation but is excluded from current recovery recommendations because service is no longer active.",
    reasons: ["Lifecycle state is no-longer-served", "Historical records are preserved", "Current recommendation eligibility is disabled"],
    changes: { "Short": 0, "Medium": -100, "Long": -100, "Extended": -100 },
    trend: [890,883,875,861,848,830,812,791,769,742,710,674,639,598,552,501,445,382,311,235,157,82,29,0],
    churn: { competition: 0, service: 0, product: 0, price: 0, billing: 0, move: 0, unavoidable: 0 },
    signals: { "Trajectory": 100, "Momentum": 100, "Acquisition balance": 0, "Churn pressure": 0, "Absolute impact": 100, "Recoverability": 0 }
  }
];

const $ = (id) => document.getElementById(id);
const fmtSigned = (n, suffix = "") => n === null ? "—" : `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(1)}${suffix}`;
const fmtIntSigned = (n) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toLocaleString()}`;
const titleCase = (s) => s.replace(/_/g," ").replace(/\b\w/g, c => c.toUpperCase());

function initSwitcher(){
  const root = $("marketSwitcher");
  markets.forEach((m, i) => {
    const b = document.createElement("button");
    const tone = m.lifecycle === "No longer served" ? "historical" : m.quality === "Limited history" ? "limited" : (m.tier === "Critical" || m.tier === "High") ? "distressed" : "standard";
    b.className = `market-button ${tone}${i === 0 ? " active" : ""}`;
    b.dataset.id = m.id;
    b.innerHTML = `<span class="market-button-main"><strong>${m.name}</strong><small>${m.lifecycle}</small></span><span class="market-button-meta">${m.tier}</span>`;
    b.addEventListener("click", () => {
      root.querySelectorAll("button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderMarket(m);
    });
    root.appendChild(b);
  });
}

function renderMarket(m){
  $("crumbMarket").textContent = m.name;
  $("marketTitle").textContent = m.name;
  $("qualityBadge").textContent = m.quality;
  $("lifecycleBadge").textContent = m.lifecycle;
  $("lifecycleBadge").style.color = m.lifecycle === "Active" ? "#81d9ac" : m.lifecycle === "New market" ? "#e6c97c" : "#a2acb8";
  $("scoreValue").textContent = m.score.toFixed(1);
  $("priorityTier").textContent = m.tier;
  const tierDot = document.querySelector(".tier-dot");
  if (tierDot) tierDot.dataset.tier = m.tier.toLowerCase();
  $("subscriberValue").textContent = m.subscribers.toLocaleString();
  const c52 = $("longChange");
  c52.textContent = fmtSigned(m.longChange, "%");
  c52.className = (m.longChange ?? 0) < 0 ? "negative" : "positive";
  $("recentNetValue").textContent = fmtIntSigned(m.recentNet);
  $("recentSales").textContent = `${m.recentSales} sales`;
  $("recentChurn").textContent = `${m.recentChurn} disconnects`;
  $("recoverableValue").textContent = m.recoverable.toFixed(1);
  $("driverPill").textContent = titleCase(m.driver);
  $("recommendationFocus").textContent = m.focus;
  $("recommendationText").textContent = m.recommendation;
  $("rankBadge").textContent = m.rank ? `Rank #${m.rank}` : "Not ranked";
  $("eligibilityValue").textContent = m.eligible ? "Eligible" : "Excluded";
  $("eligibilityValue").style.color = m.eligible ? "#6be09d" : "#ff9aa8";

  const reasonRoot = $("reasonList");
  reasonRoot.innerHTML = "";
  m.reasons.forEach(r => { const s = document.createElement("span"); s.textContent = r; reasonRoot.appendChild(s); });

  const summary = $("trendSummary"); summary.innerHTML = "";
  Object.entries(m.changes).forEach(([k,v]) => {
    const d = document.createElement("div");
    const cls = v === null ? "" : v < 0 ? "neg" : "pos";
    d.innerHTML = `<span>${k} change</span><strong class="${cls}">${fmtSigned(v, "%")}</strong>`;
    summary.appendChild(d);
  });
  drawTrend(m.trend);
  renderBars("churnBars", m.churn, false);
  renderBars("scoreBars", m.signals, true);
}

function renderBars(id, obj, isScore){
  const root = $(id); root.innerHTML = "";
  const entries = Object.entries(obj);
  const max = isScore ? 100 : Math.max(1, ...entries.map(([,v]) => v));
  entries.forEach(([name,value]) => {
    const row = document.createElement("div"); row.className = "bar-row";
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    row.innerHTML = `<label>${name}</label><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><strong>${value}${isScore ? "" : "%"}</strong>`;
    root.appendChild(row);
  });
}

function drawTrend(values){
  const svg = $("trendChart");
  const W=720,H=240, pad={l:38,r:15,t:18,b:28};
  const valid = values.filter(v => v !== null);
  if(!valid.length){ svg.innerHTML=""; return; }
  const min = Math.min(...valid), max = Math.max(...valid), range = Math.max(1,max-min);
  const x = i => pad.l + i * ((W-pad.l-pad.r)/(values.length-1));
  const y = v => pad.t + (max-v)/range * (H-pad.t-pad.b);
  let grid = "";
  for(let i=0;i<4;i++){
    const gy = pad.t + i*((H-pad.t-pad.b)/3);
    const gv = max - i*(range/3);
    grid += `<line x1="${pad.l}" y1="${gy}" x2="${W-pad.r}" y2="${gy}" stroke="rgba(151,181,210,.10)"/><text x="2" y="${gy+4}" fill="#546d84" font-size="10">${Math.round(gv)}</text>`;
  }
  let segments=[], current=[];
  values.forEach((v,i)=>{ if(v===null){ if(current.length){segments.push(current);current=[];} } else current.push([x(i),y(v)]); });
  if(current.length) segments.push(current);
  const paths = segments.map(seg => `<path d="M ${seg.map(p=>p.join(" ")).join(" L ")}" fill="none" stroke="url(#trendGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
  let area="";
  if(segments.length){ const seg=segments[segments.length-1]; if(seg.length>1){ const baseline=H-pad.b; area=`<path d="M ${seg[0][0]} ${baseline} L ${seg.map(p=>p.join(" ")).join(" L ")} L ${seg[seg.length-1][0]} ${baseline} Z" fill="url(#areaGradient)"/>`; } }
  const lastIndex = [...values].map((v,i)=>v===null?null:i).filter(v=>v!==null).pop();
  const lastDot = lastIndex !== undefined ? `<circle cx="${x(lastIndex)}" cy="${y(values[lastIndex])}" r="4" fill="#5de4c7" stroke="#07111f" stroke-width="2"/>` : "";
  svg.innerHTML = `<defs><linearGradient id="trendGradient" x1="0" x2="1"><stop offset="0" stop-color="#76a8ff"/><stop offset="1" stop-color="#5de4c7"/></linearGradient><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5de4c7" stop-opacity=".18"/><stop offset="1" stop-color="#5de4c7" stop-opacity="0"/></linearGradient></defs>${grid}${area}${paths}${lastDot}<text x="${pad.l}" y="${H-6}" fill="#546d84" font-size="10">Earlier</text><text x="${W-pad.r-30}" y="${H-6}" fill="#546d84" font-size="10">Now</text>`;
}

function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);} }), { threshold:.08 });
  items.forEach(x=>obs.observe(x));
}

document.addEventListener("DOMContentLoaded", () => { initSwitcher(); renderMarket(markets[0]); initReveal(); });
