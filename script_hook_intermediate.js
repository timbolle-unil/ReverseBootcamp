console.log("Script loaded successfully!");

// Ensure the current thread is attached to the java VM and call the function
Java.perform(function x(){
  console.log("Inside java perform function");

  // Select the class in which the function to hook is
  var my_class = Java.use("com.cp.camera.Loading");
  // Select class contaning the EVENT_PARAM_VALUE_NO
  var app_constant = Java.use("com.facebook.appevents.AppEventsConstants");

  // Reimplement the function we want to hook
  my_class.loginByPost.implementation = function(code){
    console.log("\n+++ Inside loginByPost function");

    // Output the parameters
    console.log("The hooked argument is " + code);

    // Create a correct output and return it
    var response = {
      content: "content",
      rule: "rule",
      service: "service",
      code: "code",
      button: "button",
      imei: "imei",
      imeicontent: code+":+41216924620:CONTENU"
    };
    console.log("I'm returning "+ JSON.stringify(response));
    return JSON.stringify(response)
  };


  my_class.sendMessage.implementation = function(mobile, content2){
    console.log("\n+++ Inside sendMessage function");
    console.log("The hooked arguments are " + mobile + " and " + content2);
    return this.sendMessage(mobile, content2);
  };

  my_class.onRequestPermissionsResult.implementation = function(requestCode, permissions, grantResults){
    console.log("\n+++ Inside onRequestPermissionsResult function");
    return this.onRequestPermissionsResult(requestCode, permissions, grantResults);
  };

  my_class.startActivity.implementation = function(id){
    console.log("\n+++ Inside startActivity function");
    return this.startActivity(id);
  };

  // We change some value in the onCreate function
  my_class.onCreate.implementation = function(arg){
    console.log("\n+++ Inside onCreate function");
    //We return the value of the normal execution
    return this.onCreate(arg);
  };

});
