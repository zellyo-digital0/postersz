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

$(document).ready(function () {
  $('.community-container').each(function () {
    const container = $(this); // Scope to the current container

    // Handle selection of a community
    container.find('.communitySelector').change(function () {
      const selectedValue = $(this).val(); // Get selected value
      const exists = container.find(
        `.selectedCommunities span[data-value="${selectedValue}"]`
      ).length;

      // Add selected community if not already added
      if (selectedValue && !exists) {
        container.find('.selectedCommunities').append(`
          <span class="position-relative" data-value="${selectedValue}">
            ${selectedValue}
            <button class="removeTag btn p-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8.5" fill="white" stroke="#13BAE9"></circle>
                <path d="M7.25511 5.16364L9.37216 8.77642L11.4892 5.16364H13.054L10.2006 9.58182L13.054 14H11.4892L9.37216 10.5713L7.25511 14H5.69034L8.49773 9.58182L5.69034 5.16364H7.25511Z" fill="#14B9E8"></path>
              </svg>
            </button>
          </span>
        `);
      }
    });

    // Handle removal of a community
    container.on('click', '.removeTag', function () {
      $(this).closest('span').remove();
    });
  });
});




// text editor in email template modal 
const editableDiv = document.querySelector('.template-body');
const hiddenTextarea = document.getElementById('template');

/**
 * Format text (e.g., bold, italic).
 * @param {string} command - The formatting command (e.g., 'bold', 'italic').
 */
function formatText(command) {
    document.execCommand(command, false, null);
    syncContentToTextarea();
}

/**
 * Change paragraph type (e.g., H1, H2, H3, Paragraph).
 * @param {HTMLElement} selectElement - The dropdown element.
 */
function setParagraphType(selectElement) {
    const type = selectElement.value;
    document.execCommand('formatBlock', false, type);
    syncContentToTextarea();
}

/**
 * Add a hyperlink to the selected text.
 */
function addLink() {
    const selection = window.getSelection();
    const url = prompt("Enter the URL:", "https://");
    if (selection.rangeCount > 0 && url) {
        const range = selection.getRangeAt(0);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.appendChild(range.extractContents());
        range.insertNode(link);
        syncContentToTextarea();
    }
}

/**
 * Trigger file upload dialog for adding an image.
 */
function triggerImageUpload() {
    document.getElementById('imageUpload').click();
}

/**
 * Handle the uploaded image and insert it into the editable content.
 * @param {Event} event - The file input change event.
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const img = document.createElement('img');
            img.src = e.target.result; // Base64 image data
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            range.insertNode(img);
            syncContentToTextarea();
        };

        reader.readAsDataURL(file); // Convert the image to a Base64 URL
    }
}

/**
 * Sync content from the editable div to the hidden textarea for form submission.
 */
function syncContentToTextarea() {
    hiddenTextarea.value = editableDiv.innerHTML;
}

/**
 * Load content from the textarea to the editor on page load (if any).
 */
document.addEventListener('DOMContentLoaded', () => {
    if (hiddenTextarea.value.trim()) {
        editableDiv.innerHTML = hiddenTextarea.value;
    }

    editableDiv.addEventListener('input', syncContentToTextarea);
});

