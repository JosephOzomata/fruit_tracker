function saveChain(chain) {
  localStorage.setItem("fruitChain", JSON.stringify(chain));
}

function loadChain() {
  const data = localStorage.getItem("fruitChain");
  return data ? JSON.parse(data) : null;
}
