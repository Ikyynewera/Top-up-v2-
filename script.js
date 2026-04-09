// ================================
// TOP UP CENTER - IKYYY SCRIPT V3
// ================================

// ====== DATA PAKET ======
const ffDiscount = [
  {price: 5000, dm: "150 DM"},
  {price: 10000, dm: "250 DM"},
  {price: 22000, dm: "340 DM"},
  {price: 34000, dm: "480 DM"},
  {price: 50000, dm: "890 DM"},
  {price: 55000, dm: "900 DM"},
];

const ffNormal = [
  {price: 7000, dm: "150 DM"},
  {price: 15000, dm: "250 DM"},
  {price: 25000, dm: "340 DM"},
  {price: 50000, dm: "480 DM"},
  {price: 70000, dm: "950 DM"},
];

const mlbbNormal = [
  {price: 3000, dm: "12 DM"},
  {price: 5000, dm: "22 DM"},
  {price: 10000, dm: "32 DM"},
  {price: 14000, dm: "45 DM"},
  {price: 19000, dm: "55 DM"},
  {price: 22000, dm: "67 DM"},
  {price: 26000, dm: "69 DM"},
  {price: 32000, dm: "73 DM"},
  {price: 35000, dm: "76 DM"},
  {price: 45000, dm: "90 DM"},
  {price: 55000, dm: "150 DM"},
  {price: 67000, dm: "210 DM"},
  {price: 78000, dm: "230 DM"},
  {price: 89000, dm: "240 DM"},
  {price: 95000, dm: "290 DM"},
  {price: 100000, dm: "350 DM"},
  {price: 23000, wdp: "1x WDP"},
  {price: 39000, wdp: "2x WDP"},
  {price: 57000, wdp: "3x WDP"},
  {price: 78000, wdp: "4x WDP"},
  {price: 87000, wdp: "5x WDP"},
];

const robloxNormal = [
  {price: 5000, dm: "2k"},
  {price: 15000, dm: "3k"},
  {price: 39000, dm: "5k"},
  {price: 87000, dm: "12k"},
  {price: 100000, dm: "22k"},
  {price: 120000, dm: "25k"},
  {price: 150000, dm: "39k"},
  {price: 250000, dm: "50k"},
  {price: 567000, dm: "190k"},
  {price: 980000, dm: "230k"},
  {price: 1200000, dm: "450k"},
  {price: 1555000, dm: "555k"},
  {price: 2055000, dm: "678k"},
  {price: 1150000, dm: "1jt 150rb"},
];

const pubgNormal = [
  {price: 12000, dm: "60 UC"},
  {price: 22000, dm: "120 UC"},
  {price: 45000, dm: "135 UC"},
  {price: 50000, dm: "137 UC"},
  {price: 76000, dm: "145 UC"},
  {price: 90000, dm: "170 UC"},
  {price: 110000, dm: "200 UC"},
  {price: 135000, dm: "230 UC"},
  {price: 155000, dm: "289 UC"},
  {price: 199000, dm: "300 UC"},
  {price: 200000, dm: "312 UC"},
  {price: 235000, dm: "345 UC"},
  {price: 290000, dm: "389 UC"},
  {price: 345000, dm: "455 UC"},
  {price: 459000, dm: "555 UC"},
  {price: 500000, dm: "578 UC"},
  {price: 690000, dm: "789 UC"},
  {price: 890000, dm: "980 UC"},
  {price: 1700000, dm: "1200 UC"},
];

const paymentMethods = ["DANA","GOPAY","OVO","SHOPEEPAY","PULSA"];

// ====== STATE ======
let currentGame = null;
let mode = "discount";
let selectedPack = null;
let selectedMethod = null;

let saldo = 0;
let history = [];

// ====== FORMAT RUPIAH ======
function rupiah(num){
  return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ====== LOAD DATA ======
function loadData(){
  saldo = parseInt(localStorage.getItem("ikyyySaldo")) || 0;
  history = JSON.parse(localStorage.getItem("ikyyyHistory")) || [];
  updateSaldoUI();
  updateHistoryUI();
}

function saveData(){
  localStorage.setItem("ikyyySaldo", saldo);
  localStorage.setItem("ikyyyHistory", JSON.stringify(history));
}

// ===== SOUND CLICK =====
function playClickSound(){
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = "triangle";
    o.frequency.setValueAtTime(700, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    o.connect(g);
    g.connect(ctx.destination);

    o.start();
    o.stop(ctx.currentTime + 0.12);
  }catch(e){}
}

// ===== SOUND MONEY =====
function playMoneyNotif(){
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const o1 = ctx.createOscillator();
    const g1 = ctx.createGain();

    o1.type = "sine";
    o1.frequency.setValueAtTime(880, ctx.currentTime);
    o1.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);

    g1.gain.setValueAtTime(0.001, ctx.currentTime);
    g1.gain.exponentialRampToValueAtTime(0.55, ctx.currentTime + 0.03);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    o1.connect(g1);
    g1.connect(ctx.destination);

    o1.start();
    o1.stop(ctx.currentTime + 0.25);
  }catch(e){}
}

// ===== SALDO UI =====
function updateSaldoUI(){
  document.getElementById("saldoText").innerText = "Saldo Anda: " + rupiah(saldo);
}

// ===== TAMBAH SALDO =====
function tambahSaldo(){
  playClickSound();
  let input = prompt("Masukkan jumlah saldo (contoh: 150000):");
  if(!input) return;

  let jumlah = parseInt(input);
  if(isNaN(jumlah) || jumlah <= 0){
    alert("Saldo tidak valid!");
    return;
  }

  saldo += jumlah;
  saveData();
  updateSaldoUI();
}

// ===== POPUP =====
function openPopup(){
  document.getElementById("popupBg").style.display = "flex";
}

function closePopup(){
  document.getElementById("popupBg").style.display = "none";
}

// ===== BACK HOME =====
function backToHome(){
  playClickSound();
  currentGame = null;
  selectedPack = null;
  selectedMethod = null;

  document.getElementById("playerId").value = "";
  document.getElementById("idStatus").innerText = "ID: Belum diisi";

  document.getElementById("gameSelect").style.display = "grid";
  document.getElementById("idBox").style.display = "none";
  document.getElementById("tabsBox").style.display = "none";
  document.getElementById("packGrid").style.display = "none";
  document.getElementById("methodBox").style.display = "none";
  document.getElementById("paymentBar").style.display = "none";
  document.getElementById("historyBox").style.display = "none";

  document.getElementById("bannerTitle").innerText = "BERANDA";
  document.getElementById("bannerText").innerText = "Pilih game yang ingin Anda top up.";

  document.getElementById("btnBackHome").style.display = "none";
  document.getElementById("robloxInfo").style.display = "none";

  document.getElementById("btnPay").disabled = true;
  updateSelectedInfo();
}

// ===== OPEN GAME =====
function openGame(game){
  playClickSound();

  currentGame = game;
  selectedPack = null;
  selectedMethod = null;

  document.getElementById("btnBackHome").style.display = "block";
  document.getElementById("gameSelect").style.display = "none";
  document.getElementById("idBox").style.display = "block";
  document.getElementById("packGrid").style.display = "grid";
  document.getElementById("methodBox").style.display = "block";
  document.getElementById("paymentBar").style.display = "flex";
  document.getElementById("historyBox").style.display = "block";

  document.getElementById("robloxInfo").style.display = "none";

  if(game === "ff"){
    document.getElementById("bannerTitle").innerHTML = "<span class='ff'>FREE FIRE - IKYYY</span>";
    document.getElementById("tabsBox").style.display = "flex";
    mode = "discount";
    document.getElementById("playerId").placeholder = "Masukkan ID Anda";
  }

  if(game === "mlbb"){
    document.getElementById("bannerTitle").innerHTML = "<span class='mlbb'>MLBB - IKYYY</span>";
    document.getElementById("tabsBox").style.display = "none";
    mode = "normal";
    document.getElementById("playerId").placeholder = "Masukkan ID Anda";
  }

  if(game === "roblox"){
    document.getElementById("bannerTitle").innerHTML = "<span class='roblox'>ROBLOX - IKYYY</span>";
    document.getElementById("tabsBox").style.display = "none";
    mode = "normal";
    document.getElementById("playerId").placeholder = "MASUKAN NICNAME ANDA";
    document.getElementById("robloxInfo").style.display = "block";
  }

  if(game === "pubg"){
    document.getElementById("bannerTitle").innerHTML = "<span class='pubg'>PUBG MOBILE - IKYYY</span>";
    document.getElementById("tabsBox").style.display = "none";
    mode = "normal";
    document.getElementById("playerId").placeholder = "Masukkan ID Anda";
  }

  renderPacks();
  renderMethods();
  updateSelectedInfo();
}

// ===== RENDER PACKS =====
function renderPacks(){
  const grid = document.getElementById("packGrid");
  grid.innerHTML = "";

  let packs = [];
  if(currentGame === "ff") packs = (mode === "discount") ? ffDiscount : ffNormal;
  if(currentGame === "mlbb") packs = mlbbNormal;
  if(currentGame === "roblox") packs = robloxNormal;
  if(currentGame === "pubg") packs = pubgNormal;

  packs.forEach((p, i)=>{
    const card = document.createElement("div");
    card.className = "card";
    card.style.animation = "fadeIn 0.3s ease";

    let tagText = "NORMAL";
    if(currentGame === "ff" && mode === "discount") tagText = "DISCOUNT";
    if(currentGame === "pubg") tagText = "PUBG";
    if(currentGame === "roblox") tagText = "ROBLOX";

    let packName = p.wdp ? "Paket WDP" : "Paket Top Up";
    let packValue = p.wdp ? p.wdp : p.dm;

    card.innerHTML = `
      <div class="tag">${tagText}</div>
      <div class="pack-name">${packName}</div>
      <div class="pack-dm">${packValue}</div>
      <div class="pack-price">${rupiah(p.price)}</div>
      <button class="btn" onclick="selectPack(${i})">PILIH</button>
    `;

    grid.appendChild(card);
  });
}

// ===== METHODS =====
function renderMethods(){
  const box = document.getElementById("methods");
  box.innerHTML = "";

  paymentMethods.forEach(m=>{
    const div = document.createElement("div");
    div.className = "method";
    div.innerText = m;

    div.onclick = ()=>{
      playClickSound();
      selectedMethod = m;
      document.querySelectorAll(".method").forEach(el=>el.classList.remove("active"));
      div.classList.add("active");
      updateSelectedInfo();
    };

    box.appendChild(div);
  });
}

// ===== SWITCH TAB FF =====
function switchTab(newMode){
  playClickSound();
  mode = newMode;
  selectedPack = null;

  document.getElementById("tabDiscount").classList.remove("active");
  document.getElementById("tabNormal").classList.remove("active");

  if(mode === "discount") document.getElementById("tabDiscount").classList.add("active");
  if(mode === "normal") document.getElementById("tabNormal").classList.add("active");

  renderPacks();
  updateSelectedInfo();
}

// ===== SELECT PACK =====
function selectPack(index){
  playClickSound();

  let packs = [];
  if(currentGame === "ff") packs = (mode === "discount") ? ffDiscount : ffNormal;
  if(currentGame === "mlbb") packs = mlbbNormal;
  if(currentGame === "roblox") packs = robloxNormal;
  if(currentGame === "pubg") packs = pubgNormal;

  selectedPack = packs[index];
  updateSelectedInfo();
}

// ===== UPDATE INFO =====
function updateSelectedInfo(){
  const info = document.getElementById("selectedInfo");
  const btnPay = document.getElementById("btnPay");
  const idValue = document.getElementById("playerId").value.trim();

  if(!selectedPack){
    info.innerHTML = `Paket: <b>Belum dipilih</b><br>Metode: <b>${selectedMethod || "-"}</b><br>Total: <b>-</b>`;
    btnPay.disabled = true;
    return;
  }

  let paketText = selectedPack.wdp ? selectedPack.wdp : selectedPack.dm;

  info.innerHTML = `
    Paket: <b>${paketText}</b><br>
    Metode: <b>${selectedMethod || "-"}</b><br>
    Total: <b>${rupiah(selectedPack.price)}</b>
  `;

  btnPay.disabled = !(idValue.length >= 3 && selectedPack && selectedMethod);
}

// ===== PAY NOW =====
function payNow(){
  playClickSound();

  const idValue = document.getElementById("playerId").value.trim();

  if(idValue.length < 3){
    alert("Isi ID / Nicname dulu!");
    return;
  }

  if(currentGame === "pubg" && isNaN(idValue)){
    alert("ID PUBG harus angka!");
    return;
  }

  if(!selectedPack){
    alert("Pilih paket dulu!");
    return;
  }

  if(!selectedMethod){
    alert("Pilih metode pembayaran dulu!");
    return;
  }

  if(saldo < selectedPack.price){
    alert("Saldo anda tidak cukup!");
    return;
  }

  openPopup();

  document.getElementById("popupTitle").innerText = "Memproses Pembayaran...";
  document.getElementById("popupText").innerText = "Menghubungkan metode pembayaran " + selectedMethod + "...";
  document.getElementById("loadingAnim").style.display = "block";
  document.getElementById("successIcon").style.display = "none";
  document.getElementById("btnClose").style.display = "none";

  setTimeout(()=>{
    document.getElementById("popupText").innerText = "Memverifikasi akun...";
  }, 1200);

  setTimeout(()=>{
    document.getElementById("popupText").innerText = "Mengirim item top up...";
  }, 2400);

  setTimeout(()=>{
    saldo -= selectedPack.price;
    saveData();
    updateSaldoUI();

    const now = new Date();
    const timeStr = now.toLocaleString("id-ID");

    history.push({
      game: currentGame.toUpperCase() + " - IKYYY",
      id: idValue,
      paket: selectedPack.wdp ? selectedPack.wdp : selectedPack.dm,
      price: selectedPack.price,
      method: selectedMethod,
      time: timeStr
    });

    saveData();
    updateHistoryUI();

    document.getElementById("loadingAnim").style.display = "none";
    document.getElementById("successIcon").style.display = "block";
    document.getElementById("popupTitle").innerText = "Top Up Berhasil!";
    document.getElementById("popupText").innerText =
      `Top up berhasil!\n${selectedPack.wdp ? selectedPack.wdp : selectedPack.dm}\nKe akun: ${idValue}\nMetode: ${selectedMethod}`;

    document.getElementById("btnClose").style.display = "block";
    playMoneyNotif();
  }, 3800);
}

// ===== HISTORY UI =====
function updateHistoryUI(){
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  if(history.length === 0){
    historyList.innerHTML = `<div style="opacity:0.6;">Belum ada transaksi.</div>`;
    return;
  }

  history.slice().reverse().forEach(item=>{
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <b>${item.game}</b><br>
      ID/Nicname: ${item.id}<br>
      Paket: ${item.paket}<br>
      ${rupiah(item.price)} | Metode: <b>${item.method}</b><br>
      <span style="opacity:0.7;">${item.time}</span>
    `;

    historyList.appendChild(div);
  });
}

// ===== EVENTS =====
document.getElementById("ffCard").onclick = ()=>openGame("ff");
document.getElementById("mlbbCard").onclick = ()=>openGame("mlbb");
document.getElementById("robloxCard").onclick = ()=>openGame("roblox");
document.getElementById("pubgCard").onclick = ()=>openGame("pubg");

document.getElementById("btnBackHome").onclick = backToHome;

document.getElementById("tabDiscount").onclick = ()=>switchTab("discount");
document.getElementById("tabNormal").onclick = ()=>switchTab("normal");

document.getElementById("btnPay").onclick = payNow;

document.getElementById("btnClose").onclick = closePopup;

// ===== ID INPUT =====
document.getElementById("playerId").addEventListener("input", ()=>{
  const idValue = document.getElementById("playerId").value.trim();
  const status = document.getElementById("idStatus");

  if(idValue.length < 3){
    status.innerText = "ID: Belum valid";
    status.style.color = "white";
  }else{
    status.innerText = "ID: " + idValue;
    status.style.color = "#00ffff";
  }

  updateSelectedInfo();
});

// ===== SEARCH FILTER =====
document.getElementById("searchBox").addEventListener("input", ()=>{
  const q = document.getElementById("searchBox").value.toLowerCase();
  const cards = document.querySelectorAll(".game-card");

  cards.forEach(card=>{
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? "block" : "none";
  });
});

// ===== START =====
loadData();
