// const HIDDEN_STYLE = `
//   height:0 !important;
//   visibility:hidden !important;
//   overflow:hidden !important;
//   position:absolute !important;
//   z-index:-1000 !important;
//   top:0 !important;
//   right:0 !important
// `;

// const CONTEXT_STYLE = [
//   'letter-spacing',
//   'line-height',
//   'padding-top',
//   'padding-bottom',
//   'font-family',
//   'font-weight',
//   'font-size',
//   'text-rendering',
//   'text-transform',
//   'width',
//   'text-indent',
//   'padding-left',
//   'padding-right',
//   'border-width',
//   'box-sizing'
// ];
// 获取node剩余空间
function getNodeleftPlace(targetElement) {
    const style = window.getComputedStyle(targetElement);

    const boxSizing = style.getPropertyValue('box-sizing');

  const paddingTopBottomSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  );

  const paddingLeftRightSize = (
      parseFloat(style.getPropertyValue('padding-left')) +
    parseFloat(style.getPropertyValue('padding-right'))
  )

  const borderTopBottomSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );

  const borderLeftRightSize = (
    parseFloat(style.getPropertyValue('border-left-width')) +
    parseFloat(style.getPropertyValue('border-right-width'))
  )

  const scrollWidth = targetElement.scrollWidth
  const scrollHeight = targetElement.scrollHeight

  console.log('scrollWidth', scrollWidth)
  let contentWidth, contentHeight

  if(boxSizing === 'border-box') {
    contentWidth = scrollWidth + borderLeftRightSize
    contentHeight = scrollHeight + borderTopBottomSize
  } else if(boxSizing === 'content-box') {
    contentWidth = scrollWidth - paddingLeftRightSize
    contentHeight = scrollHeight - paddingTopBottomSize
  }

//   const contextStyle = CONTEXT_STYLE
//     .map(name => `${name}:${style.getPropertyValue(name)}`)
//     .join(';');
  return { contentWidth, contentHeight };
}

export default function(targetElemnt) {
    const parentNode = targetElemnt.parentNode
    console.log(parentNode)
    return getNodeleftPlace(parentNode) 
}