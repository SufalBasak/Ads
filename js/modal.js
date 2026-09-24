/**
 * Video Lightbox & Accessible Modal Controller
 */

function openVideoModal(videoUrl, title = "Product Walkthrough") {
  let modalBackdrop = document.getElementById("video-lightbox-modal");

  if (!modalBackdrop) {
    modalBackdrop = document.createElement("div");
    modalBackdrop.id = "video-lightbox-modal";
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.innerHTML = `
      <div class="modal-card" style="max-width: 800px; padding: 1.5rem; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 id="video-modal-title" style="margin: 0; font-size: 1.25rem;">${title}</h3>
          <button onclick="closeVideoModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--radius-md); background: #000;">
          <iframe id="video-modal-iframe" src="" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeVideoModal();
    });
  }

  const iframe = document.getElementById("video-modal-iframe");
  const titleEl = document.getElementById("video-modal-title");

  if (titleEl) titleEl.textContent = title;
  if (iframe) iframe.src = videoUrl.includes("autoplay") ? videoUrl : `${videoUrl}?autoplay=1`;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const modalBackdrop = document.getElementById("video-lightbox-modal");
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
    const iframe = document.getElementById("video-modal-iframe");
    if (iframe) iframe.src = "";
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeVideoModal();
    const successModal = document.getElementById("success-modal");
    if (successModal) successModal.classList.remove("active");
  }
});
