const markets = [
  {
    id: "pine",
    name: "Pine Valley, PA",
    score: 72.4,
    tier: "Critical",
    subscribers: 4218,
    change52: -16.8,
    net30: -38,
    sales30: 71,
    disconnect30: 109,
    recoverable: 61.2,
    driver: "competition",
    focus: "Competitive response",
    rank: 1,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Competitive churn and an accelerating long-term decline make this market a high-priority investigation target.",
    reasons: ["Long-term subscriber decline remains material", "Recent acquisition is not replacing disconnects", "Competition is the dominant recoverable churn signal"],
    changes: { "4W": -1.2, "13W": -4.7, "26W": -9.4, "52W": -16.8 },
    trend: [5068,5039,4995,4962,4930,4888,4861,4810,4782,4748,4702,4665,4630,4588,4559,4518,4481,4440,4395,4357,4319,4284,4251,4218],
    churn: { competition: 34, service: 21, product: 12, price: 15, billing: 8, move: 6, unavoidable: 4 },
    signals: { "52W decline": 88, "13W decline": 74, "Acceleration": 68, "Acquisition": 82, "Competition": 91, "Service": 51, "Price / product": 60, "Absolute loss": 72, "Recovery opp.": 80 }
  },
  {
    id: "riverton",
    name: "Riverton, TX",
    score: 58.7,
    tier: "High",
    subscribers: 2876,
    change52: -9.5,
    net30: -21,
    sales30: 54,
    disconnect30: 75,
    recoverable: 49.8,
    driver: "service",
    focus: "Service retention",
    rank: 3,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Service-related churn is the clearest recoverable signal, while recent acquisition remains negative.",
    reasons: ["Service is the dominant recoverable churn driver", "30-day net acquisition remains negative", "Short-term decline has not stabilized"],
    changes: { "4W": -0.8, "13W": -2.9, "26W": -5.4, "52W": -9.5 },
    trend: [3178,3169,3155,3138,3121,3114,3094,3087,3073,3056,3048,3029,3010,2997,2986,2972,2960,2948,2939,2925,2913,2898,2889,2876],
    churn: { competition: 20, service: 31, product: 11, price: 14, billing: 9, move: 10, unavoidable: 5 },
    signals: { "52W decline": 57, "13W decline": 54, "Acceleration": 46, "Acquisition": 69, "Competition": 52, "Service": 87, "Price / product": 48, "Absolute loss": 55, "Recovery opp.": 66 }
  },
  {
    id: "lake",
    name: "Lake County, NC",
    score: 41.6,
    tier: "Moderate",
    subscribers: 5320,
    change52: -4.2,
    net30: -11,
    sales30: 92,
    disconnect30: 103,
    recoverable: 44.1,
    driver: "price",
    focus: "Pricing retention",
    rank: 8,
    eligible: true,
    quality: "Full history",
    lifecycle: "Active",
    recommendation: "Price pressure is the leading recoverable signal, but the overall decline is more moderate than higher-ranked markets.",
    reasons: ["Price-related churn leads recoverable categories", "Recent acquisition is slightly negative", "Long-term decline is present but not severe"],
    changes: { "4W": -0.3, "13W": -1.2, "26W": -2.4, "52W": -4.2 },
    trend: [5554,5549,5541,5528,5521,5508,5502,5487,5479,5469,5458,5444,5437,5428,5416,5409,5398,5388,5379,5368,5357,5349,5337,5320],
    churn: { competition: 18, service: 17, product: 13, price: 27, billing: 9, move: 10, unavoidable: 6 },
    signals: { "52W decline": 32, "13W decline": 28, "Acceleration": 24, "Acquisition": 48, "Competition": 44, "Service": 42, "Price / product": 77, "Absolute loss": 46, "Recovery opp.": 59 }
  },
  {
    id: "summit",
    name: "Summit, NV",
    score: 47.9,
    tier: "Moderate",
    subscribers: 1189,
    change52: null,
    net30: -13,
    sales30: 26,
    disconnect30: 39,
    recoverable: 53.4,
    driver: "product",
    focus: "Product / speed",
    rank: 6,
    eligible: true,
    quality: "Limited history",
    lifecycle: "New market",
    recommendation: "This new market is actionable with limited history because current-period evidence is sufficiently complete while long-history components remain unavailable.",
    reasons: ["Limited-history lifecycle rule is active", "Product-related churn is elevated", "Recent acquisition is negative"],
    changes: { "4W": -0.9, "13W": -3.8, "26W": null, "52W": null },
    trend: [null,null,null,null,null,null,null,null,null,null,1284,1272,1269,1255,1247,1238,1232,1226,1214,1209,1203,1198,1193,1189],
    churn: { competition: 17, service: 19, product: 29, price: 12, billing: 8, move: 9, unavoidable: 6 },
    signals: { "52W decline": 0, "13W decline": 66, "Acceleration": 58, "Acquisition": 74, "Competition": 46, "Service": 51, "Price / product": 71, "Absolute loss": 0, "Recovery opp.": 72 }
  },
  {
    id: "cedar",
    name: "Cedar Ridge, KY",
    score: 67.1,
    tier: "High",
    subscribers: 0,
    change52: -100,
    net30: 0,
    sales30: 0,
    disconnect30: 0,
    recoverable: 0,
    driver: "administrative",
    focus: "Historical only",
    rank: null,
    eligible: false,
    quality: "Historical record",
    lifecycle: "No longer served",
    recommendation: "The market remains available for historical investigation but is excluded from current recovery recommendations because service is no longer active.",
    reasons: ["Lifecycle state is no-longer-served", "Historical records are preserved", "Current recommendation eligibility is disabled"],
    changes: { "4W": 0, "13W": -100, "26W": -100, "52W": -100 },
    trend: [890,883,875,861,848,830,812,791,769,742,710,674,639,598,552,501,445,382,311,235,157,82,29,0],
    churn: { competition: 0, service: 0, product: 0, price: 0, billing: 0, move: 0, unavoidable: 0 },
    signals: { "52W decline": 100, "13W decline": 100, "Acceleration": 100, "Acquisition": 0, "Competition": 0, "Service": 0, "Price / product": 0, "Absolute loss": 100, "Recovery opp.": 0 }
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
  const c52 = $("change52");
  c52.textContent = fmtSigned(m.change52, "%");
  c52.className = (m.change52 ?? 0) < 0 ? "negative" : "positive";
  $("net30Value").textContent = fmtIntSigned(m.net30);
  $("sales30").textContent = `${m.sales30} sales`;
  $("disconnect30").textContent = `${m.disconnect30} disconnects`;
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
  svg.innerHTML = `<defs><linearGradient id="trendGradient" x1="0" x2="1"><stop offset="0" stop-color="#76a8ff"/><stop offset="1" stop-color="#5de4c7"/></linearGradient><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5de4c7" stop-opacity=".18"/><stop offset="1" stop-color="#5de4c7" stop-opacity="0"/></linearGradient></defs>${grid}${area}${paths}${lastDot}<text x="${pad.l}" y="${H-6}" fill="#546d84" font-size="10">52 weeks ago</text><text x="${W-pad.r-30}" y="${H-6}" fill="#546d84" font-size="10">Now</text>`;
}

function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);} }), { threshold:.08 });
  items.forEach(x=>obs.observe(x));
}

document.addEventListener("DOMContentLoaded", () => { initSwitcher(); renderMarket(markets[0]); initReveal(); });
