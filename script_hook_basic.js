console.log("Script loaded successfully!");

// Ensure the current thread is attached to the java VM and call the function
Java.perform(function x(){
  console.log("Inside java perform function");

  // Select the class in which the function to hook is
  var my_class = Java.use("com.cp.camera.Loading");

  // Reimplement the function we want to hook
  my_class.loginByPost.implementation = function(code){
    console.log("+++ Inside loginByPost function");

    // Output the parameters
    console.log("The hooked argument is " + code);

    // Call normally the function and return the value
    return this.loginByPost(code)
  };

});
