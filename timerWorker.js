// Listen for messages from the main thread
self.onmessage = function (event) {
    const { id, delay } = event.data; // Extract the unique ID and delay time

    // Use performance.now() for more precise timing
    const start = performance.now();
    const end = start + delay;

    // Function to continuously check if the delay has elapsed
    function checkTime() {
        if (performance.now() >= end) {
            // Post back to the main thread when delay is complete
            self.postMessage({ id });
        } else {
            // Check again after a short interval
            setTimeout(checkTime, 1);
        }
    }

    // Start the timing check
    checkTime();
};
