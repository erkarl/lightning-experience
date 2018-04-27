const ATTRS_TO_SCAN = ['href', 'textContent'];

export const filterMutation = (mutation) => {
  return ATTRS_TO_SCAN
    .map((attr) => {
      return mutation.target[attr] || '';
    })
    .filter(targetAttr => targetAttr);
};

