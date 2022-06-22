var campos = {
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
};

module.exports = campos;