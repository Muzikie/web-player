const copyToClipboard = (text: string, successCallBack?: () => void) => {
  // fallback for old browsers
  if (!navigator.clipboard) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('value', text);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
    successCallBack && successCallBack();
    return true;
  }
  navigator.clipboard.writeText(text).then(() => {
    successCallBack && successCallBack();
  })
}

export default copyToClipboard;
