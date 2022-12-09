function factorial(n){
    let value = n;
     for (var i = 1; i < n; i++) {
         value = value * (n - i);
     }
     return value;
 }
 /*
  * Create the function factorial here
  */
 