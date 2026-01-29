let words = [];
let current = null;

function hideAll() {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
}

function showMenu() {
  hideAll();
  document.getElementById("menu").style.display = "block";
}

function showAdd() {
  hideAll();
  document.getElementById("add").style.display = "block";
  renderList();
}

function showLesson() {
  if (words.length === 0) {
    alert("単語を追加してください");
    return;
  }
  hideAll();
  document.getElementById("lesson").style.display = "block";
  next();
}

function addWord() {
  const jp = document.getElementById("jp").value;
  const en = document.getElementById("en").value;
  if (!jp || !en) return;

  words.push({ jp, en });
  document.getElementById("jp").value = "";
  document.getElementById("en").value = "";
  renderList();
}

function renderList() {
  const ul = document.getElementById("wordList");
  ul.innerHTML = "";
  words.forEach((w, i) => {
    const li = document.createElement("li");
    li.textContent = `${w.jp} → ${w.en}`;
    const btn = document.createElement("button");
    btn.textContent = "削除";
    btn.onclick = () => {
      words.splice(i, 1);
      renderList();
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function next() {
  current = words[Math.floor(Math.random() * words.length)];
  document.getElementById("question").textContent = current.jp;
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

function check() {
  const user = document.getElementById("answer").value.trim();
  document.getElementById("result").textContent =
    user.toLowerCase() === current.en.toLowerCase()
      ? "⭕ 正解！"
      : `❌ 不正解… 正解は「${current.en}」`;
}

showMenu();
