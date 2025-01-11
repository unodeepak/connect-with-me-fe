function debounce(func, delay) {
  let timeoutId; // Step 1: Declare a variable to hold the timeout ID.
  return (...args) => {
    // Step 2: Return a new function that takes arguments (...args) to pass to the original function `func`.
    if (timeoutId) clearTimeout(timeoutId);
    // Step 3: Clear the previous timeout if it exists, preventing the earlier function from running.

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
    // Step 4: Set a new timeout. After `delay` milliseconds, the `func` will execute with the passed arguments.
  };
}

const debouncedSearch = debounce((value) => {
  console.log("Searching for:", value);
}, 1000); // 1000ms delay


debouncedSearch("React"); // User types "React"
debouncedSearch("React.js"); // User quickly types ".js", previous timeout is cleared.
debouncedSearch("React.js Tutorial");


