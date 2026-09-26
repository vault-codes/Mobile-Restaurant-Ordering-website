import { menuArray } from './data.js'


const currentOrder = []
document.addEventListener('click', function (e) {

  if (e.target.dataset.addMenu) {
      handleOrder(Number(e.target.dataset.addMenu))

    }

  else if (e.target.id === "complete-order-btn") {
    document.getElementById('modal').style.display  = "block"

    }


})

document.addEventListener('submit', function (e) {
   e.preventDefault()
  if (e.target.id === "payment-form") {
    handlePayment()

  }
})



function handlePayment() {

  const customerinfo = {
    customerName : document.getElementById(`name`).value
  }


  document.getElementById('modal').style.display  = "none"
  document.getElementById('orders-container').style.display = "none"

 const orderInfoHtml =  `
   <h4> Thanks, ${customerinfo.customerName}!  Your order is on its way! </h5>`

  document.getElementById('order-info').innerHTML = orderInfoHtml
  document.getElementById('order-info').style.display = "block"

}






function handleOrder(menuId) {
  Number(menuId)
  const selectedMenu = menuArray.find(function (menu) {

    return menu.id === menuId
  })


  currentOrder.push(selectedMenu)

  renderOrder()

}

function renderOrder() {
 const ordersHtml =   currentOrder.map(function (order) {

   return `<div class="orders-inner">

               <div class="orders-row">
                  <h3> ${order.name} </h3>
                  <h4> $${order.price}</h4>


                </div>
            </div>
          `

 }).join('')


 const totalOrder = currentOrder.reduce(function (acc, order) {

  return acc + order.price


 }, 0)


  document.getElementById('orders-container').style.display = "block"
  document.getElementById('orders-list').innerHTML = ordersHtml
  document.getElementById('orders-total').innerHTML = `<h3> Total Price:</h3>
    <h4>$${totalOrder}</h4>`




}









function getMenuHtml(arr) {



   const menuHtml = arr.map(function (menu) {

    return ` <div class="menu-container">

    <div class="menu-img-container">
      <img src="/images/emoji${menu.emoji}.png" class="menu-img" />
    </div>

    <div class="menu-text">
    <h3> ${menu.name}</h3>
    <p> ${menu.ingredients.join(', ')} </p>
    <h4> ${menu.price} </h4>



    </div>

    <i class="fa-solid fa-circle-plus" data-add-menu=${menu.id}></i>

    </div>


    `

   }).join('')

return menuHtml

}




document.getElementById('item-content').innerHTML = getMenuHtml(menuArray)
