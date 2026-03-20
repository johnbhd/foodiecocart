let html5QrCode; // global so we can stop camera

function openScannerModal() {

  const modal = document.querySelector('.modal-con');

  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal">

      <div class="modal-title">
        <h2>Scan QR Code</h2>
      </div>

      <div class="modal-body">
        <div id="reader"></div>
      </div>

      <div class="modal-btn">
        <button id="close-scan">Cancel</button>
      </div>

    </div>
  `;
  startScanner()
}
function startScanner() {

  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" }, // back cam
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {

      console.log("Scanned:", decodedText);

      html5QrCode.stop().then(() => {

        document.querySelector('.modal-con').style.display = "none";


        window.location.href = decodedText;

      });

    },
    (error) => {
 
    }
  );
}

document.addEventListener("click", (e) => {
    const iconScanner = e.target.closest("#wallet-scannerIcon");
    const closeModal = e.target.closest("#close-scan");
    const modal = document.querySelector('.modal-con');

    if (iconScanner) {
        openScannerModal()
    }

    if (closeModal) {
        modal.style.display = "none"
    }
})