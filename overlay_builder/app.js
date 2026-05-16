
const cells = document.querySelectorAll('.cell');
let selected = [];

cells.forEach(cell=>{
  cell.addEventListener('click',()=>{
    const id = cell.dataset.id;

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
    cell.innerText = type;
  });
}

function hideSelected(){
  selected.forEach(id=>{
    const cell = document.querySelector(`[data-id="${id}"]`);
    cell.classList.add('hidden');
  });
  clearSelection();
}

function mergeSelected(){
  if(selected.length < 2){
    alert('2つ以上選択して！');
    return;
  }

  const first = document.querySelector(`[data-id="${selected[0]}"]`);

  first.style.gridColumn = "span " + Math.min(selected.length,3);
  first.innerText += " (結合)";

  selected.slice(1).forEach(id=>{
    const cell = document.querySelector(`[data-id="${id}"]`);
    cell.classList.add('hidden');
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
