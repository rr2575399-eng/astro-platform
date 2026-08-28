export function buildReportHtml(title: string, customerName: string, reportText: string, orderNumber: string) {
  const escape = (s: string) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]!));
  const body = escape(reportText).replace(/\n/g, "<br/>");
  return `<!doctype html><html lang="ta"><head><meta charset="utf-8"><title>${escape(title)}</title><style>body{font-family:"Noto Sans Tamil",Arial,sans-serif;max-width:800px;margin:40px auto;line-height:1.7;color:#14113a}h1{font-family:serif}footer{margin-top:40px;font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:12px}</style></head><body><h1>${escape(title)}</h1><p><b>வாடிக்கையாளர்:</b> ${escape(customerName)}</p><p><b>Order ID:</b> ${escape(orderNumber)}</p><hr/><div>${body}</div><footer>ஜோதிடம் பாரம்பரிய விளக்க முறையாகும்; இது அறிவியல் உறுதி அல்லது மருத்துவ/சட்ட/நிதி உத்தரவாதம் அல்ல.</footer></body></html>`;
}
