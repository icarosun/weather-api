# Weather API

## Requisitos Funcionais

### Escopo: Bacia do Rio Madeira

Deve ser possível para cada estação na Bacia:

1 - Obter os dados Hidrológicos observados
  -> Cota, Vazão

2 - Obter os dados Meteorológicos observados
  -> Temperatura, Umidade e Precipitação Acumulada

3 - Obter os dados Hidrológicos previstos
  -> Cota e Vazão

4 - Obter a interpretação dos dados Hidrológicos observados e previstos
  -> Cota

## Getting Started

```sh 
npm install
```

```sh 
npx prisma migrate deploy 
```

```sh 
npm run seeds
```

```sh 
npm run forecast
```


```
