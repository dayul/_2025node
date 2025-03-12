// 익명함수(Anonymous function)
function print(a) {
    console.log('print : ' + a);
}
print('a');

printAnon = function(b) {
    console.log('print 익명 함수') + b;
}
printAnon('s');

// 화살표 함수(Arrow function)
printArrow = (a) => {
    console.log('arrow function : ' + a);
};
printArrow('arrow');

// 매개변수가 하나인 경우 소괄호 생략 가능
printArrow1 = a => {
    console.log('arrow function : ' + a);
}
printArrow1('arrow1');

// 함수 body가 return문 하나이거나, 한 줄인 경우 중괄호 생략 가능
printArrow2 = (a) => console.log();
printArrow2('arrow2');

