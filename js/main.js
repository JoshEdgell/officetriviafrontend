$(()=>{
  //Close the opening Modal on button click
  const $openingButton = $('.opening');
  $openingButton.on('click',()=>{
    const $openingModal = $('.openingModal');
    $openingModal.css('display','none');
  })
})
