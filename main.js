function calc() {
    let constNum1 = parseInt(document.querySelector('#value1').value);
    let pow = parseInt(document.querySelector('#pow').value);
    let constNum3 = parseInt(document.querySelector('#value3').value);
    let constNum4 = parseInt(document.querySelector('#value4').value);

    let startValue = parseInt(document.querySelector('#startValue').value);
    let endValue = parseInt(document.querySelector('#endValue').value);
    let hValue = parseFloat(document.querySelector('#hValue').value);
    let calculated, result;

    console.log(startValue, endValue, hValue);

    let operator1 = document.querySelector('#operator1').value;
    let operator2 = document.querySelector('#operator2').value;
    console.log(operator1, operator2)

    const fx = (x) => {
        
        if ((operator1 == "add")&& (operator2 == "add")){
            calculated = ((constNum1 * x) ** pow) + (constNum3 * x) + constNum4;
        } 
        
        else if ((operator1 == "min")&& (operator2 == "min")){
            calculated = ((constNum1 * x) ** pow) - (constNum3 * x) - constNum4;
        } 
        
        else if ((operator1 == "min")&& (operator2 == "add")){
            calculated = ((constNum1 * x) ** pow) - (constNum3 * x) + constNum4;
        } 
        
        else if ((operator1 == "add")&& (operator2 == "min")){
            calculated = ((constNum1 * x) ** pow) + (constNum3 * x) - constNum4;
        }

        return calculated;
    };

    console.log( "new",fx(1))

    const fx_integral = (x, h) => {
        calculated = (fx(x + h) - fx(x - h)) / (2 * h);
        return calculated;
    };

    const fx_multigral = (x, h) => {
        calculated = (((fx(x + (2 * h)) - fx(x)) / (2 * h)) - ((fx(x) - fx(x -(2 * h))) / (2 * h))) / (2 * h);
        return calculated;
    };


    const show_result = (startValue, endValue, hValue) =>{

        result = []
        
        while (startValue <= endValue) {
            var fx1 = fx(startValue).toFixed(5);
            var fx_i = fx_integral(startValue, hValue).toFixed(5);
            var fx_m = fx_multigral(startValue, hValue).toFixed(5);

            record = {};
            record[startValue.toFixed(2)] = fx_i;
            result.push(record); 
            startValue += hValue;
        }
        return result;
    
    }; 

    result = show_result(startValue, endValue, hValue)
    console.log(result);
    let it = 0;

    let resultX, resultY;
    const valResultMax = document.querySelector('#max');
    const valResultMin = document.querySelector('#min');
    while (startValue <= endValue) {
        // console.log('it',it); inrcrease it

        var prev = result[it][startValue.toFixed(2)]
        // console.log('prev', prev)

        it++;
        startValue+=hValue;

        var next = result[it][startValue.toFixed(2)]
        // console.log('next', next)

       
        if (prev * next < 0){
            resultX = startValue.toFixed(2);
            resultY = result[it][startValue.toFixed(2)]
            break;
            // console.log(startValue.toFixed(2))
            // console.log(result[it][startValue.toFixed(2)])
        } 
    }

    if (resultX != 0 || resultY != 0){
        valResultMax.innerHTML = `max: {${startValue.toFixed(2)}, ${result[it][startValue.toFixed(2)]}}`;
        valResultMin.innerHTML = `min: {${Math.abs(startValue.toFixed(2))}, ${result[it][startValue.toFixed(2)]}}`;
    } else {
        valResultMax.innerHTML = `max: NOT FOUND`;
        valResultMin.innerHTML = `min: NOT FOUND`;
    }


};

