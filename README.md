# AGRO MANAGER

![GitHub language count](https://img.shields.io/github/languages/count/Gusttavo-Larios/Agro-Manager?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/Gusttavo-Larios/Agro-Manager?style=for-the-badge&color=orange)

![AGROMANAGER-CAPA](https://github.com/Gusttavo-Larios/Agro-Manager/assets/72306241/18ec099e-17ee-40ce-a032-81a79339eaaf)

# Sobre

Este projeto é o resultado de um desafio técnico. O objetivo do sistema desenvolvido é manter o cadastro de agricultores.

# Ferramentas

Foram utilizadas as seguintes ferramentas:

- NestJS
- ReactJS & ViteJS
- MySQL
- Docker

# Como iniciar

  **OBS: Antes de inciar o projeto é necessário ter o Docker instalado**

  Para iniciar o projeto basta executar o comando a seguir:

  ```
  $ ./init.sh
  ```
  A api ira demorar alguns segundos para iniciar enquanto o banco de dados não completou sua inicialização por completo.

# Rotas

**Para realizar o login**

```POST: http://localhost:3000/auth/login```
```
{
    "email": "email@exemplo.com",
    "senha": "12345"
}
```

**Para listar todos os estados**

```GET: http://localhost:3000/state```

**Para listar as cidades por estado**

```GET: http://localhost:3000/city/service/{uf}```

## Agricultores

**Para criar um agricultor**

```POST: http://localhost:3000/farmer```
```
{
    "corporate_name": "Razão Social",
    "fantasy_name": "Nome Fatansia",
    "company_identification": "99.999.999/9999-99",
    "phone_number": "(99) 9 9999-9999",
    "city": {
        "city_name": "São Paulo",
        "state_acronym": "SP",
        "ibge_code": "3550308"
    }
}
```

**Para listar todos os agricultores**

```GET: http://localhost:3000/farmer```

**Para buscar um agricultor**

```GET: http://localhost:3000/farmer/{id}```

**Para atualizar um agricultor**

```PATCH: http://localhost:3000/farmer/{id}```
```
{
    "corporate_name": "Razão Social",
    "fantasy_name": "Nome Fatansia",
    "company_identification": "99.999.999/9999-99",
    "phone_number": "(99) 9 9999-9999",
    "city": {
        "city_name": "São Paulo",
        "state_acronym": "SP",
        "ibge_code": "3550308"
    }
}
```

**Para excluir um agricultor**

```DELETE: http://localhost:3000/farmer/{id}```