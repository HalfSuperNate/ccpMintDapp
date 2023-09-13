// Define a global variable
let useCitizen = true;

// Define a function to toggle the global variable
function toggleUseCitizen() {
  useCitizen = !useCitizen;
}

// Export the global variable and the toggle function
export { useCitizen, toggleUseCitizen };