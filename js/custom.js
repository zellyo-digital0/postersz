document.addEventListener('DOMContentLoaded', function () {
  // Get all tab elements
  const tabItems = document.querySelectorAll('.tablist li');

  // Function to handle tab switching
  function activateTab(clickedTab) {
    // Remove the 'active-tablist' class from all tabs
    tabItems.forEach(tab => tab.classList.remove('active-tablist'));

    // Add 'active-tablist' class to the clicked tab
    clickedTab.classList.add('active-tablist');

    // Get content related to the clicked tab
    const tabContentId = clickedTab.getAttribute('data-tab');

    // Hide all tab content
    const allContent = document.querySelectorAll('.tab-content');
    allContent.forEach(content => content.classList.add('hidden'));

    // Show the content related to the active tab
    document.getElementById(tabContentId).classList.remove('hidden');
  }

  // Add click event listeners to each tab
  tabItems.forEach(tab => {
    tab.addEventListener('click', function () {
      activateTab(tab);
    });
  });

  // Optional: Activate the first tab by default on page load
  if (tabItems.length > 0) {
    activateTab(tabItems[0]);
  }
});



