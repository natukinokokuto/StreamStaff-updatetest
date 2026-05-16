
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
  const type = document.getElementById('contentSelect').value;

  selected.forEach(id=>{
    const el = document.querySelector(`[data-id="${id}"]`);
    if(el){
      el.innerText = type;
    }
  });

  clearSelection();
}

function mergeCells(){
  if(selected.length < 2){
    alert('2セル以上選択！');
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

  const sameRow =
    Math.floor((arr[0]-1)/3) === Math.floor((arr[arr.length-1]-1)/3);

  const sameCol =
    ((arr[0]-1)%3) === ((arr[arr.length-1]-1)%3);

  if(sameRow){
    first.style.gridColumn = `span ${Math.min(arr.length,3)}`;
  }

  if(sameCol){
    first.style.gridRow = `span ${Math.min(arr.length,3)}`;
  }

  if(arr.length === 9){
    first.style.gridColumn = 'span 3';
    first.style.gridRow = 'span 3';
  }

  arr.slice(1).forEach(id=>{
    const el = document.querySelector(`[data-id="${id}"]`);
    if(el){
      el.classList.add('hidden');
    }
  });

  first.innerText += ' (結合)';
  clearSelection();
}

function hideCells(){
  selected.forEach(id=>{
    const el = document.querySelector(`[data-id="${id}"]`);
    if(el){
      el.classList.add('hidden');
    }
  });

  clearSelection();
}

function resetGrid(){
  location.reload();
}

function clearSelection(){
  selected = [];
  cells.forEach(c=>c.classList.remove('selected'));
}
