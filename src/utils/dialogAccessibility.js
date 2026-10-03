export const focusableSelector = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

export const makeOutsideContentInert = (dialog) => {
  if (!dialog) return () => {};
  const changedElements = [];
  let activeBranch = dialog;
  while (activeBranch && activeBranch !== document.body) {
    const parent = activeBranch.parentElement;
    if (!parent) break;
    for (const sibling of Array.from(parent.children)) {
      if (sibling === activeBranch || !(sibling instanceof HTMLElement)) continue;
      changedElements.push({ element: sibling, hadInert: sibling.hasAttribute('inert'), ariaHidden: sibling.getAttribute('aria-hidden') });
      sibling.setAttribute('inert', '');
      sibling.setAttribute('aria-hidden', 'true');
    }
    activeBranch = parent;
  }
  return () => {
    changedElements.reverse().forEach(({ element, hadInert, ariaHidden }) => {
      if (!element.isConnected) return;
      if (!hadInert) element.removeAttribute('inert');
      if (ariaHidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', ariaHidden);
    });
  };
};
