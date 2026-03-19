const modal = document.getElementById("receiptModal");
const receiptActions = document.getElementById("receipt-actions");

// open example
function openReceipt() {
    modal.style.display = "flex";
    receiptActions.style.display = "flex";
    
    receiptModal();
    renderReceiptActions();
}

function receiptModal() {
    modal.innerHTML = `
         <div class="receipt-box">

        <div class="receipt-header">
          <img src="../imgs/receipt.png" alt="">
          <div>
            <h3>AU FoodieCo</h3>
            <p>Arellano University</p>
            <p>Juan Sumulong Campus</p>
            <p>2600 Legarda St., Sampaloc, Manila</p>
          </div>
        </div>

        <div class="receipt-body">

          <p><b>Order #:</b> 123456</p>
          <p><b>Date:</b> 2026-03-19</p>
          <p><b>Payment:</b> GCash</p>

          <hr>

          <div class="receipt-items">

            <div class="receipt-row">
              <span>Burger</span>
              <span>₱50</span>
            </div>

            <div class="receipt-row">
              <span>Juice</span>
              <span>₱30</span>
            </div>

            <div class="receipt-row">
              <span>Fries</span>
              <span>₱40</span>
            </div>

          </div>

          <hr>

          <div class="receipt-total">
            <span>Total</span>
            <span>₱120</span>
          </div>

        </div>
      </div>
    
    `;
}

function renderReceiptActions() {
    receiptActions.innerHTML = `
        <button class="btn-pdf" id="btn-pdf">
            <i class="fa fa-file-pdf"></i> PDF
        </button>

        <button class="btn-jpg" id="btn-jpg">
            <i class="fa fa-image"></i> JPG
        </button>

        <button class="btn-close" id="closeReceipt">
            Close
        </button>
    `
}

document.addEventListener("click", (e) => {
    const receiptBtn = e.target.closest(".receipt-btn");
    const closeBtn = e.target.closest("#closeReceipt");
    
    if (receiptBtn) {
        openReceipt()
    }
    if (e.target === modal) {
        modal.style.display = "none";
        receiptActions.style.display = "none";
    }
    if (closeBtn) {
      modal.style.display = "none";
      receiptActions.style.display = "none";
    };
})
