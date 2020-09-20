
/**
 *    canvas 编辑操作
 */

let inputEdit = null;

const createInput = obj => {
  let editInput = document.createElement('input')
  for(let i in obj) {
    editInput.setAttribute(i, obj[i])
  };
  document.body.appendChild(editInput)
  inputEdit = editInput
  return editInput;
}

export const hideEdit = status => {
  if(inputEdit) {
    !status && inputEdit.classList.add('plot-input-hide');
    status && inputEdit.classList.remove('plot-input-hide')
  }
}

// 输入框回车事件
export const handlerEnter = fun => {
  hideEdit(false)
  inputEdit.value = ""
}


export default createInput








