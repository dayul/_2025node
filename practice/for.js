const letter = ['a', 'b', 'c', 'd'];

for(let i = 0; i < letter.length; i++) {
    console.log(letter[i]);
}

for(const l of letter) {
    console.log(l);
}

letter.forEach(function(f) {
    console.log(f);
})

letter.forEach(f => console.log(f))