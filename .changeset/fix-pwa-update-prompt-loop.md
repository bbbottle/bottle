---
"@bbki.ng/site": patch
---

Fix PWA update prompt infinite toast loop and improve user experience

- Fixed infinite toast notifications when service worker update is available
- Added cancel button to allow users to dismiss the update prompt
- Used useRef to track toast display state and prevent multiple prompts
- Changed updateServiceWorker call to automatically reload the page on update
