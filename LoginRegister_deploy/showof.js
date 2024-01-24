var div = document.getElementsByClassName("alart")[0];
    var text = document.getElementsByClassName("alarttext")[0];

    // Function to toggle visibility based on the boolean value
    function toggleVisibility() {
        var isVisible = !div.classList.contains('hidden');

        // Toggle the class based on the current visibility
        if (isVisible) {
            div.classList.add('hidden');
        } else {
            div.classList.remove('hidden');
        }
    }