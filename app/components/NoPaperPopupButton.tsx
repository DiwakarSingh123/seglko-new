'use client'
import { useEffect } from 'react'

export default function NoPaperPopupButton() {
  const openPopup = () => {
    const widget = (window as any).npfWidgetInstance
    if (widget && typeof widget.showPopup === 'function') {
      widget.showPopup('c4686ca3db50effadb9f24fc7ca22401', 'widgets.in8.nopaperforms.com')
      return
    }
    const btn = document.querySelector(
      '.npfWidgetButton.npfWidget-c4686ca3db50effadb9f24fc7ca22401'
    ) as HTMLButtonElement | null
    if (btn) btn.click()
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://in8cdn.npfs.co/js/widget/npfwpopup.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const initScript = document.createElement('script')
      initScript.innerHTML = `
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
      `
      document.body.appendChild(initScript)
      console.log('NoPaper widget script loaded and init appended')

      setTimeout(() => {
        console.log('Attempting to open NoPaper popup (auto)')
        openPopup()
      }, 2000)
    }

    script.onerror = () => {
      console.error('NoPaper popup script failed to load')
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <button
      type="button"
      className="npfWidgetButton npfWidget-c4686ca3db50effadb9f24fc7ca22401"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('Enquire button clicked — preventing default and attempting widget open')
        openPopup()
      }}
      onPointerDownCapture={(e: any) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('PointerDownCapture — attempting widget open before other handlers')
        openPopup()
      }}
      onMouseDownCapture={(e: any) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('MouseDownCapture — attempting widget open before other handlers')
        openPopup()
      }}
      style={{
        position: 'fixed',
        right: '-60px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        cursor: 'pointer',
        backgroundColor: '#dc2626',
        color: '#fff',
        padding: '0.6rem 2rem',
        borderRadius: '0.375rem 0.375rem 0 0.375rem',
        boxShadow:
          '0 10px 15px -3px rgba(220, 38, 38, 0.5), 0 4px 6px -2px rgba(220, 38, 38, 0.25)',
        transition: 'background-color 0.3s ease',
        zIndex: 50,
      }}
    >
      Enquire Now!
    </button>
  )
}
