import { reviewPaymentOrders } from "../review-payment.js"

export function modalQrCode(cart, total, type) {
  const modal = document.querySelector('.modal-con');

    modal.innerHTML = `
    <div class="modal">
        <div class="modal-title">
            <h2>Scan QR CODE</h2>
        </div>
        <div class="modal-body">
            <div class="modal-qr">
                <canvas id="qr"></canvas>
                <div class="qr-logo">
                    <img src="../imgs/aulogo.png" >
                </div>
            </div><br>
            <div class="modal-btn">
                <button id="modal-option">Choose other option</button>
            </div>
        </div>


    </div> 
    `
    const closeBtn = document.getElementById("modal-option");
    QRCode.toCanvas(
        document.getElementById("qr"),
        "Hello World",
          {
                width: 160,  
                margin: 2    
            }
    );
    closeBtn.addEventListener("click", () => {
        reviewPaymentOrders(cart, total);
    });
}