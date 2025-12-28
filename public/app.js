document.getElementById('convertBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput');
    const statusMessage = document.getElementById('statusMessage');
    const btn = document.getElementById('convertBtn');
    const loader = btn.querySelector('.loader');
    const btnText = btn.firstChild; // The "Download" text node

    const url = urlInput.value.trim();

    if (!url) {
        statusMessage.textContent = 'Mohon masukkan URL YouTube yang valid';
        statusMessage.className = 'status error';
        return;
    }

    // Reset UI
    statusMessage.textContent = '';
    statusMessage.className = 'status';
    btn.disabled = true;
    loader.classList.remove('hidden');

    // Simulate processing UI or simply redirect
    try {
        // We trigger the download by setting window.location or opening in new tab
        // However, for a better UX, let's verify if the server accepts it first, 
        // but since we want to trigger a download, a simple GET request via window.location.href 
        // is the easiest way to handle the "Content-Disposition: attachment".
        // BUT, we might want to check validity first to show error in UI.

        // We will do a direct change of location triggers download if headers are right.

        statusMessage.textContent = 'Memulai pengunduhan...';
        statusMessage.className = 'status success';

        // Construct the download URL
        const downloadUrl = `/convert?url=${encodeURIComponent(url)}`;

        // Create a hidden iframe or link to trigger download so we don't navigate away
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button after a short delay
        setTimeout(() => {
            btn.disabled = false;
            loader.classList.add('hidden');
            statusMessage.textContent = 'Pengunduhan dimulai!';
        }, 2000);

    } catch (err) {
        console.error(err);
        statusMessage.textContent = 'Terjadi kesalahan';
        statusMessage.className = 'status error';
        btn.disabled = false;
        loader.classList.add('hidden');
    }
});
