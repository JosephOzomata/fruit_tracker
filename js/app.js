let blockchain = new Blockchain(loadChain());

function createBatchUI() {
  const batchIdInput = document.getElementById("batchId").value;
  const fruitInput = document.getElementById("fruit").value;
  const originInput = document.getElementById("origin").value;

  if (!batchIdInput || !fruitInput || !originInput) {
    alert("All fields are required");
    return;
  }

  blockchain.addBlock(batchIdInput, "Farmer", {
    fruit: fruitInput,
    origin: originInput
  });

  saveChain(blockchain.chain);
  alert("Batch created successfully");
}


function updateBatchUI() {
  blockchain.addBlock(
    updateBatchId.value,
    role.value,
    { location: location.value, note: note.value }
  );
  saveChain(blockchain.chain);
  alert("Batch updated");
}

function searchBatch() {
  const searchId = document.getElementById("searchBatchId").value;
  const historyDiv = document.getElementById("history");

  historyDiv.innerHTML = "";

  const history = blockchain.chain.filter(b => b.batchId === searchId);

  if (history.length === 0) {
    historyDiv.innerHTML = "<p class='text-gray-500'>No records found.</p>";
    return;
  }

  history.forEach(b => {
    const div = document.createElement("div");
    div.className = "border-l-4 border-green-600 p-3 bg-gray-50 rounded";

    div.innerHTML = `
      <p><strong>Actor:</strong> ${b.actor}</p>
      <p><strong>Data:</strong> ${JSON.stringify(b.data)}</p>
      <p class="text-sm text-gray-500">${b.timestamp}</p>
    `;

    historyDiv.appendChild(div);
  });
}


function verifyChain() {
  const verifyResult = document.getElementById("verifyResult");

  verifyResult.textContent = blockchain.isValid()
    ? "✅ Blockchain is valid and untampered"
    : "❌ Blockchain integrity compromised";
}

