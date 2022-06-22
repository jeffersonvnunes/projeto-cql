var campos = [
  {
    "_id": "5965224f9f048717c43df9c0",
    "active": true,
    "name": "Chamados por Sprint",
    "identifier": "chamadossprint",
    "datasource": "5964ff112deb0f0fd4e31f67",
    "presentation": "BAR",
    "__v": 0,
    "config": {
      "zoomEnabled": true,
      "serie": "IDSPRINT",
      "serieLabel": "Sprints",
      "valueLabel": "Quantidade de Chamados",
      "labels": [
        "Chamados",
        "Fazer",
        "Homologados",
        "Testar",
        "Concluídos",
        "SLA",
        "Certificados"
      ],
      "columns": [],
      "values": [
        "QTDE_CHAMADOS",
        "QTDE_FAZER",
        "QTDE_HOMOLOGADOS",
        "QTDE_TESTAR",
        "QTDE_CONCLUIDO",
        "QTDE_SLA",
        "QTDE_CERTIFICADOS"
      ]
    }
  },
  {
    "_id": "59664885bf6ee016a83ce8d4",
    "active": true,
    "name": "Percentual chamados por sprint",
    "identifier": "chamadopercentual",
    "datasource": "5964ff112deb0f0fd4e31f67",
    "presentation": "PIE",
    "__v": 0,
    "config": {
      "serieLabel": "IDSPRINT",
      "serie": "QTDE_CHAMADOS",
      "labels": [],
      "columns": [],
      "values": []
    }
  },
  {
    "_id": "5968c785850fd91fd0cf2945",
    "active": true,
    "datasource": "5968c71e850fd91fd0cf2944",
    "presentation": "PIE",
    "name": "Acompanhamento  dos chamados por classificação (Aguardando Prioridade)",
    "identifier": "Percentual",
    "__v": 0,
    "config": {
      "serie": "QTDE_CHAMADOS",
      "serieLabel": "CLASSIFICACAO",
      "labels": [],
      "columns": [],
      "values": []
    }
  },
  {
    "_id": "5968c81c850fd91fd0cf2947",
    "active": true,
    "datasource": "5968c79c850fd91fd0cf2946",
    "presentation": "PIE",
    "identifier": "PERC",
    "name": "Acompanhamento dos chamados por Módulo (Aguardando Prioridade)",
    "__v": 0,
    "config": {
      "serieLabel": "MODULO",
      "serie": "QTDE_CHAMADOS",
      "labels": [],
      "columns": [],
      "values": []
    }
  },
  {
    "_id": "5968c8c0850fd91fd0cf2948",
    "active": true,
    "datasource": "5968c79c850fd91fd0cf2946",
    "presentation": "BAR",
    "name": "Acompanhamento dos chamados por Módulo em dias (Aguardando Prioridade)",
    "identifier": "Módulo Barra móudlo",
    "__v": 0,
    "config": {
      "serie": "MODULO",
      "serieLabel": "Quantidade de chamados",
      "valueLabel": "Quantidade de dias",
      "labels": [
        "Qtd. Chamados",
        "Mais recente",
        "Média",
        "Mais antigo"
      ],
      "columns": [],
      "values": [
        "QTDE_CHAMADOS",
        "MENOR_DIA",
        "MEDIA_DIA",
        "MAIOR_DIA"
      ]
    }
  },
  {
    "_id": "5968cf9c850fd91fd0cf2949",
    "active": true,
    "datasource": "5968c71e850fd91fd0cf2944",
    "name": "Acompanhamento dos chamados por Classificação em dias (Aguardando Prioridade)",
    "identifier": "Qtd Chamdos Classificação dias",
    "presentation": "BAR",
    "__v": 0,
    "config": {
      "valueLabel": "Quantidade de dias",
      "serieLabel": "Classificação do chamado",
      "serie": "CLASSIFICACAO",
      "zoomEnabled": true,
      "labels": [
        "Qtd. Chamados",
        "Mais recente",
        "Média",
        "Mais antigo"
      ],
      "columns": [],
      "values": [
        "QTDE_CHAMADOS",
        "MENOR_DIA",
        "MEDIA_DIA",
        "MAIOR_DIA"
      ]
    }
  },
  {
    "_id": "59692b7b850fd91fd0cf294b",
    "active": true,
    "datasource": "59692a8c850fd91fd0cf294a",
    "presentation": "BAR",
    "name": "Acompanhamento dos chamados por dia  (Aguardando Prioridade)",
    "identifier": "1",
    "__v": 0,
    "config": {
      "valueLabel": "Quantidade de Chamados",
      "serieLabel": "Dia",
      "serie": "DATA_CAIXA",
      "zoomEnabled": true,
      "labels": [
        "Qtd. Chamados"
      ],
      "columns": [],
      "values": [
        "QTDE_CHAMADOS"
      ]
    }
  },
  {
    "_id": "596930bd850fd91fd0cf294d",
    "active": true,
    "datasource": "59693053850fd91fd0cf294c",
    "name": "Acompanhamento dos chamados por mês (Aguardando Prioridade)",
    "identifier": "2",
    "presentation": "BAR",
    "__v": 0,
    "config": {
      "valueLabel": "Quantidade de Chamados",
      "serie": "mes_extenso",
      "serieLabel": "Mês - Ano",
      "zoomEnabled": true,
      "labels": [
        "Qtd. Chamados"
      ],
      "columns": [],
      "values": [
        "QTDE_CHAMADOS"
      ]
    }
  },
  {
    "_id": "596fbeb64f5ef6292cf94591",
    "active": true,
    "name": "Lead time (dias corridos entre cadastro e conclusão dos chamados)",
    "datasource": "596fbded4f5ef6292cf9458f",
    "presentation": "BAR",
    "__v": 0,
    "config": {
      "valueLabel": "Quantidade de dias",
      "serieLabel": "",
      "serie": "ano_mes",
      "labels": [
        "Média",
        "Time 1",
        "Time 2",
        "Time 3",
        "Time 4"
      ],
      "columns": [
        true
      ],
      "values": [
        "lead_time",
        "time_1",
        "time_2",
        "time_3",
        "time_4"
      ]
    }
  },
  {
    "_id": "596fbee54f5ef6292cf94592",
    "active": true,
    "name": "Acompanhamento dos chamados por módulo (Priorizados)",
    "datasource": "596fbeae4f5ef6292cf94590",
    "presentation": "PIE",
    "identifier": "03",
    "__v": 0,
    "config": {
      "serie": "QTDE_CLASSIFICACAO",
      "serieLabel": "CLASSIFICACAO",
      "labels": [],
      "columns": [],
      "values": []
    }
  },
  {
    "_id": "596fbf8e4f5ef6292cf94594",
    "active": true,
    "name": "Acompanhamento dos chamados por classificação (Priorizados)",
    "datasource": "596fbf734f5ef6292cf94593",
    "identifier": "03",
    "presentation": "PIE",
    "__v": 0,
    "config": {
      "serie": "QTDE_CLASSIFICACAO",
      "serieLabel": "CLASSIFICACAO",
      "zoomEnabled": false,
      "labels": [],
      "columns": [],
      "values": []
    }
  },
  {
    "_id": "5970a03e4f5ef6292cf94597",
    "active": true,
    "name": "Tempo médio trabalhado por chamado",
    "datasource": "59709fb14f5ef6292cf94596",
    "presentation": "BAR",
    "__v": 0,
    "config": {
      "valueLabel": "Horas",
      "serie": "trabalho_ano_mes",
      "labels": [
        "Média geral",
        "Média Time 1",
        "Média Time 2",
        "Média Time 3",
        "Média Time 4"
      ],
      "columns": [],
      "values": [
        "media_trabalhada",
        "time1_media_trabalhada",
        "time2_media_trabalhada",
        "time3_media_trabalhada",
        "time4_media_trabalhada"
      ]
    }
  }
];

module.exports = campos;