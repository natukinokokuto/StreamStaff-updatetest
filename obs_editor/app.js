
const cells = document.querySelectorAll('.cell');
let selected = [];

cells.forEach(cell=>{
  cell.addEventListener('click',()=>{
    const id = Number(cell.dataset.id);

    if(selected.includes(id)){
      selected = selected.filter(v=>v!==id);
      cell.classList.remove('selected');
    }else{
      selected.push(id);
      cell.classList.add('selected');
    }
  });
});

function applyContent(){
  const type = document.getElementById('contentType').value;

  selected.forEach(id=>{
    const cell = document.querySelector(`[data-id="${id}"]`);
    if(cell){
      cell.innerText = type;
    }
  });

  clearSelect();
}

function hideCells(){
  selected.forEach(id=>{
    const cell = document.querySelector(`[data-id="${id}"]`);
    if(cell){
      cell.classList.add('hidden');
    }
  });

  clearSelect();
}

function mergeCells(){
  if(selected.length < 2){
    alert('2セル以上選択して！');
    return;
  }

  applyMerge(selected);
}

function mergePreset(arr){
  applyMerge(arr);
}

function applyMerge(arr){
  const first = document.querySelector(`[data-id="${arr[0]}"]`);

  if(!first) return;

  // 横結合
  const sameRow =
    Math.floor((arr[0]-1)/3) === Math.floor((arr[arr.length-1]-1)/3);

  // 縦結合
  const sameCol =
    ((arr[0]-1)%3) === ((arr[arr.length-1]-1)%3);

  if(sameRow){
    first.style.gridColumn = `span ${arr.length}`;
  }

  if(sameCol){
    first.style.gridRow = `span ${arr.length}`;
  }

  if(arr.length === 9){
    first.style.gridColumn = 'span 3';
    first.style.gridRow = 'span 3';
  }

  arr.slice(1).forEach(id=>{
    const cell = document.querySelector(`[data-id="${id}"]`);
    if(cell){
      cell.classList.add('hidden');
    }
  });

  first.innerText += " (結合)";
  clearSelect();
}

function resetLayout(){
  location.reload();
}

function clearSelect(){
  selected = [];
  cells.forEach(c=>c.classList.remove('selected'));
}
