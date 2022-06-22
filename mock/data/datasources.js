var campos = [
  {
    "_id": "5964ff112deb0f0fd4e31f67",
    "name": "Chamados Sprint",
    "query": "with \nCHAMADOS_SPRINT  AS \n(\n\tselect  SRMSTORY.IDSPRINT,SRMSPRINT.NOME,\n\t        SRMSTORY.ID,SRMSTORY.IDPROJETO,\n\t\t\tSRMSTORY.IDCHAMADO,\n\t\t\tCRMCHTEC.SITUACAO,CRMCHTEC.PONTOFUNCAO,\n\t\t\tCRMCHTEC.SLA,CRMCHTEC.CODCLASCHTEC,CRMCLASCHTEC.DESCRICAO AS CLASSIFICACAO\n\t\tfrom SRMSTORY\n\t\tinner join SRMSPRINT ON (SRMSPRINT.ID = SRMSTORY.IDSPRINT)\n\t\tinner join CRMCHTEC on (CRMCHTEC.CRMCODCHTEC = SRMSTORY.IDCHAMADO)\t\n\t\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC)\n\twhere SRMSPRINT.IDUSUARIO = [times]\n\t    --and SRMSTORY.IDSPRINT = 103\n)\n,CHAMADOS_STATUS AS (\n\tselect \n\t\tCHAMADOS_SPRINT.IDSPRINT,\n\t\tCHAMADOS_SPRINT.NOME,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.PONTOFUNCAO,0) <> '0.01' then 1 else 0 end) AS QTDE_CHAMADOS,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.PONTOFUNCAO,0) = '0.01' then 1 else 0 end) AS QTDE_SIMILARES,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) in (0,4) then 1 else 0 end) AS QTDE_FAZER,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) = 12 then 1 else 0 end) AS QTDE_CERTIFICADOS,\n\t    sum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) = 14 then 1 else 0 end) AS QTDE_HOMOLOGADOS,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) = 13 then 1 else 0 end) AS QTDE_TESTAR,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) = 15 then 1 else 0 end) AS QTDE_RETORNO,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SITUACAO,0) = 9 then 1 else 0 end) AS QTDE_CONCLUIDO,\n\t\tsum(case when coalesce(CHAMADOS_SPRINT.SLA,0) = 1 then 1 else 0 end) AS QTDE_SLA\n\t\tfrom CHAMADOS_SPRINT\t\n\tgroup by CHAMADOS_SPRINT.IDSPRINT,CHAMADOS_SPRINT.NOME\t\t\n\t       \n)\nselect \n      top 8\n\t   CHAMADOS_STATUS.IDSPRINT,\n\t   CHAMADOS_STATUS.NOME,\n\t   CHAMADOS_STATUS.QTDE_CHAMADOS,\n\t   CHAMADOS_STATUS.QTDE_SIMILARES,\n\t   CHAMADOS_STATUS.QTDE_FAZER,\n\t   CHAMADOS_STATUS.QTDE_CERTIFICADOS,\n\t   CHAMADOS_STATUS.QTDE_HOMOLOGADOS,\n\t   CHAMADOS_STATUS.QTDE_TESTAR,\n\t   CHAMADOS_STATUS.QTDE_RETORNO,\n\t   CHAMADOS_STATUS.QTDE_CONCLUIDO,\n\t   CHAMADOS_STATUS.QTDE_SLA\n\tfrom CHAMADOS_STATUS\norder by CHAMADOS_STATUS.IDSPRINT desc",
    "active": true,
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "description": "Time 1",
            "value": "326"
          },
          {
            "description": "Time 2",
            "value": "327"
          },
          {
            "description": "Time 3",
            "value": "328"
          }
        ]
      }
    ],
    "fields": [
      "IDSPRINT",
      "NOME",
      "QTDE_CHAMADOS",
      "QTDE_SIMILARES",
      "QTDE_FAZER",
      "QTDE_CERTIFICADOS",
      "QTDE_HOMOLOGADOS",
      "QTDE_TESTAR",
      "QTDE_RETORNO",
      "QTDE_CONCLUIDO",
      "QTDE_SLA"
    ]
  },
  {
    "_id": "5968c71e850fd91fd0cf2944",
    "active": true,
    "query": "with \n\tchamado_dias as (\nselect \n\tCRMCHTEC.CRMCODCHTEC,\n\tDATEDIFF(day,COALESCE((SELECT top 1 ANOT.DATAHORA FROM CRMCHTECANOT ANOT \n\t\t\t\tWHERE (ANOT.CODCRMCHTEC = CRMCHTEC.CRMCODCHTEC AND ANOT.CODUSUPARA=CRMCHTEC.CODUSUATUALRESP) ORDER BY DATAHORA DESC),CRMCHTEC.DATAHORACAD),CURRENT_TIMESTAMP) AS DIASRESP\n\nfrom CRMCHTEC\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\n)\nselect \n\tcoalesce(CRMCLASCHTEC.DESCRICAO,'Não Classficado') AS CLASSIFICACAO,\n\tcount(CRMCHTEC.CRMCODCHTEC) QTDE_CHAMADOS,\n\tmin(chamado_dias.DIASRESP) MENOR_DIA,\n\tavg(chamado_dias.DIASRESP) MEDIA_DIA,\n\tmax(chamado_dias.DIASRESP) MAIOR_DIA\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\n\tleft join chamado_dias on (chamado_dias.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC)\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\ngroup by CRMCLASCHTEC.DESCRICAO\norder by 1",
    "name": "Acompanhamento dos chamados por Classificação em dias",
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "value": "290",
            "description": "Time 1"
          },
          {
            "value": "291",
            "description": "Time 2"
          },
          {
            "value": "292",
            "description": "Time 3"
          }
        ]
      }
    ],
    "fields": [
      "CLASSIFICACAO",
      "QTDE_CHAMADOS",
      "MENOR_DIA",
      "MEDIA_DIA",
      "MAIOR_DIA"
    ]
  },
  {
    "_id": "5968c79c850fd91fd0cf2946",
    "active": true,
    "query": "with \n\tchamado_dias as (\nselect \n\tCRMCHTEC.CRMCODCHTEC,\n\tDATEDIFF(day,COALESCE((SELECT top 1 ANOT.DATAHORA FROM CRMCHTECANOT ANOT \n\t\t\t\tWHERE (ANOT.CODCRMCHTEC = CRMCHTEC.CRMCODCHTEC AND ANOT.CODUSUPARA=CRMCHTEC.CODUSUATUALRESP) ORDER BY DATAHORA DESC),CRMCHTEC.DATAHORACAD),CURRENT_TIMESTAMP) AS DIASRESP\n\nfrom CRMCHTEC\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\n)\nselect \n\tcoalesce(CRMCHTEC.MODULO,'Módulo não informado') AS MODULO,\n\tcount(CRMCHTEC.CRMCODCHTEC) QTDE_CHAMADOS,\n\tmin(chamado_dias.DIASRESP) MENOR_DIA,\n\tavg(chamado_dias.DIASRESP) MEDIA_DIA,\n\tmax(chamado_dias.DIASRESP) MAIOR_DIA\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\n\tleft join chamado_dias on (chamado_dias.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC)\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\ngroup by CRMCHTEC.MODULO\norder by 1",
    "name": "Acompanhamento dos chamados por Módulo em dias",
    "__v": 0,
    "filters": [
      {
        "identifier": "times",
        "values": [
          {
            "value": "290",
            "description": "Time 1"
          },
          {
            "value": "291",
            "description": "Time 2"
          },
          {
            "value": "292",
            "description": "Time 3"
          }
        ]
      }
    ],
    "fields": [
      "MODULO",
      "QTDE_CHAMADOS",
      "MENOR_DIA",
      "MEDIA_DIA",
      "MAIOR_DIA"
    ]
  },
  {
    "_id": "59692a8c850fd91fd0cf294a",
    "active": true,
    "query": "with \n\tchamado_dias as (\nselect \n\tCRMCHTEC.CRMCODCHTEC,\n\tcast(COALESCE((SELECT top 1 ANOT.DATAHORA FROM CRMCHTECANOT ANOT \n\t\t\t\tWHERE (ANOT.CODCRMCHTEC = CRMCHTEC.CRMCODCHTEC AND ANOT.CODUSUPARA=CRMCHTEC.CODUSUATUALRESP) ORDER BY DATAHORA DESC),CRMCHTEC.DATAHORACAD)as date) AS DATA_CAIXA\n\nfrom CRMCHTEC\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\n)\nselect \n\t--chamado_dias.DATA_CAIXA,\n\tCONVERT(VARCHAR(10),chamado_dias.DATA_CAIXA, 103) as DATA_CAIXA,\n\tcount(CRMCHTEC.CRMCODCHTEC) QTDE_CHAMADOS\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\n\tleft join chamado_dias on (chamado_dias.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC)\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\n\t  and month(chamado_dias.DATA_CAIXA) = month(getdate())\ngroup by --CRMCHTEC.MODULO,\n\t\t chamado_dias.DATA_CAIXA\norder by 1",
    "name": "Acompanhamento dos chamados de quantidade de chamado por dia",
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "value": "290",
            "description": "Time 1"
          },
          {
            "value": "291",
            "description": "Time 2"
          },
          {
            "value": "292",
            "description": "Time 3"
          }
        ]
      }
    ],
    "fields": [
      "DATA_CAIXA",
      "QTDE_CHAMADOS"
    ]
  },
  {
    "_id": "59693053850fd91fd0cf294c",
    "active": true,
    "name": "Acompanhamento dos chamados de quantidade de chamado por mês",
    "query": "with \n\tchamado_dias as (\nselect \n\tCRMCHTEC.CRMCODCHTEC,\n\tcast(COALESCE((SELECT top 1 ANOT.DATAHORA FROM CRMCHTECANOT ANOT \n\t\t\t\tWHERE (ANOT.CODCRMCHTEC = CRMCHTEC.CRMCODCHTEC AND ANOT.CODUSUPARA=CRMCHTEC.CODUSUATUALRESP) ORDER BY DATAHORA DESC),CRMCHTEC.DATAHORACAD)as date) AS DATA_CAIXA\n\nfrom CRMCHTEC\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\n)\nselect \n\t--chamado_dias.DATA_CAIXA,\n\t(case\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 1 then\t\n\t\t\t'Janeiro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 2 then\t\n\t\t\t'Fevereiro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 3 then\t\n\t\t\t'Março' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 4 then\t \n\t\t\t'Abril' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 5 then\t\n\t\t\t'Maio' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 6 then\t\n\t\t\t'Junho' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 7 then\t\n\t\t\t'Julho' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 8 then\t\n\t\t\t'Agosto' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 9 then\t\n\t\t\t'Setembro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 10 then\t\n\t\t\t'Outubro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 11 then\t\n\t\t\t'Novembro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\n\t\twhen month(chamado_dias.DATA_CAIXA)  = 12 then\t\n\t\t\t'Dezembro' + ' -  '+ cast(year(chamado_dias.DATA_CAIXA)as varchar(10))\t\t\n\tend) mes_extenso,\n\tmonth(chamado_dias.DATA_CAIXA) as mes,\n\tyear(chamado_dias.DATA_CAIXA) as ano,\n\tcount(CRMCHTEC.CRMCODCHTEC) QTDE_CHAMADOS\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\n\tleft join chamado_dias on (chamado_dias.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC)\n\twhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\ngroup by --CRMCHTEC.MODULO,\n\t\tmonth(chamado_dias.DATA_CAIXA),\n\t\tyear(chamado_dias.DATA_CAIXA) \norder by 3",
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "description": "Time 1",
            "value": "290"
          },
          {
            "description": "Time 2",
            "value": "291"
          },
          {
            "description": "Time 3",
            "value": "292"
          }
        ]
      }
    ],
    "fields": [
      "mes_extenso",
      "mes",
      "ano",
      "QTDE_CHAMADOS"
    ]
  },
  {
    "_id": "596fbded4f5ef6292cf9458f",
    "active": true,
    "name": "Lead time (dias corridos entre cadastro e conclusão dos chamados)",
    "query": "with lead_time_chamados as (\nselect \n  (case \n     when chamado.CODSISTEMA in (30,93,28,110,116,77) \n       then 'Time 4' \n     when chamado.CODSISTEMA in (6,7,27,75,76,84,87,108,109,112) \n       then 'Time 3' \n     when (chamado.CODSISTEMA in (5,14,15,16,17)) or ((chamado.CODSISTEMA = 1) and ((chamado.CODMODAREA in (8,9,11)) or (chamado.codmodsubarea in (18,20))))\n       then 'Time 1' \n     else 'Time 2'\n   end) time,\n  chamado.CRMCODCHTEC chamado,\n  CONVERT(VARCHAR(4),YEAR(chamado.DATAHORACAD)) + '/' + RTRIM(RIGHT('0' + RTRIM(LTRIM((CONVERT(VARCHAR(2),MONTH(chamado.DATAHORACAD))))), 2)) abertura_ano_mes,\n  CONVERT(VARCHAR(4),YEAR(chamado.DATAHORACONC)) + '/' + RTRIM(RIGHT('0' + RTRIM(LTRIM((CONVERT(VARCHAR(2),MONTH(chamado.DATAHORACONC))))), 2)) fechamento_ano_mes,\n  CEILING(datediff(MINUTE,chamado.DATAHORACAD,chamado.DATAHORACONC) / 60.0 / 24.0) dias_corridos_abertura_fechamento\nfrom CRMCHTEC chamado\n  inner join CRMCHTECCON contatoct on \n    contatoct.CRMCODCHTEC = chamado.CRMCODCHTEC\n  inner join CRMCONTATO contato on\n    contato.CRMCODCONTATO = contatoct.CRMCODCONTATO\n  left join USUARIO analista_suporte on\n    analista_suporte.CODUSUARIO = chamado.codususuporte\nwhere not contato.CRMCODCONTATO in (1247,9111,24823,27067,28774) --Ignorar chamados internos da Agrotis\n  and not chamado.codsistema in (24,73,74,75,90,91,104,105,106) --90 = Atividades Internas; Ignorar chamados de outras atividades\n  and chamado.DATAHORACONC is not null --Apenas chamados já concluídos\n  and ((chamado.DATAHORACAD between '01/01/2017' and current_timestamp) --Cadastrado a partir de 2017\n       or (chamado.DATAHORACONC between '01/01/2017' and current_timestamp)) --Fechado a partir de 2017\n  and chamado.situacao <> 10\n)\nselect \n  geral.fechamento_ano_mes ano_mes,\n  (select CEILING(avg(hist.dias_corridos_abertura_fechamento))\n   from lead_time_chamados hist) lead_time_historico,\n  CEILING(avg(geral.dias_corridos_abertura_fechamento)) lead_time,\n  (select CEILING(avg(time.dias_corridos_abertura_fechamento))\n   from lead_time_chamados time \n   where time.time = 'Time 1' \n     and time.fechamento_ano_mes = geral.fechamento_ano_mes) time_1,\n  (select CEILING(avg(time.dias_corridos_abertura_fechamento))\n   from lead_time_chamados time \n   where time.time = 'Time 2' \n     and time.fechamento_ano_mes = geral.fechamento_ano_mes) time_2,\n  (select CEILING(avg(time.dias_corridos_abertura_fechamento))\n   from lead_time_chamados time \n   where time.time = 'Time 3' \n     and time.fechamento_ano_mes = geral.fechamento_ano_mes) time_3,\n  (select CEILING(avg(time.dias_corridos_abertura_fechamento))\n   from lead_time_chamados time \n   where time.time = 'Time 4' \n     and time.fechamento_ano_mes = geral.fechamento_ano_mes) time_4\nfrom lead_time_chamados geral\nwhere geral.time <> 'Outros'\ngroup by\n  fechamento_ano_mes\norder by \n  fechamento_ano_mes",
    "__v": 0,
    "filters": [],
    "fields": [
      "ano_mes",
      "lead_time_historico",
      "lead_time",
      "time_1",
      "time_2",
      "time_3",
      "time_4"
    ]
  },
  {
    "_id": "596fbeae4f5ef6292cf94590",
    "active": true,
    "query": "select \n    coalesce(CRMCHTEC.PREVISTOPO,'Não alocado') AS PREVISTOPO,\n\tcoalesce(CRMCHTEC.MODULO,'Módulo não informado') AS CLASSIFICACAO,\n    count(CRMCHTEC.CRMCODCHTEC) AS QTDE_CLASSIFICACAO\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\nwhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\ngroup by CRMCHTEC.MODULO,CRMCHTEC.PREVISTOPO\norder by 1",
    "name": "Acompanhamento dos chamados por módulo (Priorizados)",
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "value": "326",
            "description": "Time 1"
          },
          {
            "value": "327",
            "description": "Time 2"
          },
          {
            "value": "328",
            "description": "Time 3"
          }
        ]
      }
    ],
    "fields": [
      "PREVISTOPO",
      "CLASSIFICACAO",
      "QTDE_CLASSIFICACAO"
    ]
  },
  {
    "_id": "596fbf734f5ef6292cf94593",
    "active": true,
    "name": "Acompanhamento dos chamados por classificação (Priorizados)",
    "query": "select \n    coalesce(CRMCHTEC.PREVISTOPO,'Não alocado') AS PREVISTOPO,\n\tcoalesce(CRMCLASCHTEC.DESCRICAO,'Não Classficado') AS CLASSIFICACAO,\n    count(CRMCHTEC.CRMCODCHTEC) AS QTDE_CLASSIFICACAO\nfrom CRMCHTEC\n\tleft join CRMCLASCHTEC on (CRMCLASCHTEC.CODCLASCHTEC = CRMCHTEC.CODCLASCHTEC) \n\tinner JOIN CRMCHTECCON  ON CRMCHTECCON.CRMCODCHTEC = CRMCHTEC.CRMCODCHTEC\n\tinner JOIN CRMCONTATO  ON CRMCONTATO.CRMCODCONTATO = CRMCHTECCON.CRMCODCONTATO\nwhere CRMCHTEC.CODUSUATUALRESP = [times]\n      AND CRMCHTEC.SITUACAO in (0,1,2,3,4,5,6,7,8,11,13,15)\ngroup by CRMCLASCHTEC.DESCRICAO,CRMCHTEC.PREVISTOPO\norder by 1",
    "__v": 0,
    "filters": [
      {
        "identifier": "Times",
        "values": [
          {
            "description": "Time 1",
            "value": "326"
          },
          {
            "description": "Time 2",
            "value": "327"
          },
          {
            "description": "Time 3",
            "value": "328"
          }
        ]
      }
    ],
    "fields": [
      "PREVISTOPO",
      "CLASSIFICACAO",
      "QTDE_CLASSIFICACAO"
    ]
  },
  {
    "_id": "59709fb14f5ef6292cf94596",
    "active": true,
    "name": "Tempo médio trabalhado por chamado",
    "query": "with horas_trabalhadas_chamado as (\nselect \n  chamado.CRMCODCHTEC chamado,\n  max(case \n     when chamado.CODSISTEMA in (30,93,28,110,116,77) \n       then 'Time 4' \n     when chamado.CODSISTEMA in (6,7,27,75,76,84,87,108,109,112) \n       then 'Time 3' \n     when (chamado.CODSISTEMA in (5,14,15,16,17)) or ((chamado.CODSISTEMA = 1) and ((chamado.CODMODAREA in (8,9,11)) or (chamado.codmodsubarea in (18,20))))\n       then 'Time 1' \n     else 'Time 2'\n   end) time, \n  CONVERT(VARCHAR(4),YEAR(trabalho.HORAINI)) + '/' + RTRIM(RIGHT('0' + RTRIM(LTRIM((CONVERT(VARCHAR(2),MONTH(trabalho.HORAINI))))), 2)) trabalho_ano_mes,\n  sum\n  (datediff(second,trabalho.HORAINI,trabalho.HORAFIM)/3600.0) horas_trabalhadas,\n  min\n  (trabalho.HORAINI) primeira_ocorrencia,\n  max\n  (trabalho.HORAFIM) ultima_ocorrencia\nfrom crmoc trabalho\n  LEFT JOIN CRMOCUSUARIOS resp ON trabalho.CRMCODOC = resp.CRMCODOC\n  LEFT join crmchtec chamado on chamado.CRMCODCHTEC = trabalho.CRMCODCHTEC\n  LEFT JOIN CRMCHTECCON contatoct ON contatoct.CRMCODCHTEC = chamado.CRMCODCHTEC\n  LEFT JOIN CRMCONTATO contato ON contato.CRMCODCONTATO = contatoct.CRMCODCONTATO\nwhere datediff(minute,trabalho.HORAINI,trabalho.HORAFIM) > 1 --Ocorrencias com mais de um minuto de duração\n  and datediff(day,trabalho.HORAINI,trabalho.HORAFIM) = 0 --Ocorrencias que iniciaram e finalizaram corretamente (mesmo dia)\n  and not contato.CRMCODCONTATO in (1247,9111,24823,27067,28774) --Ignorar chamados internos da Agrotis\n  and not chamado.codsistema in (24,73,74,75,90,91,104,105,106) --90 = Atividades Internas; Ignorar chamados de outras atividades\n  and YEAR(trabalho.HORAINI) >= 2017\ngroup by\n  chamado.CRMCODCHTEC,\n  CONVERT(VARCHAR(4),YEAR(trabalho.HORAINI)) + '/' + RTRIM(RIGHT('0' + RTRIM(LTRIM((CONVERT(VARCHAR(2),MONTH(trabalho.HORAINI))))), 2))\n)\nselect\n  h.trabalho_ano_mes,\n  avg(h.horas_trabalhadas) media_trabalhada,\n  (select avg(c.horas_trabalhadas)\n   from horas_trabalhadas_chamado c\n   where c.trabalho_ano_mes = h.trabalho_ano_mes\n     and c.time = 'Time 1') time1_media_trabalhada,\n  (select avg(c.horas_trabalhadas)\n   from horas_trabalhadas_chamado c\n   where c.trabalho_ano_mes = h.trabalho_ano_mes\n     and c.time = 'Time 2') time2_media_trabalhada,\n  (select avg(c.horas_trabalhadas)\n   from horas_trabalhadas_chamado c\n   where c.trabalho_ano_mes = h.trabalho_ano_mes\n     and c.time = 'Time 3') time3_media_trabalhada,\n  (select avg(c.horas_trabalhadas)\n   from horas_trabalhadas_chamado c\n   where c.trabalho_ano_mes = h.trabalho_ano_mes\n     and c.time = 'Time 4') time4_media_trabalhada\nfrom horas_trabalhadas_chamado h\ngroup by \n  h.trabalho_ano_mes\norder by\n  h.trabalho_ano_mes",
    "__v": 0,
    "filters": [],
    "fields": [
      "trabalho_ano_mes",
      "media_trabalhada",
      "time1_media_trabalhada",
      "time2_media_trabalhada",
      "time3_media_trabalhada",
      "time4_media_trabalhada"
    ]
  }
];

module.exports = campos;