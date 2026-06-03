import { useEffect } from 'react';

export default function NoPaperPopup() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://in8cdn.npfs.co/js/widget/npfwpopup.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const init = document.createElement('script');
      init.innerHTML = `
        window.npfWidgetInstance = new NpfWidgetsInit({
          widgetId: "c4686ca3db50effadb9f24fc7ca22401",
          baseurl: "widgets.in8.nopaperforms.com",
          formTitle: "Enquiry Form",
          titleColor: "#FF0033",
          backgroundColor: "#ddd",
          iframeHeight: "500px",
          buttonbgColor: "#4c79dc",
          buttonTextColor: "#FFF",
        });
      `;
      document.body.appendChild(init);

      // Auto-open on page load after 2s
      setTimeout(() => {
        const npfBtn = document.querySelector('.npfWidgetButton.npfWidget-c4686ca3db50effadb9f24fc7ca22401');
        if (npfBtn) npfBtn.click();
      }, 2000);
    };

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    const npfBtn = document.querySelector('.npfWidgetButton.npfWidget-c4686ca3db50effadb9f24fc7ca22401');
    if (npfBtn) npfBtn.click();
  };

  return (
    <>
      {/* Hidden NoPaper trigger button */}
      <button
        type="button"
        className="npfWidgetButton npfWidget-c4686ca3db50effadb9f24fc7ca22401"
        style={{ display: 'none' }}
      />
      {/* Our visible fixed red button */}
      <button
        type="button"
        onClick={handleClick}
        className="enquire-now-btn"
      >
        Enquire Now!
      </button>
    </>
  );
}
