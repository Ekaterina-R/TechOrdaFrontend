function getLetter(s) {
    let letter;
    // Write your code here
    switch (true) {
        case "aeiou".includes(s[0]): letter ="A";
        break;
        case "bcdfg".includes(s[0]): letter ="B";
        break;
        case "hijklm".includes(s[0]): letter ="C";
        break;
        case "npqrstvwxyz".includes(s[0]): letter ="D";
    }
    return letter;
}
