const newMakeupItemForm = document.querySelector('form');

const updateMakeupList = (name, quantity) => {
  let body = {name, quantity}

  axios.put(`http://localhost:7777/api/makeupItems`, body)
    .then(res => {
      console.log(res.data)
      getMakeupItems()
    })
}

const deleteMakeupItem = (id) => {
    console.log(id)
  axios.delete(`http://localhost:7777/api/makeupItems/${id}`)
    .then(res => {
      console.log(res)
      getMakeupItems()
    })
}



const createNewMakeupItem = (makeupItems) => {
  let makeupItemsDisplay = document.getElementById('makeup-items-display')
  makeupItemsDisplay.innerHTML = ''

  makeupItems.forEach((makeupItem) => {
    let newMakeupItem = document.createElement('div')
    newMakeupItem.classList.add('makeupItem')

    newMakeupItem.innerHTML += `
    <p class="makeupItem-name">${makeupItem.name}</p>
    <p class="makeupItem-quantity">${makeupItem.quantity}</p>`

    const trashCan = document.createElement('img')
    trashCan.classList.add('trash-can')
    trashCan.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfj0ESRF5m3BX1vxPdgGe-bkYSepmrOD0uXdBGEsYRQw&usqp=CAU&ec=48665701')
    trashCan.setAttribute('alt', 'trash')

    trashCan.addEventListener('click', () => deleteMakeupItem(makeupItem.makeupitem_id))

    newMakeupItem.appendChild(trashCan)
    makeupItemsDisplay.appendChild(newMakeupItem)

    })
  }



const addMakeupItem = (event) => {
  event.preventDefault()

  const name = document.querySelector("#new-makeup-item-name")
  const quantity = document.querySelector("#new-makeup-item-quantity")

  const newMakeupItem = {name: name.value, quantity: +quantity.value}

  axios.post('http://localhost:7777/api/makeupItems', newMakeupItem)
    .then(res => {
      getMakeupItems()
      alert('Item added to cart!')
    })
}

newMakeupItemForm.addEventListener('submit', addMakeupItem);



const getMakeupItems = () => {
  axios.get('http://localhost:7777/api/makeupItems')
    .then(res => {
      console.log(res.data)
      createNewMakeupItem(res.data)
    })
}

getMakeupItems();









// const newMakeupItemForm = document.querySelector('form');


// const getMakeupItems = () => {
//     axios.get('http://localhost:7777/api/makeupItems')
//       .then(res => {
//         console.log(res.data)
//         getMakeupItems(res.data)
//       })
//   }

// getMakeupItems();


// const addMakeupItem = (event) => {
//     event.preventDefault()
//     const name = document.querySelector("#new-makeupItem-name")
//     const newMakeupItem = {name: name.value, rating: rating.value}
  
//     axios.post('http://localhost:7777/api/makeupItems', newMakeupItem)
//       .then(res => {
//         getMakeupItems()
//       })
//   }
// newMakeupItemForm.addEventListener('submit', addMakeupItem);


// const deleteMakeupItem = (id) => {
//     axios.delete(`http://localhost:7777/api/makeupItems/${id}`)
//       .then(res => {
//         console.log(res)
//         getMakeupItems()
//       })
//   }


// const updateMakeupList = (name, rating) => {
//     let body = {name, rating}
  
//     axios.put(`http://localhost:7777/api/makeupItems/${id}`, body)
//       .then(res => {
//         console.log(res.data)
//         getMakeupItems()
//       })
//   }
