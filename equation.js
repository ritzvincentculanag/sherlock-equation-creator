let equationData = generateEquation(1234, 37);

function generateEquation(target, inputNum) {
    let strNum = inputNum.toString();
    let inputParts = [];

    // Split input number based on its length
    if (strNum.length === 1) {
        inputParts.push(parseInt(strNum), parseInt(strNum)); // Reuse single digit twice
    } else if (strNum.length === 2) {
        inputParts.push(parseInt(strNum[0]), parseInt(strNum[1])); // Two single digits
    } else if (strNum.length === 3) {
        inputParts.push(parseInt(strNum.slice(0, 2)), parseInt(strNum[2])); // One double, one single
    } else if (strNum.length === 4) {
        inputParts.push(parseInt(strNum.slice(0, 2)), parseInt(strNum.slice(2, 4))); // Two double digits
    }

    let equation = "";
    let x, y, z;
    let operator1, operator2;

    // Function to calculate valid x, y, and z that balance the equation
    function calculateValidXY() {
        for (let attempt = 0; attempt < 1000; attempt++) {
            x = Math.floor(Math.random() * 50) + 10; // Double-digit multiplier (10-99)
            y = Math.floor(Math.random() * 50) + 10; // Double-digit multiplier (10-99)

            let sum = inputParts[0] * x + inputParts[1] * y;

            z = target - sum;

            // Dynamically choose operator based on current sum
            operator1 = "+";
            operator2 = sum < target ? "+" : "-";

            // Fix double negative issue: Avoid + -z
            if (operator2 === "-" && z < 0) {
                z = Math.abs(z);
            }

            let calculatedValue = sum + (operator2 === "+" ? z : -z);
            if (calculatedValue === target) {
                return;
            }
        }
    }

    calculateValidXY();

    equation = `(${inputParts[0]} * ${x}) ${operator1} (${inputParts[1]} * ${y}) ${operator2} ${z} = ${target}`;

    // Create the alternate format by replacing only input numbers with "?" and both "*" with "x"
    let alternateEquation = equation
        .replace(/\b\d+\b/g, (match) => (inputParts.includes(parseInt(match)) ? "?".repeat(match.length) : match))
        .replace(/\*/g, "x")
        .replace(" 1234", ""); // Replace all "*" with "x"

    return { equation, alternateEquation };
}

// Example usage
console.log(equationData.equation);
console.log(equationData.alternateEquation);
