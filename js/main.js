$(document).ready(function () {
  $('.selectpicker').selectpicker();
});

document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const selectedValue = e.target.getAttribute('data-value');
    console.log('Selected:', selectedValue);

    // Update the button text with the selected item
    const dropdownButton = e.target
      .closest('.dropdown')
      .querySelector('.dropdown-toggle');
    dropdownButton.innerText = e.target.innerText;
  });
});
