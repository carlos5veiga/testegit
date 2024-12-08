import fs from "fs";
import csv from "csv-parser";

const results = [];
let hojeDate, limiteDate = null;
const readableStream = fs.createReadStream("nivercorais.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        aniversariantesDia();
        aniversariantesSemana();
        aniversariantesMes();
  });

  function diaHoje() {
    const date = new Date();
    hojeDate = date;
    const dia = (date.getDate().toString().padStart(2, '0'));
    const mes = ((date.getMonth()+1).toString().padStart(2, '0'));
    return dia + "/" + mes;
  }

  function limiteSemana() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    limiteDate = date;
    const dia = (date.getDate().toString().padStart(2, '0'));
    const mes = ((date.getMonth()+1).toString().padStart(2, '0'));
    return dia + "/" + mes;
  }

  function aniversariantesDia() {
    console.log();
    const niverHoje = diaHoje();
    const aniversariantes = [];
    results.forEach((dado) => {
        if (dado.Niver == niverHoje) {       
            aniversariantes.push(dado);
        }
    });

    const ordenado = ordenacaoNome(aniversariantes);

    if (aniversariantes.length > 0) {
        console.log(`Hoje, ${niverHoje}, é aniversário de:`);
        aniversariantes.forEach((pessoa) => {
            console.log(`${pessoa.Nome}, ${pessoa.Naipe} - ${pessoa.Coral}`);
        })
    } else {
        console.log(`Hoje, ${niverHoje}, não tem aniversário`);
    }
  }

  function aniversariantesMes() {
    console.log();
    const date = new Date();
    const mes = ((date.getMonth()+1).toString().padStart(2, '0'));
    const aniversariantes = [];
    results.forEach((dado) => {
        if (dado.Niver.slice(-2) == mes) {       
            aniversariantes.push(dado);
        }
    });

    const ordenado = ordenacaoData(aniversariantes);

    if (aniversariantes.length > 0) {
        console.log(`Aniversariantes do mês:`);
        ordenado.forEach((pessoa) => {
            console.log(`${pessoa.Niver} - ${pessoa.Nome}, ${pessoa.Naipe} - ${pessoa.Coral}`);
        })
    } else {
        console.log(`Este mês não tem aniversário`);
    }
  }

  function aniversariantesSemana() {
    console.log();
    const niverHoje = diaHoje();
    const limite = limiteSemana();

    const aniversariantes = [];
    results.forEach((dado) => {
        const niverDate = new Date(`2024-${dado.Niver.slice(-2)}-${dado.Niver.substr(0, 2)}`);
        if (niverDate > hojeDate && niverDate <= limiteDate) {       
            aniversariantes.push(dado);
        }
    });

    const ordenado = ordenacaoData(aniversariantes);

    if (aniversariantes.length > 0) {
        console.log(`Esta semana tem aniversário de:`);
        aniversariantes.forEach((pessoa) => {
            console.log(`${pessoa.Niver} - ${pessoa.Nome}, ${pessoa.Naipe} - ${pessoa.Coral}`);
        })
    } else {
        console.log(`Esta semana não tem aniversário`);
    }
  }

  function ordenacaoData(lista) {
    const ordenado = lista.sort(sortfunctionNiver);
    return ordenado;
  }

  function ordenacaoNome(lista) {
    const ordenado = lista.sort(sortfunctionNome);
    return ordenado;
  }

  function sortfunctionNiver(a, b){
    if (a.Niver > b.Niver) {
        return 1;
      }
      if (a.Niver < b.Niver) {
        return -1;
      }
      return 0;
  }

  function sortfunctionNome(a, b){
    if (a.Nome > b.Nome) {
        return 1;
      }
      if (a.Nome < b.Nome) {
        return -1;
      }
      return 0;
  }