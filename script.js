const rateRules = [

  //{ min: 10000, rate: 3.015 },
  { min: 80000, rate: 2.955 },
  { min: 70000, rate: 2.950 },
  { min: 60000, rate: 2.945 },
  { min: 50000, rate: 2.940 },
  { min: 40000, rate: 2.935 },
  { min: 35000, rate: 2.933 },
  { min: 30000, rate: 2.930 },
  { min: 25000, rate: 2.927 },
  { min: 20000, rate: 2.925 },
  { min: 15000, rate: 2.923 },
  { min: 10000, rate: 2.920 },
  { min: 9000, rate: 2.915 },
  { min: 8000, rate: 2.910 },
  { min: 7000, rate: 2.905 },
  { min: 6000, rate: 2.900 },
  { min: 5000, rate: 2.895 },
  { min: 4000, rate: 2.890 },
  { min: 3000, rate: 2.885 },
  { min: 2500, rate: 2.883 },
  { min: 2000, rate: 2.880 },
  { min: 1500, rate: 2.877 },
  { min: 1000, rate: 2.875 },
  { min: 500,  rate: 2.870 },
  //{ min: 400,  rate: 2.937 },
  //{ min: 350,  rate: 2.936 },
  //{ min: 200,  rate: 2.935 },
  //{ min: 150,  rate: 2.930 }
];




function showPopup(msg){
  const popup = document.getElementById("popup");
  const backdrop = document.getElementById("modal-backdrop");
  document.getElementById("popup-message").textContent = msg;

  backdrop.style.display = "flex";
  setTimeout(() => popup.classList.add("show"), 10);
  document.getElementById("popup-close").onclick = hidePopup;

  setTimeout(hidePopup, 3000);
}

function hidePopup(){
  const popup = document.getElementById("popup");
  const backdrop = document.getElementById("modal-backdrop");

  popup.classList.remove("show");
  setTimeout(() => { backdrop.style.display = "none"; }, 300);
}

function addInput(){
  const container = document.getElementById("inputs-container");
  const div = document.createElement("div");
  div.className = "draggable-item";
  div.innerHTML = `<input type="number" class="amount-input" placeholder="輸入金額 (100~50000)">`;
  container.appendChild(div);
  enableDragAndDrop();
}

function calculateCoins(amount){
  if(isNaN(amount) || amount<150 || amount>50000){
    showPopup("其他金額請私信");
    return null;
  }
  let rate=1;
  for(let rule of rateRules){
    if(amount>=rule.min){ rate=rule.rate; break; }
  }
  return { amount, rate, coins:(amount*rate).toFixed(2) };
}

function calculate(){
  const inputs = document.querySelectorAll(".amount-input");
  const results=[];
  inputs.forEach(input=>{
    const val = parseFloat(input.value.trim());
    const res = calculateCoins(val);
    if(res) results.push(res);
  });
  renderResults(results);
}

function renderResults(results){
  const container = document.getElementById("results");
  if(results.length===0){
    container.innerHTML="<p>請輸入金額並點擊計算</p>";
    return;
  }
  container.innerHTML = results.map(r=>`
    <div class="card">
      <strong>輸入金額：${r.amount} TWD</strong><br>
      <small>兌換比例：1 : ${r.rate}</small><br>
      <small>預計可獲得抖幣：${r.coins}</small>
    </div>
  `).join("");
}

function enableDragAndDrop(){
  const container = document.getElementById("inputs-container");
  let dragItem=null;
  const items = container.querySelectorAll(".draggable-item");
  items.forEach(item=>{
    item.draggable=true;
    item.ondragstart = e=>{ dragItem=item; setTimeout(()=>item.style.display='none',0); };
    item.ondragend = e=>{ dragItem=null; item.style.display='flex'; };
    item.ondragover = e=>e.preventDefault();
    item.ondrop = e=>{
      e.preventDefault();
      if(dragItem && dragItem!==item){
        const children=Array.from(container.children);
        const dragIndex=children.indexOf(dragItem);
        const dropIndex=children.indexOf(item);
        if(dragIndex<dropIndex) container.insertBefore(dragItem,item.nextSibling);
        else container.insertBefore(dragItem,item);
      }
    };
  });
}

enableDragAndDrop();
