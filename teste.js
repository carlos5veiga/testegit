import fs from "fs";
import csv from "csv-parser";

const results = [];
const readableStream = fs.createReadStream("nivercorais.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

    const niverHoje = diaHoje();
    const aniversariantes = [];
    results.forEach((dado) => {
        if (dado.Coral == "CMS" && dado.Niver == niverHoje) {       
            aniversariantes.push(dado);
        }
    });

    if (aniversariantes.length > 0) {       
        console.log(`Hoje, ${niverHoje}, é aniversário de:`);
        aniversariantes.forEach((pessoa) => {
            console.log(`${pessoa.Nome}, ${pessoa.Naipe} - ${pessoa.Coral}`);
        })
    } else {
        console.log(`Hoje, ${niverHoje}, não tem aniversário`);
    }
  });

  function diaHoje() {
    const date = new Date();
    const dia = (date.getDate().toString().padStart(2, '0'));
    const mes = ((date.getMonth()+1).toString().padStart(2, '0'));
    return dia + "/" + mes;
  }


