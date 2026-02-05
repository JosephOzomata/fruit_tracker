let blockchain = new Blockchain(loadChain());

async function createBatchUI() {
  const batchIdInput = document.getElementById("batchId").value;
  const fruitInput = document.getElementById("fruit").value;
  const originInput = document.getElementById("origin").value;

  if (!batchIdInput || !fruitInput || !originInput) {
    alert("All fields are required");
    return;
  }

  await blockchain.addBlock(batchIdInput, "Farmer", {
    fruit: fruitInput,
    origin: originInput
  });

  saveChain(blockchain.chain);
  alert("Batch created successfully");
}

async function updateBatchUI() {
  await blockchain.addBlock(
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
      <p><strong>Hash:</strong> ${b.hash}</p>
      <p><strong>Previous Hash:</strong> ${b.previousHash}</p>
      <p class="text-sm text-gray-500">Time Stamp: ${b.timestamp}</p>
    `;

    historyDiv.appendChild(div);
  });
}

async function verifyChain() {
  const verifyResult = document.getElementById("verifyResult");

  const isValid = await blockchain.isValid();
  verifyResult.textContent = isValid
    ? "✅ Blockchain is valid and untampered"
    : "❌ Blockchain integrity compromised";
}
