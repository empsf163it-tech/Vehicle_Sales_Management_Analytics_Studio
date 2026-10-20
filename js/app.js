(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const toast = (message) => {
    const el = $(".toast");
    if (!el) return;
    el.textContent = message; el.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
  };
  $$(".year").forEach(el => el.textContent = new Date().getFullYear());

  // Mobile navigation
  const menuToggle = $(".menu-toggle"), nav = $(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a, button").forEach(item => item.addEventListener("click", () => {
      nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); menuToggle.textContent="☰";
    }));
  }

  // Auth popup: interface demonstration only, no authentication or storage.
  const authBackdrop = $("#auth-modal");
  let authMode = "login";

  const EYE_OPEN_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>`;
  const EYE_CLOSED_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>`;

  const resetPasswordVisibility = () => {
    $$(".toggle-password").forEach(btn => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input) input.type = "password";
      btn.innerHTML = EYE_OPEN_SVG;
      btn.setAttribute("aria-label", "Show password");
      btn.setAttribute("title", "Show password");
    });
  };

  $$(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.innerHTML = isPassword ? EYE_CLOSED_SVG : EYE_OPEN_SVG;
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      btn.setAttribute("title", isPassword ? "Hide password" : "Show password");
    });
  });

  const setAuthMode = mode => {
    authMode = mode;
    const isSignup = mode === "signup";
    const name = $("#auth-name"), nameLabel = $("#name-label"), password = $("#auth-password");
    const confirmLabel = $("#confirm-password-label"), confirmWrap = $("#confirm-password-wrap"), confirmInput = $("#auth-confirm-password");
    const loginOpts = $("#login-options"), signupOpts = $("#signup-options"), terms = $("#auth-terms");
    const switchEl = $("#auth-switch");

    resetPasswordVisibility();

    if (name && nameLabel) {
      name.hidden = nameLabel.hidden = !isSignup;
      name.style.display = isSignup ? "block" : "none";
      nameLabel.style.display = isSignup ? "block" : "none";
      name.required = isSignup;
      if (!isSignup) name.value = "";
    }
    if (confirmLabel && confirmWrap && confirmInput) {
      confirmLabel.hidden = confirmWrap.hidden = !isSignup;
      confirmLabel.style.display = isSignup ? "block" : "none";
      confirmWrap.style.display = isSignup ? "flex" : "none";
      confirmInput.required = isSignup;
      if (!isSignup) confirmInput.value = "";
    }
    if (password) {
      password.autocomplete = isSignup ? "new-password" : "current-password";
    }
    if (loginOpts) {
      loginOpts.hidden = isSignup;
      loginOpts.style.display = isSignup ? "none" : "flex";
    }
    if (signupOpts) {
      signupOpts.hidden = !isSignup;
      signupOpts.style.display = isSignup ? "flex" : "none";
    }
    if (terms) {
      terms.required = isSignup;
      if (!isSignup) terms.checked = false;
    }

    const title = $("#auth-title");
    if (title) {
      title.innerHTML = isSignup ? "Create an <em>account.</em>" : "Welcome <em>back.</em>";
    }
    const submit = $("#auth-submit");
    if (submit) {
      submit.textContent = isSignup ? "Register" : "Log in";
    }
    if (switchEl) {
      switchEl.innerHTML = isSignup
        ? '<span>Already a user?</span> <button type="button" class="switch-btn" id="switch-to-login">Log in</button>'
        : '<span>New user?</span> <button type="button" class="switch-btn" id="switch-to-signup">Register</button>';
      $("#switch-to-login")?.addEventListener("click", () => {
        setAuthMode("login");
        if (authBackdrop) authBackdrop.scrollTop = 0;
      });
      $("#switch-to-signup")?.addEventListener("click", () => {
        setAuthMode("signup");
        if (authBackdrop) authBackdrop.scrollTop = 0;
      });
    }
    const msg = $("#auth-message");
    if (msg) msg.textContent = "";
  };
  const openAuth = mode => {
    if (!authBackdrop) return;
    authBackdrop.classList.add("open"); authBackdrop.setAttribute("aria-hidden","false");
    authBackdrop.scrollTop = 0;
    setAuthMode(mode); document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (authBackdrop) authBackdrop.scrollTop = 0;
      (mode === "signup" ? $("#auth-name") : $("#auth-email"))?.focus();
    }, 30);
  };
  const closeAuth = () => {
    if (!authBackdrop) return;
    authBackdrop.classList.remove("open"); authBackdrop.setAttribute("aria-hidden","true"); document.body.style.overflow = "";
    authBackdrop.scrollTop = 0;
    resetPasswordVisibility();
  };
  $$(".open-login").forEach(b => b.addEventListener("click", () => openAuth("login")));
  $$(".open-signup").forEach(b => b.addEventListener("click", () => openAuth("signup")));
  $(".modal-close")?.addEventListener("click", closeAuth);
  authBackdrop?.addEventListener("click", e => { if (e.target === authBackdrop) closeAuth(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAuth(); closeVehicleModal(); } });
  document.addEventListener("click", e => {
    if (e.target && e.target.id === "auth-forgot") {
      e.preventDefault();
      toast("Password reset instructions sent (demo).");
    }
  });
  $("#auth-form")?.addEventListener("submit", e => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const msg = $("#auth-message");
    if (authMode === "signup") {
      const pass = $("#auth-password")?.value || "";
      const confirmPass = $("#auth-confirm-password")?.value || "";
      if (pass !== confirmPass) {
        if (msg) msg.textContent = "Passwords do not match.";
        $("#auth-confirm-password")?.focus();
        return;
      }
    }
    toast(authMode === "signup" ? "Account registered! Leading to Home..." : "Logged in! Leading to Home...");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 400);
  });


  // Newsletter form is front-end only.
  $$(".newsletter-form").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    if (form.reportValidity()) { form.reset(); toast("Thanks! Newsletter delivery is not connected in this demo."); }
  }));
  $(".back-top")?.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  // Contact form validates fields locally but does not send data.
  $("#contact-form")?.addEventListener("submit", e => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    $("#contact-message-status").textContent = "Your fields are valid. This demo does not send or store submissions.";
    e.currentTarget.reset();
  });

  // Dashboard sample inventory and charts.
  const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
  let filteredVehicles = [...(window.VEHICLE_DATA || [])];
  const inventoryBody = $("#inventory-body");
  const statusClass = status => status.toLowerCase();
  const renderInventory = () => {
    if (!inventoryBody) return;
    const search = ($("#vehicle-search")?.value || "").trim().toLowerCase();
    const status = $("#status-filter")?.value || "all";
    const type = $("#type-filter")?.value || "all";
    const sort = $("#sort-filter")?.value || "featured";
    filteredVehicles = (window.VEHICLE_DATA || []).filter(v => {
      const matchSearch = `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search);
      return matchSearch && (status === "all" || v.status === status) && (type === "all" || v.type === type);
    });
    if (sort === "price-low") filteredVehicles.sort((a,b)=>a.price-b.price);
    if (sort === "price-high") filteredVehicles.sort((a,b)=>b.price-a.price);
    if (sort === "year") filteredVehicles.sort((a,b)=>b.year-a.year);
    if (sort === "age") filteredVehicles.sort((a,b)=>b.age-a.age);
    inventoryBody.innerHTML = filteredVehicles.map(v => `<tr>
      <td><div class="vehicle-cell"><div class="vehicle-thumb">CAR / ${v.id}</div><div><b>${v.make}</b><span class="vehicle-model">${v.model}</span></div></div></td>
      <td>${v.type}</td><td>${v.year}</td><td>${v.mileage.toLocaleString("en-IN")} km</td><td>${money(v.price)}</td>
      <td><span class="status ${statusClass(v.status)}">${v.status}</span></td>
      <td><button class="table-action" data-vehicle="${v.id}">Details ↗</button></td></tr>`).join("");
    $("#result-count").textContent = `${filteredVehicles.length} sample vehicle${filteredVehicles.length===1?"":"s"}`;
    $("#empty-state").hidden = filteredVehicles.length > 0;
    const all = window.VEHICLE_DATA || [];
    if ($("#kpi-total")) $("#kpi-total").textContent = all.length;
    if ($("#kpi-available")) $("#kpi-available").textContent = all.filter(v=>v.status==="Available").length;
  };
  ["#vehicle-search","#status-filter","#type-filter","#sort-filter"].forEach(sel => $(sel)?.addEventListener("input",renderInventory));

  const chart = $("#sales-chart");
  const renderChart = () => {
    if (!chart) return;
    const count = Number($("#chart-period")?.value || 6);
    const data = (window.SALES_DATA || []).slice(-count);
    const max = Math.max(...data.map(d=>d.value),1);
    chart.innerHTML = data.map((d,i) => `<div class="bar-group"><span class="bar-value">${d.value}</span><div class="bar ${i===data.length-1?"current":""}" style="height:${Math.max(5,d.value/max*72)}%" title="${d.month}: ${d.value} sample units"></div><span class="bar-label">${d.month}</span></div>`).join("");
  };
  $("#chart-period")?.addEventListener("change",renderChart);
  if (inventoryBody) { renderInventory(); renderChart(); }

  // Export currently filtered sample vehicles as CSV.
  $("#export-csv")?.addEventListener("click", () => {
    if (!filteredVehicles.length) { toast("No vehicles to export for these filters."); return; }
    const cols = ["make","model","type","year","mileage","price","status","age","fuel","transmission"];
    const quote = v => `"${String(v).replaceAll('"','""')}"`;
    const csv = [cols.join(","), ...filteredVehicles.map(v=>cols.map(c=>quote(v[c])).join(","))].join("\r\n");
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href=url; link.download="inaubu-sample-inventory.csv"; link.click(); URL.revokeObjectURL(url);
    toast("Sample inventory CSV exported.");
  });

  const vehicleBackdrop = $("#vehicle-modal");
  function closeVehicleModal() {
    if (!vehicleBackdrop) return;
    vehicleBackdrop.classList.remove("open"); vehicleBackdrop.setAttribute("aria-hidden","true"); document.body.style.overflow = "";
  }
  $(".vehicle-close")?.addEventListener("click",closeVehicleModal);
  vehicleBackdrop?.addEventListener("click",e=>{if(e.target===vehicleBackdrop)closeVehicleModal();});
  inventoryBody?.addEventListener("click",e=>{
    const button=e.target.closest("[data-vehicle]"); if(!button)return;
    const v=(window.VEHICLE_DATA||[]).find(item=>item.id===Number(button.dataset.vehicle)); if(!v)return;
    $("#vehicle-modal-title").textContent=`${v.make} ${v.model}`;
    $("#vehicle-detail-content").innerHTML=`<div class="vehicle-detail-grid">${[
      ["Type",v.type],["Model year",v.year],["Mileage",`${v.mileage.toLocaleString("en-IN")} km`],["Asking price",money(v.price)],["Status",v.status],["Days in stock",v.age],["Fuel",v.fuel],["Transmission",v.transmission]
    ].map(([label,value])=>`<div><span>${label}</span><b>${value}</b></div>`).join("")}</div><p class="tiny">Illustrative sample vehicle record. Changes are not saved.</p>`;
    vehicleBackdrop.classList.add("open");vehicleBackdrop.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  });
})();